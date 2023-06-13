import { useEffect, useState } from 'react';

export default function useDarkMode(mode) {
    const [theme, setTheme] = useState(mode);

    const colorTheme = theme === 'dark' ? 'light' : 'dark';
    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove(colorTheme);
        root.classList.add(theme);
    }, [theme, colorTheme]);

    const setCustomTheme = (theme) => {
        const root = window.document.documentElement;
        root.classlist.add(theme)
    }

    return [colorTheme, setTheme, setCustomTheme];
}
