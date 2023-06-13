import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import MessagesHome from './Messages/MessagesHome';
import { wrap } from 'popmotion';
import Chat from './Messages/Chat';
import { AnimatePresence, motion } from 'framer-motion';

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

const MessagesContext = React.createContext([]);
export const useMessages = () => React.useContext(MessagesContext);

function Messages() {
    const pages = [
        {
            name: 'home',
            element: <MessagesHome />
        },
        {
            name: 'chat',
            element: <Chat />
        }
    ];

    // const pages = [<Contacts/>, <ContactDetails/>, <Recents/>]
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

    const [activeChat, setActiveChat] = useState(null);

    const query = new URLSearchParams(useLocation().search);

    // useEffect(() => {
    //     const number = query.get("number")
    //     if (number) {
    //         console.log("query number :", number)
    //         setActiveChat(query.get("number"))
    //         changePage("messages");
    //     }
    // }, [])

    const values = {
        paginate,
        activeChat,
        setActiveChat
    };

    return (
        <div className="page bg-white !pt-0 dark:bg-[#0D0D0D]">
            <div className="relative h-full w-full bg-white dark:bg-[#0D0D0D]">
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
                            x: { type: 'tween', stiffness: 300, damping: 30 }
                            // opacity: { duration: 0.2 }
                        }}
                    >
                        <MessagesContext.Provider value={values}>
                            {pages[pageIndex].element}
                        </MessagesContext.Provider>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Messages;
