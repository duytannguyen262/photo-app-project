import Banner from "components/Banner";
import PhotoForm from "features/Photo/components/PhotoForm";
import { addPhoto, updatePhoto } from "features/Photo/photoSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./AddEditPage.scss";

const AddEditPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();

  const isAddingMode = !photoId;

  const editedPhoto = useSelector((state) => {
    const foundPhoto = state.photos.find((photo) => photo.id === +photoId);
    return foundPhoto;
  });

  const initialValues = isAddingMode
    ? {
        title: "",
        categoryId: null,
        photo: "",
      }
    : editedPhoto;

  const handleSubmit = (values) => {
    if (isAddingMode) {
      const action = addPhoto(values);
      dispatch(action);
    } else {
      //isEdittingMode
      const action = updatePhoto(values);
      dispatch(action);
    }

    history.push("/photos");
  };

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo" />
      <div className="photo-edit__form">
        <PhotoForm
          isAddingMode={isAddingMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

AddEditPage.propTypes = {};

export default AddEditPage;
