import React from 'react';
import PopupWithForm from './PopupWithForm.js';

import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const EditProfilePopup = (props) => {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleDescription = (event) => {
    setDescription(event.target.value);
  }

  const formSubmit = () => {

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm name="EditProfile" title="Редактировать профиль" popupSize="large" isOpen={props.isOpen} onClose={props.onClose} submit={formSubmit}>
      <div className="popup__input-container">
        <input onChange={handleName} defaultValue={name} data-field-name="name" id="popup__user-name" type="text" className="popup__text-field" autoFocus placeholder="Имя" minLength="2" maxLength="40" required />
        <span id="popup__user-name-error" className="popup__input-error" />
      </div>
      <div className="popup__input-container">
        <input onChange={handleDescription} defaultValue={description} data-field-name="about" id="popup__user-about" type="text" className="popup__text-field" placeholder="О себе" minLength="2" maxLength="200" required />
        <span id="popup__user-about-error" className="popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
