import React, { useEffect, useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { attemptCall } from '../../utils/misc';
import { REDIRECT_PATH } from '../../utils/router';
import { usePhone } from '../Rehber';

function Keyboard() {
    const { paginate, setNavigation } = usePhone();
    const [number, setNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setNavigation(false);
    }, []);

    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

    return (
        <div className="page flex h-full w-full flex-col items-center justify-between bg-white px-4 py-12 dark:bg-[#0D0D0D]">
            <div className="flex h-7 justify-center">
                <p className="text-xl dark:text-[#DADADA]">{number}</p>
            </div>

            <div className="grid flex-1 grid-cols-3 items-start justify-start gap-4 py-8">
                {keys.map(x => (
                    <button
                        onClick={() => setNumber(number + x)}
                        className="h-16 w-16 rounded-xl transition hover:bg-gray-200 dark:text-[#DADADA] dark:hover:bg-white/10"
                    >
                        {x}
                    </button>
                ))}
            </div>

            <div className="flex w-full items-center justify-around">
                <div>
                    <BsChatLeftTextFill
                        onClick={() => navigate(REDIRECT_PATH.MESSAGES)}
                        className="cursor-pointer text-[#4C505B] dark:text-[#DADADA]"
                    />
                </div>

                <div
                    onClick={() => attemptCall(number)}
                    className="cursor-pointer rounded-xl bg-green-600 px-6 py-1 text-center text-white hover:bg-green-700"
                >
                    <p>Ara</p>
                </div>

                <div>
                    <AiOutlinePhone
                        onClick={() => paginate('contacts')}
                        className="cursor-pointer text-xl dark:text-[#DADADA]"
                    />
                </div>
            </div>
        </div>
    );
}

export default Keyboard;
