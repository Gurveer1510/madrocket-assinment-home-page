import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)

export const doSignInWithEmailAndPassword = async(email: string, password: string) =>  signInWithEmailAndPassword(auth, email, password)

export const doSignOut = () => auth.signOut()