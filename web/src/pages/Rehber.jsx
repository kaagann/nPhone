import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import ContactDetails from './Phone/ContactDetails';
import Contacts from './Phone/Contacts';
import { wrap } from 'popmotion';
import { FaCarSide } from 'react-icons/fa';
import Recents from './Phone/Recents';
import Favorites from './Phone/Favorites';
import NewContact from './Phone/NewContact';
import Keyboard from './Phone/Keyboard';
import { AiFillClockCircle, AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosKeypad } from 'react-icons/io';

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

const PhoneContext = React.createContext([]);
export const usePhone = () => React.useContext(PhoneContext);

function Rehber() {
    const pages = [
        {
            name: 'favorites',
            element: <Favorites />
        },
        {
            name: 'recents',
            element: <Recents />
        },
        {
            name: 'contacts',
            element: <Contacts />
        },
        {
            name: 'keyboard',
            element: <Keyboard />
        },
        {
            name: 'contactdetails',
            element: <ContactDetails />
        },
        {
            name: 'newcontact',
            element: <NewContact />
        }
    ];
    // const pages = [<Contacts/>, <ContactDetails/>, <Recents/>]
    const [[page, direction], setPage] = useState(['contacts', 0]);
    const [customData, setData] = useState(null);
    const [oldPage, setOldPage] = useState('contacts');
    const [showNavigation, setNavigation] = useState(true);
    const pageIndex = wrap(
        0,
        pages.length,
        pages.findIndex(x => x.name == page) ?? 0
    );

    const paginate = _page => {
        setOldPage(page);
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
        setNavigation,
        oldPage,
        customData,
        setData
    };

    return (
        <div className="page bg-white !pt-0 dark:bg-[#0D0D0D]">
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
                        x: { type: 'tween', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                >
                    <PhoneContext.Provider value={values}>
                        {pages[pageIndex].element}
                    </PhoneContext.Provider>
                </motion.div>
            </AnimatePresence>

            {showNavigation && (
                <div className="absolute bottom-0 flex h-16 w-full justify-evenly border-t border-[#BABABA] bg-black/10 pt-3 dark:border-[#C2C2C2]/10 dark:bg-white/10">
                    <div
                        onClick={() => paginate('favorites')}
                        className="flex cursor-pointer flex-col items-center"
                    >
                        <AiFillStar
                            className={`${
                                pages[pageIndex].name == 'favorites'
                                    ? 'text-green-500 '
                                    : ''
                            } text-xl text-[#323232] dark:text-[#CDCDCD]`}
                        />
                        <p
                            className={` ${
                                pages[pageIndex].name == 'favorites'
                                    ? 'text-green-500 '
                                    : ''
                            } inter mt-0.5 text-[11px] text-[#323232] dark:text-[#CDCDCD]`}
                        >
                            Favoriler
                        </p>
                    </div>
                    <div
                        onClick={() => paginate('recents')}
                        className="flex cursor-pointer flex-col items-center"
                    >
                        <AiFillClockCircle
                            className={`${
                                pages[pageIndex].name == 'recents'
                                    ? 'text-green-500 dark:text-green-500'
                                    : ''
                            } text-xl text-[#323232] dark:text-[#CDCDCD]`}
                        />
                        <p
                            className={` ${
                                pages[pageIndex].name == 'recents'
                                    ? 'text-green-500 dark:text-green-500'
                                    : ''
                            } inter mt-0.5 text-[11px] text-[#323232] dark:text-[#CDCDCD]`}
                        >
                            Geçmiş
                        </p>
                    </div>
                    <div
                        onClick={() => paginate('keyboard')}
                        className="flex cursor-pointer flex-col items-center"
                    >
                        <IoIosKeypad
                            className={`${
                                pages[pageIndex].name == 'keyboard'
                                    ? 'text-green-500 dark:text-green-500'
                                    : ''
                            } text-xl text-[#323232] dark:text-[#CDCDCD]`}
                        />
                        <p
                            className={`inter ${
                                pages[pageIndex].name == 'keyboard'
                                    ? 'text-green-500 dark:text-green-500'
                                    : ''
                            } mt-0.5 text-[11px] text-[#323232] dark:text-[#CDCDCD]`}
                        >
                            Tuşlar
                        </p>
                    </div>
                    <div
                        onClick={() => paginate('contacts')}
                        className="flex cursor-pointer flex-col items-center"
                    >
                        <BsFillPersonFill
                            className={`${
                                pages[pageIndex].name == 'contacts'
                                    ? 'text-green-500 dark:text-green-500'
                                    : ''
                            } text-xl text-[#323232] dark:dark:text-[#CDCDCD]`}
                        />
                        <p
                            className={`inter ${
                                pages[pageIndex].name == 'contacts'
                                    ? 'text-green-500 dark:text-green-500'
                                    : ''
                            } mt-0.5 text-[11px] text-[#323232] dark:text-[#CDCDCD]`}
                        >
                            Kişiler
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Rehber;
