import React, { useState, useEffect } from 'react';
import Home from './Twitter/Home';
import { wrap } from 'popmotion';
import { motion, AnimatePresence } from 'framer-motion';
import Post from './Twitter/Post';
import Gallery from '../components/Gallery';
import Comments from './Twitter/Comments';
import { fetchNui } from '../utils/fetchNui';

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

const TwitterPageContext = React.createContext([]);
export const useTwitterPage = () => React.useContext(TwitterPageContext);

function Twitter() {
    const pages = [
        {
            name: 'home',
            element: <Home />
        },
        {
            name: 'post',
            element: <Post />
        },
        {
            name: 'comments',
            element: <Comments />
        }
    ];

    const [[page, direction], setPage] = useState(['home', 0]);
    const [showNavigation, setNavigation] = useState(true);
    const [activePageId, setActivePage] = useState(null);
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
        paginate,
        setActivePage,
        activePageId
    };

    useEffect(() => {
        // setFiltered(null);
        var inputs, index;
        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].addEventListener('focusin', () => {
                fetchNui('inputFocus', true);
            });

            inputs[index].addEventListener('focusout', () => {
                fetchNui('inputFocus', false);
                // post('https://phone/focus', JSON.stringify({ toggle: false }));
            });
        }
    }, []);

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
                        <TwitterPageContext.Provider value={values}>
                            {pages[pageIndex].element}
                        </TwitterPageContext.Provider>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Twitter;
