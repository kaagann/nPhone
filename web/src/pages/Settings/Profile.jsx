import React, { useEffect } from 'react';
import { FaAngleLeft, FaCamera, FaChevronLeft } from 'react-icons/fa';
import { useSettings } from '../../contexts/SettingsContext';
import { useSettingsPage } from '../Settings';
import { MdMail } from 'react-icons/md';
import { useState } from 'react';
import { fetchNui } from '../../utils/fetchNui';
import { motion } from 'framer-motion';
import { useNuiEvent } from '../../hooks/useNuiEvent';

function Profile() {
    const { paginate } = useSettingsPage();
    const { settings } = useSettings();

    return (
        <div class="absolute top-0 left-0 z-10 flex  h-full w-full flex-col gap-4 bg-[#EBEBEB] dark:bg-[#0D0D0D]">
            <img
                src="https://kagan.app/images/phone/nsiz.png"
                className="h-[95px] w-full object-fill"
            />
            <div
                onClick={() => paginate('home')}
                className="rounde-full absolute top-10 left-5 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#EBEBEB]"
            >
                <FaAngleLeft />
            </div>
            <div className="flex w-full -translate-y-[75px] flex-col items-center">
                <div className="flex items-center justify-center">
                    <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-[#EBEBEB] dark:bg-[#0D0D0D]">
                        <div className="flex h-[72px] w-[72px] items-center justify-center  rounded-full border-2 border-[#EBD4D7]">
                            <img
                                src={settings.photo}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        </div>
                        <div
                            onClick={e => paginate('gallery')}
                            className="absolute hidden h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full bg-black/50 text-white group-hover:flex"
                        >
                            <FaCamera />
                        </div>
                    </div>
                </div>

                <p className=" text-xl font-medium text-[#313131] dark:text-[#D9D9D9]">
                    {settings.name}
                </p>
                <p className=" text-sm font-medium text-[#585858] dark:text-[#969696]">
                    {settings.number}
                </p>

                {/* <div
                    className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border border-[#D04457] py-1.5 px-4"
                    style={{
                        background:
                            'linear-gradient(90.81deg, rgba(208, 68, 87, 0) 4.99%, rgba(208, 68, 87, 0.19) 147.34%)'
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.7667 0.605469H4.6143C1.5381 0.605469 0 2.14357 0 5.21977V15.2174C0 15.6404 0.346072 15.9865 0.769049 15.9865H10.7667C13.8429 15.9865 15.381 14.4484 15.381 11.3722V5.21977C15.381 2.14357 13.8429 0.605469 10.7667 0.605469ZM7.00604 11.8797C6.81378 12.072 6.46002 12.2489 6.19854 12.2873L4.59892 12.5104C4.53739 12.518 4.47587 12.5257 4.42203 12.5257C4.15287 12.5257 3.90677 12.4334 3.72989 12.2566C3.51456 12.0412 3.42227 11.7259 3.4761 11.3875L3.69913 9.78792C3.73758 9.52644 3.91446 9.16499 4.10672 8.98042L7.00604 6.0811C7.10863 6.37285 7.24002 6.65365 7.39826 6.91936C7.45978 7.02703 7.52899 7.1347 7.59052 7.2116C7.66742 7.32696 7.74433 7.42694 7.79816 7.48077C7.82892 7.52691 7.85968 7.55768 7.86737 7.57306C8.03657 7.76532 8.21345 7.94989 8.38264 8.08832C8.42878 8.13446 8.45954 8.15753 8.46723 8.16522C8.56721 8.24213 8.6595 8.32672 8.75178 8.38056C8.85176 8.45746 8.95943 8.52668 9.06709 8.5882C9.19783 8.66511 9.33626 8.74201 9.48238 8.81123C9.6285 8.88044 9.76693 8.93427 9.90536 8.98042L7.00604 11.8797ZM11.1897 7.70379L10.5898 8.30365C10.5514 8.34211 10.4975 8.36518 10.4437 8.36518C10.4283 8.36518 10.3975 8.36518 10.3822 8.35749C9.72797 8.16866 9.13231 7.81709 8.65084 7.33562C8.16936 6.85415 7.81779 6.25849 7.62897 5.60429C7.6059 5.53508 7.62897 5.45817 7.6828 5.40434L8.29035 4.79679C9.28243 3.80471 10.2207 3.82779 11.1897 4.79679C11.6819 5.28898 11.928 5.76579 11.9203 6.25798C11.9203 6.74248 11.6819 7.2116 11.1897 7.70379Z"
                            fill="#D04457"
                        />
                    </svg>
                    <p className="text-xs font-bold text-[#202020] dark:text-[#D9D9D9]">
                        Profili Düzenle
                    </p>
                </div> */}

                <div className="mt-8 w-full divide-y divide-[#D0D0D0] px-4 dark:divide-[#333333]">
                    <div className="py-2">
                        <p className="text-xs font-semibold dark:text-[#969696]">
                            Telefon Numarası
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <div
                                className="flex h-7 w-7 items-center justify-center rounded-sm"
                                style={{
                                    background:
                                        settings.mode == 'light'
                                            ? 'rgba(81, 81, 81, 0.06)'
                                            : 'rgba(203, 203, 203, 0.05);'
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 6.1625C13.6925 6.1625 13.4375 5.9075 13.4375 5.6V2.5625H10.4C10.0925 2.5625 9.8375 2.3075 9.8375 2C9.8375 1.6925 10.0925 1.4375 10.4 1.4375H14C14.3075 1.4375 14.5625 1.6925 14.5625 2V5.6C14.5625 5.9075 14.3075 6.1625 14 6.1625ZM7.2875 10.2125L5.9 11.6C5.6075 11.8925 5.1425 11.8925 4.8425 11.6075C4.76 11.525 4.6775 11.45 4.595 11.3675C3.83658 10.604 3.13707 9.78416 2.5025 8.915C1.8875 8.06 1.3925 7.205 1.0325 6.3575C0.68 5.5025 0.5 4.685 0.5 3.905C0.5 3.395 0.59 2.9075 0.77 2.4575C0.95 2 1.235 1.58 1.6325 1.205C2.1125 0.7325 2.6375 0.5 3.1925 0.5C3.4025 0.5 3.6125 0.545 3.8 0.635C3.995 0.725 4.1675 0.86 4.3025 1.055L6.0425 3.5075C6.1775 3.695 6.275 3.8675 6.3425 4.0325C6.41 4.19 6.4475 4.3475 6.4475 4.49C6.4475 4.67 6.395 4.85 6.29 5.0225C6.1925 5.195 6.05 5.375 5.87 5.555L5.3 6.1475C5.2175 6.23 5.18 6.3275 5.18 6.4475C5.18 6.5075 5.1875 6.56 5.2025 6.62C5.225 6.68 5.2475 6.725 5.2625 6.77C5.3975 7.0175 5.63 7.34 5.96 7.73C6.2975 8.12 6.6575 8.5175 7.0475 8.915C7.1225 8.99 7.205 9.065 7.28 9.14C7.58 9.4325 7.5875 9.9125 7.2875 10.2125ZM15.4775 12.7475C15.4765 13.0305 15.4125 13.3098 15.29 13.565C15.1625 13.835 14.9975 14.09 14.78 14.33C14.4125 14.735 14.0075 15.0275 13.55 15.215C13.5425 15.215 13.535 15.2225 13.5275 15.2225C13.085 15.4025 12.605 15.5 12.0875 15.5C11.3225 15.5 10.505 15.32 9.6425 14.9525C8.78 14.585 7.9175 14.09 7.0625 13.4675C6.77 13.25 6.4775 13.0325 6.2 12.8L8.6525 10.3475C8.8625 10.505 9.05 10.625 9.2075 10.7075C9.245 10.7225 9.29 10.745 9.3425 10.7675C9.4025 10.79 9.4625 10.7975 9.53 10.7975C9.6575 10.7975 9.755 10.7525 9.8375 10.67L10.4075 10.1075C10.595 9.92 10.775 9.7775 10.9475 9.6875C11.12 9.5825 11.2925 9.53 11.48 9.53C11.6225 9.53 11.7725 9.56 11.9375 9.6275C12.1025 9.695 12.275 9.7925 12.4625 9.92L14.945 11.6825C15.14 11.8175 15.275 11.975 15.3575 12.1625C15.4325 12.35 15.4775 12.5375 15.4775 12.7475Z"
                                        fill={
                                            settings.mode == 'dark'
                                                ? '#D9D9D9'
                                                : 'black'
                                        }
                                    />
                                </svg>
                            </div>

                            <p className="text-sm font-medium text-[#333333] dark:text-[#D9D9D9]">
                                {settings.number}
                            </p>
                        </div>
                    </div>
                    <div className="py-2">
                        <p className="text-xs font-semibold dark:text-[#969696]">
                            Mail Adresi
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <div
                                className="flex h-7 w-7 items-center justify-center rounded-sm dark:text-[#D9D9D9]"
                                style={{
                                    background:
                                        settings.mode == 'light'
                                            ? 'rgba(81, 81, 81, 0.06)'
                                            : 'rgba(203, 203, 203, 0.05);'
                                }}
                            >
                                <MdMail />
                            </div>

                            <p className="text-sm font-medium text-[#333333] dark:text-[#D9D9D9]">
                                {settings.name}@nano.net
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
