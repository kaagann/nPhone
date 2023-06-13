import React, { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { fetchNui } from '../../utils/fetchNui';
import { useBank } from '../Bank';

function SendMoney() {
    const { paginate, iban, cards, accountIndex } = useBank();
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const [number, setNumber] = useState('');

    const sendMoney = () => {
        fetchNui('sendTransfer', {
            amount: parseInt(number),
            accountNumber: cards[accountIndex]?.cardNumber,
            receiverAccountNumber: iban,
            type: 'transfer'
        });
        paginate("transfer")
    };

    return (
        <div className="absolute top-0 left-0 flex h-full w-full flex-col gap-4 bg-[#EBEBEB] pt-8  dark:bg-[#0D0D0D]">
            <div className="flex items-center justify-between px-2">
                <FaAngleLeft
                    className="cursor-pointer dark:text-white"
                    onClick={e => paginate('transfer')}
                />
                <p className="inter font-semibold dark:text-[#DADADA]">
                    Para Transferi
                </p>
                <div></div>
            </div>
            <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-gray-900"></div>
                <p className=" mt-1 text-sm font-bold text-[#282828] dark:text-[#D7D7D7]">
                    Nano Kullanıcı
                </p>
                <p className="text-xs text-[#525252]">{iban}</p>

                <div className="mt-3">
                    <input
                        placeholder="Miktar"
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        className="border-b-2 border-[#D5D5D5]  bg-transparent p-2 text-center outline-none"
                    />
                </div>

                <div className="mt-3 grid flex-1 grid-cols-3 items-start justify-start gap-4">
                    {keys.map(x => (
                        <button
                            onClick={() => setNumber(number + x)}
                            className="h-16 w-16 rounded-xl transition hover:bg-gray-200 dark:text-[#DADADA] dark:hover:bg-white/10"
                        >
                            {x}
                        </button>
                    ))}
                </div>
                <div
                    onClick={sendMoney}
                    className="mt-1 cursor-pointer rounded bg-[#282828] p-2 px-8 text-center text-white"
                >
                    Gönder
                </div>
            </div>
        </div>
    );
}

export default SendMoney;
