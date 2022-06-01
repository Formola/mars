import { collection, query, where, doc, getDocs, getDoc, addDoc, updateDoc, setDoc, Timestamp, orderBy, limit} from "firebase/firestore"
import { db } from "../firebase"

export const checkUsernameAvailability = async (username) => {
    const userCollectionRef = collection(db, "user")
    const q = query(userCollectionRef, where("username", "==", username))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size > 0) {
        throw Error("Questo username è già utilizzato.")
    }
}

export const checkUsernameExistance = async (username) => {
    const userCollectionRef = collection(db, "user")
    const q = query(userCollectionRef, where("username", "==", username))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size === 0) {
        throw Error("Questo username non è valido")
    }
}

export const getLatestMatchPointsByUsername = async (username) => {
    const userCollectionRef = collection(db, "user")
    const q = query(userCollectionRef, where("username", "==", username))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size === 1) {
        const latestMatchPoints = querySnapshot.docs[0].data().latestMatchPoints
        return latestMatchPoints
    }
    return null
}

export const registerUser = async (uid, email, displayName, username) => {
    await setDoc(doc(db, "user", uid), {
        uid: uid,
        email: email,
        displayName: displayName,
        username: username
    })
}

export const updateLatestPlayerPoints = async (uid, playerPoints) => {
    const userRef = doc(db, "user", uid)
    await updateDoc(userRef, {latestMatchPoints: playerPoints})
}

export const addMatch = async (match) => {
    match.timestamp = Timestamp.now()
    await addDoc(collection(db, "match"), match)
} 

export const fetchMatches = async () => {
    const matchCollection = collection(db, "match")
    const q = query(matchCollection, orderBy("timestamp"), limit(10))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size === 0) {
        throw Error("Non ci sono match disponibili.")
    }
    const matches = []

    // check 
    querySnapshot.docs.forEach(doc => matches.push(doc.data()))
    return matches
}