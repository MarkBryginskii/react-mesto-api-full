import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

const Card = (props) => {

  const currentUser = React.useContext(CurrentUserContext);

  const handleClick = () => {
    props.onCardClick(props);
  }

  const handleLikeClick = () => {
    props.onCardLike(props);
  }

  const handleLikeDelete = () => {
    props.onCardDelete(props);
  }

  const isOwn = props.owner._id === currentUser._id;
  const isLiked = props.likes.some(i => i._id === currentUser._id);

  return(
    <li className="photo-card">
      <button type="button" onClick={handleLikeDelete} className={`photo-card__trash-icon ${!isOwn && 'photo-card__trash-icon_hide'}`} value="" />
      <img className="photo-card__image" src={props.link} alt={props.name} onClick={handleClick}/>
      <div className="photo-card__footer">
        <h3 className="photo-card__title">{props.name}</h3>
          <div className="photo-card__like-container">
            <button type="button" onClick={handleLikeClick} className={`photo-card__like-icon ${isLiked && 'photo-card__like-icon_active'}`} />
            <p className="photo-card__like-counter">{props.likes.length}</p>
          </div>
      </div>
    </li>
  );
}

export default Card;
