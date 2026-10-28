import { createContext, useContext, useReducer, useMemo } from "react";
import { STUDENTS } from "../data/students";
import { StudentsAction, StudentsState, studentsReducer } from "./students-reducer";

interface StudentsContextValue {
  students: StudentsState;
  dispatch: React.Dispatch<StudentsAction>;
}

const StudentsContext = createContext<StudentsContextValue | null>(null);

export function StudentsProvider({ children }: { children: React.ReactNode }) {
  const [students, dispatch] = useReducer(studentsReducer, STUDENTS);
  
  // useMemo ensures the context value object is new when students change
  const value = useMemo(() => ({ students, dispatch }), [students]);

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be used inside a StudentsProvider");
  return ctx;
}