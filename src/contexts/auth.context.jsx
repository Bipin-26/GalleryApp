import { createContext, useContext, useMemo, useState } from "react";
import FirebaseAuth from "../utils/auth.utils";
import Firestore from "../utils/firestore.utils";
const AuthContext = createContext();

const { writeUserDoc, readUserDoc } = Firestore;

const { signIn, signOut, getCurrentUser } = FirebaseAuth;

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userList, setUserList] = useState(null);
  
  const username = currentUser?.displayName.split(" ").join("").toLowerCase();
  const getAllUser = () => readUserDoc("users").then((result) => setUserList(result));
  
  const login = () =>
    signIn()
      .then((result) => {
        writeUserDoc({ result }, "users");
        setCurrentUser(result)
      })
  const logout = () => signOut().then(() => {setCurrentUser(null);});
  const authenticate = () =>{
    getCurrentUser()
      .then(result => { setCurrentUser(result)})
      }
    

  const currentUserDetail = userList !== null && userList.find(user => user.username === username);

  const getUserDetailsById = (userId) => {
    if(userList !== null){
      return userList.find(user => user.id === userId)
    }
  }


  const getUserDetailsByName = (name) => {
    if(userList !== null){
      return userList.find(user => user.username === name )
    }
  }


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
    currentUserDetail,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
