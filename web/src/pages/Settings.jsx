import React, { useState, useEffect } from 'react';
import Home from './Settings/Home';
import Profile from './Settings/Profile';
import { wrap } from 'popmotion';
import { motion, AnimatePresence } from 'framer-motion';
import FrameColor from './Settings/FrameColor';
import Wallpaper from './Settings/Wallpaper';
import Gallery from '../components/Gallery';

const variants = {
    enter: direction => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: direction => {
        return {
            zIndex: 0,
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const SettingsPageContext = React.createContext([]);
export const useSettingsPage = () => React.useContext(SettingsPageContext);

function Settings() {
    const pages = [
        {
            name: 'home',
            element: <Home />
        },
        {
            name: 'profile',
            element: <Profile />
        },
        {
            name: 'framecolor',
            element: <FrameColor />
        },
        {
            name: 'wallpaper',
            element: <Wallpaper />
        },
        {
            name: 'gallery',
            element: <Gallery setPage={e => paginate('profile')} />
        }
    ];

    const [[page, direction], setPage] = useState(['home', 0]);
    const [showNavigation, setNavigation] = useState(true);
    const pageIndex = wrap(
        0,
        pages.length,
        pages.findIndex(x => x.name == page) ?? 0
    );

    const paginate = _page => {
        var oldIndex = pages.findIndex(x => x.name == page) ?? 0;
        var newIndex = pages.findIndex(x => x.name == _page) ?? 1;
        var direction = 1;

        if (oldIndex >= newIndex) {
            direction = direction * -1;
        }

        setPage([_page, direction]);
        setNavigation(true);
    };

    const values = {
        paginate
    };

    return (
        <div className="page bg-[#EBEBEB] !pt-0 dark:bg-[#0D0D0D]">
            <div className="relative h-full w-full bg-[#EBEBEB] dark:bg-[#0D0D0D]">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        layout
                        transition={{ type: 'tween' }}
                    >
                        <SettingsPageContext.Provider value={values}>
                            {pages[pageIndex].element}
                        </SettingsPageContext.Provider>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Settings;
