import React, { useState, useEffect } from 'react';
import useDarkMode from '../hooks/useDarkMode';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';

const SettingsContext = React.createContext([]);

export default function SettingsProvider(props) {
    const [settings, setSettings] = useState({
        name: 'kagan',
        number: '544-2223',
        citizenid: '',
        photo: 'https://kagan.app/images/phone/user.png',
        airplane: false,
        ringColor: 'ring-[#D04457]',
        mode: 'dark',
        bg: 'background4'
    });
    const [colorTheme, setTheme] = useDarkMode();
    const [cache, setCache] = useState({})

    useNuiEvent('setSettings', data => {
        setSettings(data);
    });

    useEffect(() => {
        const getData = () => fetchNui('getSettings').then(setSettings);

        getData();
    }, []);


    const saveSettings = () => { fetchNui('updateSettings', settings)}

    const setPhoneTheme = () => {
        setSettings({ ...settings, mode: colorTheme });
        setTheme(colorTheme);
        saveSettings()
    };


    const values = {
        settings,
        setSettings,
        setPhoneTheme,
        saveSettings,
        cache,
        setCache
    };

    return (
        <>
            <SettingsContext.Provider value={values}>
                {props.children}
            </SettingsContext.Provider>
        </>
    );
}

export const useSettings = () => React.useContext(SettingsContext);
