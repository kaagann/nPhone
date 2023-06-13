import React, { useEffect, useState } from 'react';
import { FaPhone, FaPhoneAlt, FaPhoneSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import { PlayAudio } from '../utils/misc';
import { REDIRECT_PATH } from '../utils/router';
import { useDisplay } from './DisplayContext';
import { useSettings } from './SettingsContext';

const NotificationContext = React.createContext([]);

export function NotificationProvider({ children, toasts, setToasts }) {
    const location = useLocation();
    const { setOpen, setHalf } = useDisplay();
    const { settings, setSettings } = useSettings();

    useEffect(() => {
        const getData = () => fetchNui('getSettings').then(setSettings);

        getData();
    }, []);

    useNuiEvent('notify', data => {
        let open;
        let half;

        setOpen(v => {
            console.log('open: ', v);
            open = v;
            return v;
        });

        setHalf(v => {
            console.log('half: ', v);
            half = v;
            return v;
        });

        if (!half && !open) {
            setHalf(true);
        }

        setOpen(true);

        addNotification(data.app, data.data, data.title, data.text);
    });

    // useEffect(() => {
    //     addNotification('phone', 'Gelen çağrı', 'test', 'test');
    // }, []);

    const addNotification = (app, data, title, text, always) => {
        console.log(location, REDIRECT_PATH.MESSAGES);
        const whenAcitive = ['/twitter', '/messages'];

        if (!whenAcitive.includes(location.pathname.toLowerCase())) {
            toast(
                ({ closeToast }) => (
                    <Notification
                        settings={settings}
                        closeToast={closeToast}
                        app={app}
                        data={data}
                        title={title}
                        text={text}
                    />
                ),
                {
                    delay: 0,
                    autoClose: app === 'phone' || data?.always ? false : 5000,
                    onOpen: () => setToasts(toasts => toasts + 1),
                    onClose: () => {
                        var half;

                        setHalf(v => {
                            half = v;
                            return v;
                        });

                        setToasts(toasts => {
                            var n = toasts - 1;
                            if (n < 1) {
                                if (half) {
                                    setOpen(false);
                                }
                            }
                            return n;
                        });
                    }
                }
            );
        }
    };

    const data = { addNotification };
    return (
        <NotificationContext.Provider value={data}>
            <div className="page !pt-2">
                <div className="absolute top-0 left-0 h-full w-full">
                    <div className="relative h-full w-full overflow-hidden">
                        <ToastContainer
                            position="top-center"
                            closeOnClick={false}
                            draggable={false}
                            newestOnTop
                            transition={Slide}
                            limit={5}
                            hideProgressBar
                            theme="dark"
                            closeButton={false}
                            pauseOnFocusLoss={false}
                        />
                    </div>
                </div>
                {children}
            </div>
        </NotificationContext.Provider>
    );
}

const Notification = ({ settings, app, data, title, text, closeToast }) => {
    const [status, setStatus] = useState(null);
    const [onCall, setCall] = useState(false);
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        if (app === 'phone') {
            setStatus(data?.caller ? 'Aranıyor...' : 'Gelen Çağrı...');

            if (data?.caller) {
                var audio = PlayAudio(
                    process.env.PUBLIC_URL + `/rings/ringing.ogg`
                );
                setAudio(audio);
            } else {
                var audio = PlayAudio(
                    process.env.PUBLIC_URL + '/rings/cellcall.ogg'
                );
                setAudio(audio);
            }
        }
    }, []);

    useNuiEvent('answerCall', () => {
        setCall(true);
        setStatus('Connected.');
        audio?.stop();
    });

    useNuiEvent('declineCall', () => {
        setCall(false);
        setFinished(true);
        setStatus('Disconnected.');
        setTimeout(() => {
            closeToast();
        }, 1000);
        audio?.stop();
    });

    useNuiEvent('updateNotificationText', data => {
        setStatus(data);
    });

    const answerCall = () => fetchNui('answerCall', { number: data.number });
    const declineCall = () => fetchNui('declineCall', { number: data.number });

    const handleClick = () => {
        if (app == 'phone') return;

        // if (app == 'messages') {
        //     navigate(`${REDIRECT_PATH.MESSAGES}?number=${data.number}`);
        // }

        closeToast();
    };

    return (
        <div
            onClick={handleClick}
            className="h-fit w-full"
            style={{ pointerEvents: 'all' }}
        >
            <div className="flex items-center">
                <img
                    className="mr-2 h-[20px] w-[20px] rounded-[4.33333px]"
                    src={process.env.PUBLIC_URL + `/apps/${app}.png`}
                />
                <p className="text-[#c8c6ca]">{title}</p>
            </div>
            <div className="mt-1 flex items-center justify-between">
                <p
                    className="inter inter w-[190px] overflow-hidden"
                    style={{
                        fontWeight: '200',
                        wordBreak: 'break-word',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {status ?? text}
                </p>
                {status && app == 'phone' && (
                    <div className="flex items-center">
                        <div
                            onClick={declineCall}
                            className="mr-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-xs hover:bg-red-600"
                        >
                            <FaPhoneSlash />
                        </div>
                        {!data?.caller && !onCall && !finished && (
                            <div
                                onClick={answerCall}
                                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-green-500 text-xs hover:bg-green-600"
                            >
                                <FaPhone />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export const useNotification = () => React.useContext(NotificationContext);
