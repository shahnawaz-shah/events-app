import { createContext, useState } from "react";
// create event context
export const EventContext = createContext();

export function EventProvider({ children }) {
    const [events, setEvents] = useState([]);

    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    );
};