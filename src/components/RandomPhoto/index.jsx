import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import "./RandomPhoto.scss";

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000);
  return `https://picsum.photos/id/${randomId}/300/300`;
};

const RandomPhoto = (props) => {
  const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomPhotoClick = async () => {
    setIsLoading(true);
    if (onImageUrlChange) {
      const randomImageUrl = getRandomImageUrl();
      onImageUrlChange(randomImageUrl);
    }
  };

  return (
    <div className="random-photo">
      <div className="random-photo__button">
        <Button
          outline
          name={name}
          color="primary"
          onBlur={onRandomButtonBlur}
          onClick={handleRandomPhotoClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Random a photo"}
        </Button>
      </div>
      <div className="random-photo__photo">
        {imageUrl && (
          <img
            src={imageUrl}
            onLoad={() => setIsLoading(false)}
            onError={(e) => {
              handleRandomPhotoClick();
              setIsLoading(false);
            }}
            alt={"Oops! Not found! Please try again"}
          ></img>
        )}
      </div>
    </div>
  );
};

RandomPhoto.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onImageUrlChange: PropTypes.func,
  onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
  name: "",
  imageUrl: "",
  onImageUrlChange: null,
  onRandomButtonBlur: null,
};

export default RandomPhoto;
