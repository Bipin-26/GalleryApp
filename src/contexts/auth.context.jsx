import { createContext, useContext, useMemo, useState } from "react";
import FirebaseAuth from "../utils/auth.utils";
import Firestore from "../utils/firestore.utils";
const AuthContext = createContext();

const { writeUserDoc, readUserDoc } = Firestore;

const { signIn, signOut, getCurrentUser } = FirebaseAuth;

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userList, setUserList] = useState(null);
  // const [currentUserDetail, setCurrentUserDetail] = useState(null)
  const username = currentUser?.displayName.split(" ").join("").toLowerCase();
  const getAllUser = () => readUserDoc("users").then((result) => setUserList(result));
  console.log("USER LIST ===========> ",userList)

  // console.log("CURRENT USER DETAILS", currentUserDetail)
  const login = () =>
    signIn()
      .then((result) => {
        writeUserDoc({ result }, "users");
        setCurrentUser(result)
      })
      // .then(() => {setCurrentUserDetail(userList.find(user => user.username === username))})
  const logout = () => signOut().then(() => {setCurrentUser(null);});
  const authenticate = () =>{
    getCurrentUser()
      .then(result => {console.log("PROMISE RESULT",result); setCurrentUser(result)})
      }
    
      // console.log(getCurrentUser())
  const currentUserDetail = userList !== null && userList.find(user => user.username === username);
  console.log("Current User details", currentUserDetail)
  
  console.log("USERNAME", username)

  const getUserDetailsById = (userId) => {
    if(userList !== null){
      return userList.find(user => user.id === userId)
    }
  }

  // console.log()

  const getUserDetailsByName = (name) => {
    if(userList !== null){
      return userList.find(user => user.username === name )
    }
  }

  console.log("CURRENT USER DETAIL", currentUserDetail)

  const value = useMemo(() => {
    return {
      login,
      logout,
      authenticate,
      currentUser,
      username,
      getAllUser,
      getUserDetailsById,
      getUserDetailsByName,
      userList,
      // currentUserId,
      currentUserDetail,
    };
  }, [
    login,
    logout,
    authenticate,
    currentUser,
    username,
    getAllUser,
    getUserDetailsById,
    getUserDetailsByName,
    userList,
    // currentUserId,
    currentUserDetail,

  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
