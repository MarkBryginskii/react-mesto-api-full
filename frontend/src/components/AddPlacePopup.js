import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = (props) => {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleLink = (event) => {
    setLink(event.target.value);
  }

  const formSubmit = () => {

    props.onAddCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm name="AddPhoto" title="Новое место" popupSize="large" isOpen={props.isOpen} onClose={props.onClose} submit={formSubmit}>
      <div className="popup__input-container">
        <input defaultValue='' onChange={handleName} data-field-name="name" id="popup__card-name" type="text" className="popup__text-field" autoFocus placeholder="Название" minLength="1" maxLength="30" required />
        <span id="popup__card-name-error" className="popup__input-error" />
      </div>
      <div className="popup__input-container">
        <input defaultValue='' onChange={handleLink} data-field-name="link" id="popup__card-link" type="url" className="popup__text-field" placeholder="Ссылка на картинку" required />
        <span id="popup__card-link-error" className="popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
