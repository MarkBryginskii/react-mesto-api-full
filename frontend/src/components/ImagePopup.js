import React from 'react';

const ImagePopup = (props) => {

  return(
    <div id="popupIncreasePhoto" className={`popup popup_min-transparent ${props.card && 'popup_opened'}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
        <figure className="popup__image-figure">{props.card && props.card.name}</figure>
      </div>
    </div>
  );
}

export default ImagePopup;
