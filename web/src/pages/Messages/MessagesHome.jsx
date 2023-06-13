import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import moment from 'moment';
import { useMessages } from '../Messages';
import Modal from '../../components/Modal';
import { useSettings } from '../../contexts/SettingsContext';

export default function MessagesHome() {
    const { paginate, setActiveChat } = useMessages();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(false);
    const handleNew = () => setNewMessage(!newMessage);
    const { settings, setCache, cache } = useSettings();


    useEffect(() => {
        console.log(cache, cache.number)
        if (cache.number)  {
            openChat({number: cache.number})
            setCache({...cache, number: null})
        };
    }, []);

    useEffect(() => {
        const getMessages = () => fetchNui('getMessages').then(setMessages);

        getMessages();
    }, []);

    useNuiEvent('setMessages', setMessages);

    const [modalDisplay, setModalDisplay] = useState(false);

    const openModal = () => {
        setModalDisplay(!modalDisplay);
    };

    const openChat = message => {
        setActiveChat(message.number);
        paginate('chat');
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

    const inputs = [
        {
            name: 'number',
            placeholder: 'Numara'
        }
    ];

    return (
        <div className=" bg-white">
            {modalDisplay && (
                <Modal
                    onClose={openModal}
                    onSubmit={values => openChat({ number: values['number'] })}
                    inputs={inputs}
                    header="Yeni Mesaj"
                />
            )}

            <div className="flex w-full items-center justify-between border-b bg-gray-200 px-4 pt-8  pb-2 dark:border-[#C2C2C2]/10 dark:bg-[#111111] dark:text-white">
                <div className="flex items-center gap-1 ">
                    <img
                        className="mr-1 h-10 w-10 rounded-full"
                        src={settings?.photo}
                    />
                    <div>
                        <p className="inter text-[11px]">Merhaba 👋</p>
                        <p className="inter text-sm font-medium">
                            {settings?.name}
                        </p>
                    </div>
                </div>

                <svg
                    onClick={openModal}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9 2H3V3H9V2Z" fill="#4C505B" />
                    <path d="M9 4H3V5H9V4Z" fill="#4C505B" />
                    <path d="M3 6H7V7H3V6Z" fill="#4C505B" />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 0C0.89543 0 0 0.895431 0 2V7C0 8.10457 0.895431 9 2 9V12L5.4433 9H10C11.1046 9 12 8.10457 12 7V2C12 0.895431 11.1046 0 10 0H2ZM1 2C1 1.44772 1.44772 1 2 1H10C10.5523 1 11 1.44772 11 2V7C11 7.55228 10.5523 8 10 8H5.0567L3 9.73945V8H2C1.44772 8 1 7.55228 1 7V2Z"
                        fill="#4C505B"
                    />
                </svg>
            </div>

            <div>
                {messages.map(message => (
                    <div
                        onClick={() => openChat(message)}
                        className="flex w-full cursor-pointer items-center justify-between px-4 py-2"
                    >
                        <div className="flex items-center gap-1">
                            <img
                                className="mr-1 h-10 w-10 rounded-full"
                                src="https://kagan.app/images/phone/user.png"
                            />
                            <div>
                                <p className="inter text-sm font-semibold">
                                    {message.name}
                                </p>
                                <p
                                    style={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                    className="inter max-w-[160px] text-xs text-[11px] leading-3"
                                >
                                    {message.msg}
                                </p>
                            </div>
                        </div>

                        <p className="inter text-[11px] font-semibold opacity-50">
                            {moment(message.date).format('LT')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
