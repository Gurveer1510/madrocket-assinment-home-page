import { Student } from "src/types";
import { db,  } from "../firebase/firebase"
import { collection, doc, deleteDoc } from "firebase/firestore/lite";
import { addDoc } from "firebase/firestore/lite";

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
