"use client";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState
} from "react";
import { Student } from "@/models/student.model";

interface ContextProps {
  students: Student[]
  setStudents: Dispatch<SetStateAction<Student[]>>
}

const StudentsContext = createContext<ContextProps>({
  students: [],
  setStudents: (): Student[] => []
});

export const StudentsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudentsContext = () => useContext(StudentsContext);
