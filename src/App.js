// import './App.css';
import { Container, Text } from "@chakra-ui/react";
import Navbar from "./components/navbar.component";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home.page";
import Search from "./pages/search.page";
import { useContext, useEffect, useState } from "react";
import { GalleryContext } from "./contexts/gallery.context";
import Firestore from "./utils/firestore.utils";
import UploadPage from "./pages/upload.page";
import { useAuthContext } from "./contexts/auth.context";
import SignInPage from "./pages/signIn.page";
import Profile from "./pages/profile.page";
import CommentSection from "./components/comments.component";
import MyGallery from "./pages/my-gallery";
import UserProfileCard from "./pages/user-profile-card.page";
import EditPage from "./pages/edit.page";
import PageNotFound from "./pages/404.page";

function App() {
  // const { readDoc } = Firestore;
  const { authenticate, getAllUser, currentUserDetail } = useAuthContext();

  const { state, loadImages, modalItem } = useContext(GalleryContext);

  useEffect(() => {
    authenticate();
    getAllUser();
    loadImages();
  }, []);

  // console.log("USER LIST --------------", currentUser)
  return (
    <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route
              path="/search-feed"
              element={<Search items={state.items} />}
            />
            <Route path="/upload-image" element={<UploadPage />} />
            <Route path="/edit-post" element={<EditPage />} />
            <Route path="/profile" element={<Profile items={state.items} />} />
            <Route
              path="/uploadedBy"
              element={<UserProfileCard items={state.items} />}
            />
          </Route>
          <Route
            path="/:id/comments"
            element={<CommentSection items={state.items} />}
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/authenticate/sign-in" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
