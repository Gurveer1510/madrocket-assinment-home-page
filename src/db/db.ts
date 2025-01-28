import { Student } from "src/types";
import { db,  } from "../firebase/firebase"
import { collection, doc, deleteDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore/lite";

export const addDataWithAutoId = async (data: Student) => {
    const studentRef = collection(db, 'students'); // Reference to the collection

    try {
        const docRef = await addDoc(studentRef, data); // Adds a new document with an auto-generated ID
        console.log('New document added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

export const deleteStudent = async (docId: string) => {
    try {
        const docRef = doc(db, "students", docId); // Replace with your collection name
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}
