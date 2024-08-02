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
  totalStudents: number
  setStudents: Dispatch<SetStateAction<Student[]>>
  setTotalStudents: Dispatch<SetStateAction<number>>
}

const StudentsContext = createContext<ContextProps>({
  students: [],
  totalStudents: 0,
  setStudents: (): Student[] => [],
  setTotalStudents: (): number => 0,
});

export const StudentsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);

  return (
    <StudentsContext.Provider value={{ students, totalStudents, setStudents, setTotalStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudentsContext = () => useContext(StudentsContext);
