import Banner from "components/Banner";
import Images from "constants/images";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/photoSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container } from "reactstrap";

const MainPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const photos = useSelector((state) => state.photos);

  const handlePhotoEditClick = (photo) => {
    const editPhotoUrl = `/photos/${photo.id}`;
    history.push(editPhotoUrl);
  };

  const handlePhotoRemoveClick = (photo) => {
    const removedPhotoId = photo.id;
    const action = removePhoto(removedPhotoId);
    dispatch(action);
  };

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos" backgroundUrl={Images.PINK_BG} />
      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
