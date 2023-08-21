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
  isLoading: false,
  error: null,
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

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_IMAGES_START":
      return {
        ...state,
        isLoading: true,
      };
    case "LOAD_IMAGES_SUCCESS":
      return {
        ...state,
        items: action.payload.items,
        isLoading: false,
      };
    case "LOAD_IMAGES_FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
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
    default:
      return state;
  }
};

export const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    galleryReducer,
    initialState
  );


  const [modalItem, setModalItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [likedImageId, setLikedImageId] = useState(null);
  const [showLikeIcon, setShowLikeIcon] = useState(false);
  const loadImages = async () => {
    dispatch({ type: "LOAD_IMAGES_START" });
    try {
      getImages();
    } catch (error) {
      dispatch({ type: "LOAD_IMAGES_FAILED", payload: { error: error } });
    }
  };

  const getImages = async () => {
    const items = await readDoc("gallery");
    dispatch({ type: "LOAD_IMAGES_SUCCESS", payload: { items: items } });
  }

  const onModalHandler = (item) => {
    setModalItem(item);
  };

  const imageLikeHandler = (id, username) => {
    setLikedImageId(id);
    setShowLikeIcon(true);
    setTimeout(()=>{
      setLikedImageId(null);
      setShowLikeIcon(false)
    },1000);
    updateDoc(id, "gallery", username).then(getImages);
  };

  const getFilteredItems = (userId) => {
    return state.items.filter((item) => item.uploadedBy === userId);
  };

  return (
    <GalleryContext.Provider
      value={{
        state,
        dispatch,
        loadImages,
        getFilteredItems,
        imageLikeHandler,
        onModalHandler,
        isOpen,
        onClose,
        onOpen,
        setModalItem,
        modalItem,
        displayAlert,
        setDisplayAlert,
        showLikeIcon,
        getImages,
        likedImageId
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
