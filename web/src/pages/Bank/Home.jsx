import React, { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import clamp from 'lodash/clamp';
import range from 'lodash/range';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { useSettings } from '../../contexts/SettingsContext';
import { useEffect } from 'react';
import { fetchNui } from '../../utils/fetchNui';
import { isEnvBrowser } from '../../utils/misc';
import { useBank } from '../Bank';

function Home() {
    const constraintsRef = useState(null);
    const { settings } = useSettings();
    const {
        cards,
        transactions,
        setTransactions,
        accountIndex,
        setAccountIndex
    } = useBank();

    const Card = ({ data, id, onClick }) => {
        return (
            <div
                onClick={() => onClick(id)}
                className="relative mr-1 inline-block  h-[145.04px] w-[235px] cursor-pointer select-none rounded-md "
                style={{
                    background:
                        id == 0
                            ? 'linear-gradient(89.45deg, #151515 0.42%, #272727 54.46%, #171717 101.16%)'
                            : 'linear-gradient(89.45deg, #191445 0.42%, #3B3479 51.84%, #2A2A48 101.16%)'
                }}
            >
                <div className="!z-50 p-[14px]">
                    <div className="flex items-center ">
                        <img
                            className="z-10 mr-2 h-[18px] w-[18px]"
                            src={
                                'https://cdn.discordapp.com/attachments/1007679364776869928/1068577191912276028/image.png'
                            }
                        />
                        <p className="manrope z-10 text-[10.7368px] font-medium text-[#A5A5A5]">
                            SpinachBank
                        </p>
                    </div>

                    <div className="absolute bottom-0 left-0 p-[14px]">
                        <p className="manrope z-10 text-[15px] font-bold text-[#D1D1D1]">
                            ${data.money}
                        </p>
                        <p className="font-ligth manrope z-10 text-sm text-[#D1D1D1]">
                            {data.cardNumber}
                        </p>
                    </div>
                </div>
                <img
                    className="absolute  top-0 left-0 !z-0"
                    src={
                        id == 0
                            ? 'https://cdn.discordapp.com/attachments/1007679364776869928/1068544701029945495/image.png'
                            : 'https://cdn.discordapp.com/attachments/1008436176824303728/1070034559250477086/kartlogopng_1.png'
                    }
                />
            </div>
        );
    };

    const getName = x => {
        if (x.sender?.accountNumber == cards[accountIndex]?.cardNumber) {
            return x.sender;
        } else if (
            x.receiver?.accountNumber == cards[accountIndex]?.cardNumber
        ) {
            return x.receiver;
        }
    };

    return (
        <div class="absolute top-0 left-0 z-10 flex  h-full w-full flex-col gap-4 bg-[#EBEBEB] dark:bg-[#0D0D0D]">
            <div style={{ background: 'rgba(217, 217, 217, 0.04)' }}>
                <img
                    src="https://kagan.app/images/phone/banner_red.png"
                    className="w-full object-fill"
                />

                <div className="-translate-y-4  px-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBEBEB] dark:bg-[#151515]">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={settings.photo}
                        />
                    </div>
                    <div className="">
                        <p className="text-sm capitalize dark:text-white">
                            hello, {settings.name}
                        </p>
                        <p className="text-xs capitalize dark:text-[#5A5A5A]">
                            {cards[accountIndex]?.cardNumber}
                        </p>
                    </div>
                </div>
            </div>

            <div
                ref={constraintsRef}
                className="min-h-[145px] snap-x overflow-y-hidden overflow-x-scroll whitespace-nowrap px-2 "
            >
                <motion.div
                    animate={{ x: -238 * accountIndex }}
                    transition={{ type: 'tween' }}
                >
                    {cards?.map((acc, id) => (
                        <Card
                            onClick={id => setAccountIndex(id)}
                            data={acc}
                            id={id}
                        />
                    ))}
                </motion.div>
            </div>

            <div className="mt-1 flex items-center justify-center gap-1">
                {cards?.map((key, id) => (
                    <div
                        onClick={() => setAccountIndex(id)}
                        className={`h-1 w-8 ${
                            accountIndex == id
                                ? 'bg-[#1B1B1B] dark:bg-[#C9C9C9]'
                                : 'bg-[#1B1B1B]/20 dark:bg-[#C9C9C9]/20'
                        }  cursor-pointer rounded-[1.19444px]`}
                    ></div>
                ))}
            </div>

            <div className="mt-3 px-3">
                <div className="flex items-center justify-between border-b-2 border-[#D5D5D5] pb-1 dark:border-[#202020]">
                    <p className="manrope font-bold text-[#282828] dark:text-[#989898]">
                        Son İşlemler
                    </p>

                    <svg
                        className="cursor-pointer"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_4_98)">
                            y
                            <path
                                d="M11 11L10 10M5.75 10.5C6.37378 10.5 6.99145 10.3771 7.56775 10.1384C8.14404 9.89972 8.66768 9.54984 9.10876 9.10876C9.54984 8.66768 9.89972 8.14404 10.1384 7.56775C10.3771 6.99145 10.5 6.37378 10.5 5.75C10.5 5.12622 10.3771 4.50855 10.1384 3.93225C9.89972 3.35596 9.54984 2.83232 9.10876 2.39124C8.66768 1.95016 8.14404 1.60028 7.56775 1.36157C6.99145 1.12286 6.37378 1 5.75 1C4.49022 1 3.28204 1.50044 2.39124 2.39124C1.50044 3.28204 1 4.49022 1 5.75C1 7.00978 1.50044 8.21796 2.39124 9.10876C3.28204 9.99955 4.49022 10.5 5.75 10.5Z"
                                stroke="#404040"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_4_98">
                                <rect
                                    width="12"
                                    height="12"
                                    fill={
                                        settings.mode == 'dark'
                                            ? '#BEBEBE'
                                            : '#404040'
                                    }
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <div className="h-[170px] divide-y overflow-y-auto  dark:divide-[#202020] ">
                    {transactions?.map(
                        x =>
                            (x.accountNumber ==
                                cards[accountIndex]?.cardNumber ||
                                x.receiver?.accountNumber ==
                                    cards[accountIndex]?.cardNumber ||
                                x.sender?.accountNumber ==
                                    cards[accountIndex]?.cardNumber) && (
                                <div className="my-1 flex items-center justify-between py-1">
                                    <div className="flex items-center ">
                                        <img
                                            src={
                                                x.icon
                                                    ? x.icon
                                                    : getName(x)?.icon
                                            }
                                            className="mr-2 h-9 w-9 rounded-md"
                                        />
                                        <div>
                                            <p className="manrope text-[13.4534px] font-bold leading-[18px] text-[#282828] dark:text-[#D6D6D6]">
                                                {x.author?.name
                                                    ? x.author?.name
                                                    : getName(x)?.author
                                                    ? getName(x)?.author.name
                                                    : getName(x)?.name}
                                            </p>
                                            <p className="text-[11.4534px] leading-[18px] text-[#525252] dark:text-[#969696]">
                                                {x?.accountNumber
                                                    ? x?.accountNumber
                                                    : getName(x)?.accountNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="manrope text-[13.4534px] font-bold text-[#262626] dark:text-[#CDCDCD]">
                                        {x.actionType == 'withdraw' ||
                                        x.actionType == 'transfer'
                                            ? '-'
                                            : '+'}{' '}
                                        {x.amount}
                                    </p>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
