import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const EditAvatarPopup = (props) => {

  const avatarRef = React.useRef();

  const formSubmit = () => {

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm name="EditAvatar" title="Обновить аватар" popupSize="medium" isOpen={props.isOpen} onClose={props.onClose} submit={formSubmit}>
      <div className="popup__input-container">
        <input defaultValue='' ref={avatarRef} data-field-name="avatar" id="popup__avatar-link" type="url" className="popup__text-field" placeholder="Ссылка на картинку" required />
        <span id="popup__avatar-link-error" className="popup__input-error" />
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
