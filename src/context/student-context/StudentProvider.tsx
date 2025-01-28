import React, { createContext, useContext, useEffect, useState } from "react";
import { db, collection, getDocs } from "../../firebase/firebase";
import { Student } from "../../types";

// Define the shape of the Context
interface StudentsContextType {
    students: Student[];
    loading: boolean;
}

// Create a Context
const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

// Create a Provider Component
export const StudentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [students, setStudents] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch data from Firebase on first load
    useEffect(() => {
        const getStudents = async () => {
            const stud = collection(db, "students")
            const st = await getDocs(stud)
            const stutList = st.docs.map(doc => doc.data())
            setStudents(stutList)
            setLoading(false)
        }
        getStudents()
    }, []);

    return (
        <StudentsContext.Provider value={{ students, loading }}>
            {children}
        </StudentsContext.Provider>
    );
};

export const useStudents = (): StudentsContextType => {
    const context = useContext(StudentsContext);
    if (context === undefined) {
        throw new Error("useStudents must be used within a StudentsProvider");
    }
    return context;
};