import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import logo from '../images/header-logo.svg';
import Header from './Header.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';

import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';

import appApi from '../utils/Api.js';
import appAuth from '../utils/Auth.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const App = () => {

  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoggedIn, setIsloggedIn] = React.useState(false);
  const [isUserEmail, setIsUserEmail] = React.useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  React.useEffect( () => {
    setSelectedCard(null);
    if(localStorage.getItem('jwt')) {
      appAuth.userInfo(localStorage.getItem('jwt'))
      .then((userData) => {
        setIsloggedIn(true);
        setIsUserEmail(userData.email);
      })
      .then(() => {
        appApi.getUserInfo()
          .then((userData) => {
            setCurrentUser(userData);
          })
      })
      .then(() => {
        appApi.getInitialCards()
          .then((cards) => {
            setCards(cards);
          })
      })
      .then(() => {
        history.push('/');
      })
      .catch((err) => {console.log(err)});
    }
  }, [history]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);

    (isLiked ? appApi.removeCardLike(card._id) : appApi.addCardLike(card._id))
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {console.log(err)})
  }

  const handleCardDelete = (card) => {
    appApi.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => {console.log(err)})
  }

  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = ({name, about}) => {
    appApi.setUserInfo({name, about})
    .then((userData) => {
      setCurrentUser(userData);})
    .then(() => {closeAllPopups()})
    .catch((err) => {console.log(err)})
  }

  const handleUpdateAvatar = ({avatar}) => {
    appApi.setUserAvatar({avatar})
    .then((userData) => {
      setCurrentUser(userData);})
    .then(() => {closeAllPopups()})
    .catch((err) => {console.log(err)})
  }

  const handleAddPlaceSubmit = ({name, link}) => {
    appApi.addCard({name, link})
    .then((newCard) => {
      setCards([...cards, newCard]);
    })
    .then(() => {closeAllPopups()})
    .catch((err) => {console.log(err)})
  }

  const handleRegister = (obj) => {
    appAuth.register(obj)
    .then((res) => {
      if(!res.message) {
        setIsAuthSuccess(true);
        setInfoTooltipOpen(true);
        history.push('/sign-in');
      } else {
        console.log(res.error);
        setIsAuthSuccess(false);
        setInfoTooltipOpen(true);
      }
    })
    .catch((err) => {console.log(err)})
  }

  const handleLogin = (obj) => {
    appAuth.login(obj)
    .then((res) => {
      if(res.token) {
        setIsloggedIn(true);
        history.push('/');
      } else {
        console.log(res.message);
        setIsAuthSuccess(false);
        setInfoTooltipOpen(true);
      }
    })
    .catch((err) => {console.log(err)})
  }

  function handleLogoff() {
    localStorage.removeItem('jwt');
    setIsloggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header logo={logo} onLogoff={handleLogoff} userInfo={isUserEmail}/>
          <Switch>
            <Route path="/sign-up">
              <Register onSubmit={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onSubmit={handleLogin} />
            </Route>
            <ProtectedRoute path='/' loggedIn={isLoggedIn}>
              <Main
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLikeClick={handleCardLike}
                onCardDeleteClick={handleCardDelete}
              />
              <Footer />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>
              <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
            </ProtectedRoute>
          </Switch>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} regSuccess={isAuthSuccess} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
