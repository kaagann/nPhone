import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createContext } from 'react';
import Home from './Company/Home';
import { wrap } from 'popmotion';
import Profile from './Company/Profile';
import Employes from './Company/Employes';
import UserProfile from './Company/UserProfile';
import ChangeGrade from './Company/ChangeGrade';

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

const CompanyContext = createContext([]);
export const useCompany = () => useContext(CompanyContext);

function Company() {
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
            name: 'employes',
            element: <Employes />
        },
        {
            name: 'userProfile',
            element: <UserProfile />
        },
        {
            name: 'changegrade',
            element: <ChangeGrade />
        }
    ];

    const [[page, direction], setPage] = useState(['home', 0]);
    const [showNavigation, setNavigation] = useState(true);
    const pageIndex = wrap(
        0,
        pages.length,
        pages.findIndex(x => x.name == page) ?? 0
    );
    const [cache, setCache] = useState({});

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
        paginate,
        cache,
        setCache
    };

    return (
        <div className="page bg-[#EBEBEB] !px-0 !pt-0">
            <AnimatePresence initial={false}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    layout
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                >
                    <CompanyContext.Provider value={values}>
                        {pages[pageIndex].element}
                    </CompanyContext.Provider>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Company;
