import { createSlice } from "@reduxjs/toolkit";
import { initialPhotos } from "data/initialPhotos";

const photo = createSlice({
  name: "photos",
  initialState: initialPhotos,
  reducers: {
    addPhoto: (state, action) => {
      state.push(action.payload); //newPhoto = action.payload
    },

    removePhoto: (state, action) => {
      const removedPhotoId = action.payload;

      return state.filter((photo) => photo.id !== removedPhotoId); //do dùng filter nên nó clone mảng mới nên phải thêm return
    },

    updatePhoto: (state, action) => {
      const newPhoto = action.payload;
      const photoIndex = state.findIndex((photo) => photo.id === newPhoto.id);

      if (photoIndex >= 0) {
        state[photoIndex] = newPhoto;
      }
    },
  },
});

const { reducer, actions } = photo;
export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
