import { createContext } from "react";

export const DataContext = createContext<any>({
    tickets: [],
    participants: [],
    contactInfo: null,
});