import { Student, STUDENTS } from "../data/students";

export type StudentsState = Student[];

export type StudentsAction =
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "REMOVE_STUDENT"; payload: string }
  | { type: "RESET" };

export function studentsReducer(state: StudentsState, action: StudentsAction): StudentsState {
  switch (action.type) {
    case "ADD_STUDENT":
      return [action.payload, ...state];
      
    case "REMOVE_STUDENT":
      return state.filter((s) => s.id !== action.payload);
      
    case "RESET":
      // Returns a brand new array reference to force React to re-render
      return [...STUDENTS]; 
      
    default:
      return state;
  }
}