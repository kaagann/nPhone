import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
    FaCamera,
    FaChevronLeft,
    FaChevronRight,
    FaMapPin,
    FaPhone
} from 'react-icons/fa';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { motion } from 'framer-motion';
import { useMessages } from '../Messages';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiOutlineCamera } from 'react-icons/ai';
import { attemptCall } from '../../utils/misc';
import { useSettings } from '../../contexts/SettingsContext';

const Chat = () => {
    const { paginate, setActiveChat, activeChat } = useMessages();
    const { cache, setCache } = useSettings();

    const [chat, setChat] = useState([]);
    const [chatUsername, setChatUsername] = useState(null);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [gallery, setGallery] = useState(false);
    const chatRef = useRef();
    let [searchParams, setSearchParams] = useSearchParams();

    useNuiEvent('setChatUsername', setChatUsername);

    useEffect(() => {
        const getChat = () => fetchNui('getChat', activeChat).then(setChat);
        getChat();
    }, []);

    const submit = coords => {
        if (coords) {
            fetchNui('sendMessage', {
                msg: '',
                number: activeChat,
                coords
            }).then(setChat);
        }

        if (message) {
            fetchNui('sendMessage', {
                msg: message,
                number: activeChat,
                coords,
                image
            }).then(setChat);
            setImage(null);
        }

        setMessage('');
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

    useNuiEvent('setChat', data => {
        if (parseInt(data.number) == parseInt(activeChat)) {
            setChat(data.chat);
        }
    });

    useEffect(() => {
        chatRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    return (
        <motion.div className="page flex flex-col bg-white dark:bg-[#0D0D0D]">
            {gallery && (
                <Gallery
                    setCurrentPage={e => setGallery(false)}
                    setURL={setImage}
                />
            )}
            <div className="mt-1 flex w-full items-center justify-between border-b px-3 pb-2  dark:border-[#C2C2C2]/10 dark:bg-[#111111] dark:text-white">
                <div className="flex items-center gap-1">
                    <div
                        onClick={() => paginate('home')}
                        className="flex cursor-pointer items-center hover:text-blue-500"
                    >
                        <FaChevronLeft className="text-xs" />
                        <p className="inter text-xs">Geri</p>
                    </div>
                    <img
                        className="ml-1 h-8 w-8 rounded-full"
                        src="https://kagan.app/images/phone/user.png"
                    />
                    <p className="inter text-sm font-semibold">
                        {chatUsername ?? activeChat}
                    </p>
                </div>

                <FaPhone
                    onClick={e => attemptCall(activeChat)}
                    className="cursor-pointer text-xs text-[#55ad4f]"
                />
            </div>

            <div className="min-h-[78%] overflow-y-auto px-3 pt-2">
                {chat?.map(x =>
                    x.number == activeChat ? (
                        <div className="my-1 flex flex-row items-center justify-start">
                            <img
                                className="mr-1 h-6 w-6 rounded-full"
                                src="https://kagan.app/images/phone/user.png"
                            />
                            <div className="inter w-[78%] rounded-lg bg-black/10 p-1 px-2 text-sm text-black">
                                <img
                                    onClick={e =>
                                        setCache({ ...cache, picture: x.image })
                                    }
                                    src={x.image}
                                />
                                <p className="">{x.msg}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="my-1 flex flex-row items-center justify-end">
                            <div className="inter w-[78%] rounded-lg bg-[#007d73] p-1 px-2 text-sm text-white">
                                <img
                                    onClick={e =>
                                        setCache({ ...cache, picture: x.image })
                                    }
                                    src={x.image}
                                />
                                <p className="">{x.msg}</p>
                            </div>
                            <img
                                className="ml-1 h-6 w-6 rounded-full"
                                src="https://kagan.app/images/phone/user.png"
                            />
                        </div>
                    )
                )}
                <div ref={chatRef}></div>
            </div>

            <div className="flex h-[73px] w-full flex-1 items-center gap-1 border-t bg-[#007d73]/10 px-2 pb-6 dark:border-[#C2C2C2]/10">
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => {
                        if (e.key.toLocaleLowerCase() == 'enter'.toLowerCase())
                            submit();
                    }}
                    className="inter w-[73%] bg-transparent outline-none dark:text-white"
                    placeholder="Mesaj yaz"
                />
                <AiOutlineCamera
                    onClick={e => setGallery(true)}
                    className="cursor-pointer text-[#007d73]"
                />
                <HiOutlineLocationMarker
                    onClick={() => submit(true)}
                    className="cursor-pointer text-[#007d73]"
                />
                <div
                    onClick={() => submit()}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#007d73] text-white"
                >
                    <FaChevronRight className="text-sm" />
                </div>
            </div>
        </motion.div>
    );
};

const Gallery = ({ setURL, setCurrentPage }) => {
    const [photos, setPhotos] = useState([]);
    useNuiEvent('setPhotos', setPhotos);

    useEffect(() => {
        const getPhotos = () => fetchNui('getPhotos').then(setPhotos);

        getPhotos();
    }, []);

    return (
        <div className="page bg-[#fff] dark:bg-black">
            <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                transition={{ type: 'tween' }}
                className="relative h-full w-full pt-8"
            >
                <FaChevronLeft
                    onClick={() => setCurrentPage('chat')}
                    className="ml-1 cursor-pointer dark:text-white"
                />
                <div className="h-[95%] overflow-y-auto">
                    <div className="px-2 py-4">
                        <div className="grid grid-cols-3 items-center">
                            {photos.map(value => (
                                <div
                                    onClick={() => {
                                        setURL(value.url);
                                        setCurrentPage('chat');
                                    }}
                                    className="h-[5.5rem] w-[5.5rem] cursor-pointer border-2 border-b-0 border-black dark:border-[#1C1C1E]"
                                >
                                    <img
                                        className="h-full w-full object-cover"
                                        src={value.url}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Chat;
