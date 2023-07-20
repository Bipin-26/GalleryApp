import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "./firebase.utils";
import { v4 as uuidv4 } from 'uuid'

const Storage = {
  uploadFile: (media) => {
    return new Promise(async (resolve) => {
        // console.log("You are inside uploadFile")

      try {
        const fileId = uuidv4();
        const fileRef = ref(storage, `images/${fileId}`);
        uploadBytes(fileRef, media.file).then((snapShot) => {
          resolve({ path: snapShot.metadata.fullPath });
        });
      } catch (e) {
        console.error(e);
      }
    });
  },
  downloadFile: (media) => {
    return new Promise(async (resolve) => {
      try {
        const fileRef = ref(storage, media.path);
        const fileURL = await getDownloadURL(fileRef);
        resolve(fileURL);
      } catch (e) {
        console.error(e);
      }
    });
  },
};

export default Storage;
