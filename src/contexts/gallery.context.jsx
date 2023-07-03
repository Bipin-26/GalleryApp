import { createContext, useReducer, useState } from "react";
import Firestore from "../utils/firestore.utils";
import { useDisclosure } from "@chakra-ui/react";

const { readDoc, updateDoc } = Firestore;

export const GalleryContext = createContext();

const images = [];

const initialState = {
  items: images,
  count: images.length,
  inputs: { title: null, caption: null, file: null, path: null },
  isUploading: false,
};

const handleOnChange = (state, e) => {
  if (e.target.name === "file") {
    return {
      ...state.inputs,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    };
  } else if (e.target.name === "caption") {
    return {
      ...state.inputs,
      caption: e.target.value,
    };
  } else {
    return {
      ...state.inputs,
      title: e.target.value,
    };
  }
};

const galleryReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_IMAGES":
      return {
        ...state,
        items: action.payload.items,
      };

    case "SET_INPUTS":
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value),
      };
    case "CLEAR_INPUTS":
      return {
        ...state,
        inputs: action.payload.inputs,
      };
    case "SET_UPLOADING":
      return {
        ...state,
        isUploading: action.payload.isUploading,
      };
    default:
      return state;
  }
};

export const GalleryProvider = ({ children }) => {
  const [state, dispatch, isUploading, likedBy] = useReducer(
    galleryReducer,
    initialState
  );

  const [modalItem, setModalItem] = useState(null);
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayAlert, setDisplayAlert] = useState(false)
  const loadImages = async () => {
    const items = await readDoc("gallery");
    dispatch({ type: "LOAD_IMAGES", payload: { items:items, loading:false } });
  };

  const loadingHandler = () => {
    setLoading(false);
  }

  const onModalHandler = (item) => {
    setModalItem(item);
  };

  const imageLikeHandler = (id, username) => {
    updateDoc(id, "gallery", username).then(loadImages);
  };

  const getFilteredItems = (userId) => {

      return state.items.filter(item => item.uploadedBy === userId)
  };

  return (
    <GalleryContext.Provider
      value={{
        state,
        dispatch,
        loadImages,
        likedBy,
        isUploading,
        getFilteredItems,
        // filteredItems,
        imageLikeHandler,
        onModalHandler,
        isOpen,
        onClose,
        onOpen,
        setModalItem,
        modalItem,
        loading,
        loadingHandler,
        displayAlert,
        setDisplayAlert
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
