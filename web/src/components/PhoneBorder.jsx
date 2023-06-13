import React, { useEffect, useState } from 'react';
import { AiFillSignal } from 'react-icons/ai';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_PATH } from '../utils/router';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import { NotificationProvider } from '../contexts/NotificationContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useDisplay } from '../contexts/DisplayContext';
import { useSettings } from '../contexts/SettingsContext';
import useDarkMode from '../hooks/useDarkMode';
import BigPicture from './BigPicture';

function PhoneBorder({ children }) {
    const [date, setDate] = useState(new Date());
    const { settings, setSettings, setPhoneTheme } = useSettings();
    const [colorTheme, setTheme, setCustomTheme] = useDarkMode();

    const { open, setOpen, half, setHalf } = useDisplay();
    const [toasts, setToasts] = useState(0);

    useNuiEvent('phoneLoad', data => {
        setCustomTheme(data.theme);
    });

    useNuiEvent('handleOpen', data => {
        if (data) {
            setHalf(false);
            setOpen(true);
        }
    });

    const closeNui = () => {
        fetchNui('hideFrame');
    };

    useEffect(() => {
        const interval = () =>
            setInterval(() => {
                setDate(new Date());
            }, 1000);

        interval();
    }, []);

    useNuiEvent('closePhone', () => {
        if (toasts > 0) {
            setHalf(true);
        } else {
            setOpen(false);
        }
    });

    useEffect(() => {
        // Only attach listener when we are visible
        if (!open) return;

        const keyHandler = e => {
            if (['Escape'].includes(e.code)) {
                closeNui();
            }
        };

        window.addEventListener('keydown', keyHandler);

        return () => window.removeEventListener('keydown', keyHandler);
    }, [open]);

    let navigate = useNavigate();
    return (
        <div className="absolute right-5 bottom-5">
            <AnimatePresence initial={false}>
                <motion.div
                    initial={{ y: 1000 }}
                    animate={{ y: open ? (half ? 500 : 0) : 1000 }}
                    exit={{ y: 1000 }}
                    transition={{ type: 'tween' }}
                    className={`telshadow h-[650px] w-[320px] ${
                        settings.ringColor == ''
                            ? 'ring-[#ef9461]'
                            : settings.ringColor
                    } relative z-50 rounded-[2.2rem] border-8 border-black ring-4`}
                >
                    <div className="absolute top-16 left-0 h-[21.37px] w-[8.16px] -translate-x-[14.5px] rounded-xl bg-[#D04457]"></div>
                    <div className="absolute top-28 left-0 h-10 w-1 -translate-x-[14.5px] rounded-xl bg-[#D04457]"></div>
                    <div className="absolute top-40 left-0 h-10 w-1 -translate-x-[14.5px] rounded-xl bg-[#D04457]"></div>
                    <div className="absolute top-28 right-0 h-16 w-1 translate-x-[14.5px] rounded-xl bg-[#D04457]"></div>
                    <div
                        className="bg-blur oveflow-y-hidden relative flex  h-full w-full flex-col !overflow-x-hidden rounded-[1.5rem] bg-cover pt-1.5"
                        style={{
                            backgroundImage: `url('https://kagan.app/images/phone/${settings.bg}.png')`
                        }}
                    >
                        <NotificationProvider
                            setHalf={setHalf}
                            setOpen={setOpen}
                            half={half}
                            toasts={toasts}
                            setToasts={setToasts}
                        >
                            <div className="absolute top-0 z-[1000] grid w-full grid-cols-2 items-center justify-between px-3 pt-1.5 ">
                                <div className="">
                                    <p className="mx-1 text-xs text-black dark:text-white">
                                        {moment(date).format('LT')}
                                    </p>
                                </div>
                                <div className="absolute inset-x-0 top-0 ml-2.5">
                                    <div className="mx-auto flex h-6  w-36 items-center justify-center gap-2 rounded-b-[1.2rem] bg-black pb-2 pl-2">
                                        <div className="h-1 w-10 rounded-xl bg-[#1f1f1f]" />
                                        <div className="h-3 w-3  rounded-xl bg-[#1f1f1f]" />
                                    </div>
                                </div>
                                <div className="mx-1 flex flex-row-reverse items-end ">
                                    <div className="mr-[2px] h-[10px] w-[4px] rounded-[1px] bg-black/50  dark:bg-white/50"></div>
                                    <div className="mr-[2px] h-[8px] w-[4px]  rounded-[1px] bg-black  dark:bg-white"></div>
                                    <div className="mr-[2px] h-[6px] w-[4px]  rounded-[1px]  bg-black dark:bg-white"></div>
                                    <div className="mr-[2px] h-[4px] w-[4px]  rounded-[1px]  bg-black  dark:bg-white"></div>
                                </div>
                            </div>

                            <div className="absolute top-0 left-0 h-full w-full rounded-[1.5rem]">
                                {children}
                            </div>

                            <div
                                className="group absolute bottom-0 mb-1 flex h-5 w-full items-center justify-center "
                                style={{ zIndex: '999999999998' }}
                            >
                                <div
                                    className="h-[5px] w-[37%] cursor-pointer rounded-xl bg-black opacity-0 transition-all group-hover:opacity-100 dark:bg-white"
                                    onClick={() =>
                                        navigate(REDIRECT_PATH.HOME_PAGE)
                                    }
                                    style={{ zIndex: '999999999999' }}
                                ></div>
                            </div>
                        </NotificationProvider>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default PhoneBorder;
