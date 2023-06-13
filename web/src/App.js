import React, { useEffect, useState } from 'react';
import PhoneBorder from './components/PhoneBorder';
import { Routes, Route } from 'react-router-dom';
import { router } from './utils/router';
import { NotificationProvider } from './contexts/NotificationContext';
import Homepage from './pages/Homepage';
import DisplayProvider from './contexts/DisplayContext';
import MapProvider from './contexts/MapContext';
import SettingsProvider from './contexts/SettingsContext';
import { PlayAudio } from './utils/misc';
import BigPicture from './components/BigPicture';

function App() {
    return (
        <>
            <DisplayProvider>
                <SettingsProvider>
                    <BigPicture />
                    <PhoneBorder>
                        <MapProvider>
                            <div className="page relative">
                                <Routes>
                                    {router.map(r => (
                                        <Route
                                            path={r.path}
                                            element={r.component}
                                        />
                                    ))}
                                    <Route path="*" element={<Homepage />} />
                                </Routes>
                            </div>
                        </MapProvider>
                    </PhoneBorder>
                </SettingsProvider>
            </DisplayProvider>
        </>
    );
}

export default App;
