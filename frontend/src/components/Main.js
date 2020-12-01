import React from 'react';
import Card from './Card.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const Main = (props) => {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" alt="аватар" src={currentUser.avatar} />
          <button onClick={props.onEditAvatarClick} type="button" className="profile__avatar-edit-button" />
        </div>
          <div className="profile__info">
            <div className="profile__info-row">
              <p className="profile__user-name">{currentUser.name}</p>
              <button onClick={props.onEditProfileClick} type="button" className="profile__edit-button" />
            </div>
            <p className="profile__user-about">{currentUser.about}</p>
          </div>
        <button onClick={props.onAddPlaceClick} type="button" className="profile__add-button" />
      </section>
      <section className="photo-grid">
        <ul className="photo-cards">
          {props.cards.map(card => <Card onCardClick={props.onCardClick} onCardLike={props.onCardLikeClick} onCardDelete={props.onCardDeleteClick} key={card._id} {...card} />)}
        </ul>
      </section>
    </main>
  );
}

export default Main;
