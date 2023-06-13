import React, { useState, createContext, useContext } from "react"

const MapContext = createContext([]);

export default function MapProvider({ children }) {
    const [markers, setMarkers] = useState([
        {
            id: 1,
            name: "31",
            coords: [0.0, 0.0]
        },

        {
            id: 2,
            name: "asdasdas",
            coords: [100.0, 100.0]
        },
    ])

    const data = {
        markers, 
        setMarkers,
    }
    return (
        <>
            <MapContext.Provider value={data}>
                {children}
            </MapContext.Provider>
        </>
    )
}

export const useMap = () => useContext(MapContext);