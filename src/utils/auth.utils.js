import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../utils/firebase.utils"

const googleProvider = new GoogleAuthProvider();

const FirebaseAuth = {
    signIn: () =>{
        return new Promise(async (resolve) => {
            try{
                await signInWithPopup(auth, googleProvider).then(response => {
                    resolve(response.user);
                })
            }catch(e){
                console.error(e)
            }
        })
    },
    signOut:() => {
        return new Promise(resolve => {
            try{
                signOut(auth).then(()=>{
                    console.log("user logged out")
                    resolve()
                })
            }catch(e){
                console.error(e)
            }
        })
    },
    getCurrentUser: () => {
        return new Promise(resolve => {
            return auth.onAuthStateChanged(resolve)
        })
    }
}

export default FirebaseAuth;