import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const userApi = {
  //TODO: Giả lập gọi API để được currentUser
  getMe: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.id,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
        });
      }, 500);
    });
  },
};

export default userApi;
