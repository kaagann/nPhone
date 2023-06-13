import React, { useEffect, useState } from "react";
import { isEnvBrowser } from "../utils/misc";

const NotificationContext = React.createContext([]);

export default function DisplayProvider({ children }) {
    const [open, setOpen] = useState(false)
    const [half, setHalf] = useState(false)
    const data = { open, setOpen, half, setHalf };

    useEffect(() => {
        if (isEnvBrowser()) setOpen(true)
    }, [])

    return (
        <NotificationContext.Provider value={data}>
            {children}
        </NotificationContext.Provider>
    );
}




export const useDisplay = () => React.useContext(NotificationContext);
