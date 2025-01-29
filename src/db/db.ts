import { Student } from "src/types";
import { collection, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore/lite";
import { db,  } from "../firebase/firebase"

export const addDataWithAutoId = async (data: Student) => {
    const studentRef = collection(db, 'students'); // Reference to the collection

    try {
        const docRef = await addDoc(studentRef, data); // Adds a new document with an auto-generated ID
        return true
    } catch (error) {
        return false
    }
};

export const deleteStudent = async (docId: string) => {
    try {
        const docRef = doc(db, "students", docId); // Replace with your collection name
        await deleteDoc(docRef);
        return true
    } catch (error) {
        return false
    }
}

export const updateDocument = async (data: Student, docId: string) => {
    try {
        const studentRef = doc(db, "students", docId); // Get document reference

        await updateDoc(studentRef, data); // Update only the specified fields

        return true
    } catch (error) {
        return false
    }
}