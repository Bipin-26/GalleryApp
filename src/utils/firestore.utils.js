import { doc, setDoc, getDocs, serverTimestamp, collection, updateDoc, arrayUnion, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase.utils"
import { v4 as uuidv4 } from 'uuid'
const Firestore = {
    readDoc:(...args) => {
        const [collection_name] = args;
        let docs = [];
        const collectionRef = collection(db, collection_name);
        return new Promise(async (resolve) => {
            try{
                const snapShots = await getDocs(collectionRef);
                snapShots.docs.forEach((doc) => {
                    const d = {...doc.data(), id:doc.id}
                    docs.push(d)
                })
                resolve(docs)
            }catch(e){
                console.error(e)
            }
        })
    },
    writeDoc:(...args) => {
        const [inputs, collection_name] = args;
        return new Promise(async (resolve) => {
            const docId = uuidv4();
            try{
                const docRef = doc(db, collection_name,docId);
                await setDoc(docRef,{
                    id:docId,
                    title:inputs.title,
                    path: inputs.path,
                    uploadedAt: inputs.uploadedAt,
                    caption:inputs.caption,
                    uploadedBy: inputs.uploadedBy,
                    likedBy:[],
                    comments:[],
                    previewType:inputs.previewType
                })
                resolve('New doc inserted successfully');
            }catch(e){
                console.error(e)
            }
        })
    },
    updateDoc:(...args) => {
        const [id, collection_name, username] = args;
        return new Promise(async resolve => {
            try{
                const docRef = doc(db,collection_name,id )
                await updateDoc(docRef, {
                    likedBy: arrayUnion(username)
                })
                resolve('document updated')
            }catch(e){
                console.error(e)
            }
        })
    },
    updateDocument:(...args) => {
        const [id, collection_name, caption, previewObjectFit] = args;
        return new Promise(async resolve => {
            try{
                const docRef = doc(db,collection_name,id )
                await updateDoc(docRef, {
                    caption: caption,
                    previewType: previewObjectFit 
                })
                resolve('document updated')
            }catch(e){
                console.error(e)
            }
        })
    },
    addComment:(...args) => {
        const [id, collection_name, username, commentText, commentedAt] = args;
        return new Promise(async resolve => {
            try{
                const docRef = doc(db, collection_name, id)

                await updateDoc(docRef, {
                    comments: arrayUnion({username: username, commentText:commentText, commentedAt: commentedAt})
                })
                resolve('comment added')
            }catch(e){
                console.error(e);
            }
        })
    },
    readUserDoc:(...args)=>{
        const [collection_name, username] = args;
        return new Promise(async resolve => {
            let docs=[]
            const collectionRef = collection(db, collection_name);
            try{
                const userDocSnapShot = await getDocs(collectionRef);
                userDocSnapShot.docs.forEach((doc) => {
                    const d = {...doc.data(), id:doc.id}
                    docs.push(d)
                })
                resolve(docs)
            }catch(e){
                console.error(e)
            }
        })
    },
    writeUserDoc:(...args) => {
        const [result, collection_name] = args;
        return new Promise(async resolve => {
            let docs = [];
            const collectionRef = collection(db, collection_name);
            const userID = uuidv4();
            try{
                const userDocSnapShot = await getDocs(collectionRef);
                userDocSnapShot.docs.forEach((doc) => {
                    const d = {...doc.data(), id:doc.id}
                    docs.push(d)
                })
                const userDocRef = doc(db, collection_name, userID )
                const userExists = docs.find((user) => user.email === result.result.email)
                if(!userExists){
                    await setDoc(userDocRef, {
                        id:userID,
                        username: result.result.displayName?.split(" ").join("").toLowerCase(),
                        email: result.result.email,
                        photoURL: result.result.photoURL
                    })
                    resolve('User added successfully')
                }else{
                    resolve(userExists)
                }
            }catch(e){
                console.error(e)
            }
        })
    },
    deleteDoc:(...args)=>{
        const [id, collection_name] = args;
        return new Promise(async resolve => {
            try{
                const docRef = doc(db, collection_name, id );
                await deleteDoc(docRef)
                resolve('document deleted successfully')
            }catch(e){
                console.error(e)
            }
        })
    }
}

export default Firestore