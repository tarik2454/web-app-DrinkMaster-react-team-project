import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  deleteFromFavoriteThunk,
  deleteFromOwnThunk,
} from '@/redux/Drinks/operations';
import Coctail from '../../../shared/img/image.png';
import { SpriteSVG } from '@/shared/icons/SpriteSVG';
import { confirmNamePage } from '@/shared/helpers/confirmNamePage';

import {
  DrinkCardItemFaxBtn,
  DrinkCardItemFaxContainer,
  DrinkCardItemFaxDel,
  DrinkCardItemFaxDescription,
  DrinkCardItemFaxImg,
  DrinkCardItemFaxName,
  DrinkCardItemFaxNavi,
  DrinkCardItemFaxStatus,
} from './Card.styled';

const Card = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  const namePage = confirmNamePage(location.pathname);

  const handleSeeMore = _id => {
    navigate(`/drinks/${_id}`);
  };

  const handleRemove = () => {
    if (namePage.favorites) {
      dispatch(deleteFromFavoriteThunk(data._id));
      toast.success('You removed drink from your favorite');
    } else {
      dispatch(deleteFromOwnThunk(data._id));
      toast.success('You removed drink from your own');
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <DrinkCardItemFaxContainer>
      <DrinkCardItemFaxImg
        src={data.drinkThumb}
        alt={data.drink}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        width={335}
        height={360}
      />
      {!imageLoaded && (
        <DrinkCardItemFaxImg
          src={Coctail}
          alt={data.drink}
          style={{ position: 'absolute', top: 0 }}
          loading="lazy"
        />
      )}
      <DrinkCardItemFaxName>{data.drink}</DrinkCardItemFaxName>
      <DrinkCardItemFaxStatus>{data.alcoholic}</DrinkCardItemFaxStatus>
      <DrinkCardItemFaxDescription>
        {data.shortDescription}
      </DrinkCardItemFaxDescription>
      <DrinkCardItemFaxNavi>
        <DrinkCardItemFaxBtn
          onClick={() => handleSeeMore(data._id)}
          type="button"
        >
          See more
        </DrinkCardItemFaxBtn>
        <DrinkCardItemFaxDel type="button" onClick={handleRemove}>
          <SpriteSVG name={'trash'} />
        </DrinkCardItemFaxDel>
      </DrinkCardItemFaxNavi>
    </DrinkCardItemFaxContainer>
  );
};

export default Card;

Card.propTypes = {
  data: PropTypes.shape({
    drinkThumb: PropTypes.string,
    drink: PropTypes.string,
    alcoholic: PropTypes.string,
    shortDescription: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
