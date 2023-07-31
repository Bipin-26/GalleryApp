// import './App.css';
import {  Show,  Hide } from "@chakra-ui/react";
import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import Search from "./pages/search.page";
import { useContext, useEffect } from "react";
import { GalleryContext } from "./contexts/gallery.context";
// import Firestore from "./utils/firestore.utils";
import UploadPage from "./pages/upload.page";
import { useAuthContext } from "./contexts/auth.context";
import SignInPage from "./pages/signIn.page";
import Profile from "./pages/profile.page";
import CommentSection from "./components/comments.component";
// import MyGallery from "./pages/my-gallery";
import UserProfileCard from "./pages/user-profile-card.page";
import EditPage from "./pages/edit.page";
import PageNotFound from "./pages/404.page";
import AlertContainer from "./components/alert.component";

function App() {
  // const { readDoc } = Firestore;
  const { authenticate, getAllUser } = useAuthContext();

  const { state, loadImages } = useContext(GalleryContext);

  useEffect(() => {
    authenticate();
    getAllUser();
    loadImages();
  }, []);

  // console.log("USER LIST --------------", currentUser)
  return (
    <>
    <Show breakpoint='(max-width: 480px)'>
    <Routes>
          <Route path="/home" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route
              path="/home/search-feed"
              element={<Search items={state.items} />}
            />
            <Route path="/home/upload-image" element={<UploadPage />} />
            <Route path="/home/edit-post" element={<EditPage />} />
            <Route path="/home/profile" element={<Profile items={state.items} />} />
            <Route
              path="/home/uploadedBy"
              element={<UserProfileCard items={state.items} />}
            />
          </Route>
          <Route
            path="/home/:id/comments"
            element={<CommentSection items={state.items} />}
          />
          <Route path="*" element={<PageNotFound />} />
          <Route exact path="/" element={<SignInPage />} />
    </Routes>
    </Show>
    <Hide breakpoint='(max-width:480px)'>
      <AlertContainer />
    </Hide>
    </>
  );
}

export default App;
