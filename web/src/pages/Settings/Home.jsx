import React, { useState, useEffect } from 'react';
import { fetchNui } from '../../utils/fetchNui';
import {
    FaAngleRight,
    FaChevronLeft,
    FaChevronRight,
    FaPlane
} from 'react-icons/fa';
import { useNotification } from '../../contexts/NotificationContext';
import useDarkMode from '../../hooks/useDarkMode';
import { useSettings } from '../../contexts/SettingsContext';
import { useSettingsPage } from '../Settings';

function Home() {
    const { addNotification } = useNotification();
    const { paginate } = useSettingsPage();
    const [bg, setBg] = useState('1.jpg');
    const [page, setPage] = useState('home');
    const { settings, setSettings, setPhoneTheme } = useSettings();

    useEffect(() => {
        const getData = () => fetchNui('getSettings').then(setSettings);

        getData();
    }, []);

    return (
        <div class="absolute top-0 left-0 z-10 flex  h-full w-full flex-col gap-4 bg-[#EBEBEB] dark:bg-[#0D0D0D]">
            <img
                src="https://kagan.app/images/phone/nsiz.png"
                className="h-[95px] w-full object-fill"
            />
            <div className="flex w-full -translate-y-[75px] flex-col">
                <div className="flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EBEBEB] dark:bg-[#0D0D0D]">
                        <div className="flex h-[72px] w-[72px] items-center justify-center  rounded-full border-2 border-[#EBD4D7]">
                            <img
                                src={settings.photo}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between px-2">
                    <div className="flex-1"></div>
                    <div className="flex-1 text-center">
                        <p className=" text-xl font-medium text-[#313131] dark:text-[#D9D9D9]">
                            {settings.name}
                        </p>
                        <p className=" text-sm font-medium text-[#585858] dark:text-[#969696]">
                            {settings.number}
                        </p>
                    </div>
                    <div className="flex flex-1 items-center justify-end dark:text-[#D9D9D9]">
                        <FaChevronRight
                            onClick={() => paginate('profile')}
                            className="cursor-pointer"
                        />
                    </div>
                </div>

                <div className="mt-4 px-4">
                    <p className="text-sm font-medium text-[#565656] dark:text-[#969696]">
                        Servisler
                    </p>
                    <div className="flex items-center justify-between gap-2 border-t border-t-[#BFBFBF] py-2 dark:border-t-[#333333]">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#4666D6] text-sm text-white">
                                <FaPlane />
                            </div>
                            <p className="dark:text-[#D9D9D9]">Uçak Modu</p>
                        </div>
                        <input
                            checked={settings.airplane}
                            onChange={e =>
                                setSettings({
                                    ...settings,
                                    airplane: e.target.checked
                                })
                            }
                            type="checkbox"
                        />
                    </div>
                </div>

                <div className="mt-6 divide-y divide-[#BFBFBF] px-4 dark:divide-[#333333]">
                    <p className="text-sm font-medium text-[#565656] dark:text-[#969696]">
                        Servisler
                    </p>
                    <div className="flex items-center justify-between gap-2 py-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3A0EB5] text-sm text-white">
                                <svg
                                    width="15"
                                    height="14"
                                    viewBox="0 0 15 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6.56978 13.6751C7.03263 14.1083 7.75205 14.1083 8.21489 13.6751L9.61461 12.3651L11.5307 12.3017C12.1643 12.2807 12.673 11.772 12.694 11.1384L12.7574 9.22228L14.0675 7.82259C14.5006 7.35975 14.5006 6.64027 14.0675 6.17743L12.7574 4.77771L12.694 2.86164C12.673 2.22805 12.1643 1.71928 11.5307 1.69834L9.61461 1.63496L8.21489 0.324923C7.75205 -0.108307 7.03263 -0.108307 6.56978 0.324923L5.17006 1.63496L3.25396 1.69834C2.62039 1.71928 2.11164 2.22805 2.09068 2.86164L2.02728 4.77771L0.717223 6.17743C0.284038 6.64027 0.284037 7.35975 0.717223 7.82259L2.02728 9.22228L2.09068 11.1384C2.11164 11.772 2.62038 12.2807 3.25396 12.3017L5.17006 12.3651L6.56978 13.6751ZM5.33538 10.8308C5.87061 11.0765 6.46572 11.2131 7.09113 11.2131C9.41798 11.2131 11.3043 9.32685 11.3043 7.00001C11.3043 4.67316 9.41798 2.78689 7.09113 2.78689C6.46572 2.78689 5.87061 2.92357 5.33538 3.1692C5.1216 3.2673 4.98457 3.48097 4.98457 3.71618C4.98457 3.95146 5.1216 4.16512 5.33538 4.26323C6.37273 4.73931 7.09113 5.78639 7.09113 7.00001C7.09113 8.21361 6.37273 9.26069 5.33538 9.7368C5.1216 9.83491 4.98457 10.0486 4.98457 10.2838C4.98457 10.519 5.1216 10.7327 5.33538 10.8308Z"
                                        fill="#EBEBEB"
                                    />
                                </svg>
                            </div>
                            <p className="dark:text-[#D9D9D9]">
                                {settings.mode === 'light'
                                    ? 'Karanlık Tema'
                                    : 'Aydınlık tema'}{' '}
                            </p>
                        </div>
                        <input
                            type={'checkbox'}
                            checked={settings.mode == 'light' ? false : true}
                            onChange={setPhoneTheme}
                        />
                    </div>
                    {/* <div className="flex items-center justify-between gap-2 py-2">
                        <div className="flex items-center gap-2">
                            <div className=" w-6 h-6 rounded-md flex items-center justify-center text-white text-sm">
                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.841677 15.253C1.48507 17.5375 2.79145 19.58 4.59562 21.122C6.39978 22.664 8.6207 23.6365 10.9775 23.9163C13.3343 24.1961 15.7212 23.7708 17.8363 22.6941C19.9514 21.6173 21.6997 19.9376 22.8601 17.8673L20.93 16.7854C19.9835 18.474 18.5576 19.844 16.8325 20.7222C15.1074 21.6004 13.1606 21.9473 11.2384 21.719C9.31615 21.4908 7.50475 20.6977 6.03326 19.44C4.56176 18.1823 3.49627 16.5165 2.97151 14.6532L0.841677 15.253Z" fill="#6029BB"/>
                                    <path d="M9.2865 0.408881C6.99399 1.02316 4.93512 2.30344 3.37025 4.08784C1.80537 5.87224 0.804776 8.08061 0.494988 10.4337C0.1852 12.7867 0.580135 15.1788 1.62985 17.3075C2.67957 19.4361 4.33692 21.2056 6.39233 22.3923L7.49867 20.4761C5.82226 19.5082 4.47051 18.0649 3.61435 16.3288C2.75819 14.5927 2.43608 12.6417 2.68874 10.7225C2.94141 8.8033 3.75751 7.00214 5.03383 5.54677C6.31016 4.09139 7.98939 3.04718 9.85918 2.54617L9.2865 0.408881Z" fill="#BB2966"/>
                                    <path d="M22.7846 18C23.9713 15.9446 24.5218 13.5835 24.3666 11.2152C24.2114 8.84687 23.3574 6.57779 21.9125 4.69486C20.4677 2.81194 18.497 1.39974 16.2496 0.63684C14.0022 -0.126057 11.579 -0.205383 9.28648 0.408891L9.85916 2.54618C11.729 2.04517 13.7053 2.10987 15.5383 2.7321C17.3714 3.35432 18.9787 4.50613 20.1571 6.04186C21.3355 7.57759 22.0321 9.42828 22.1587 11.3599C22.2853 13.2915 21.8362 15.2173 20.8684 16.8937L22.7846 18Z" fill="#292EBB"/>
                                    <path d="M0.841677 15.253C1.48507 17.5375 2.79145 19.58 4.59562 21.122C6.39978 22.664 8.6207 23.6365 10.9775 23.9163C13.3343 24.1961 15.7212 23.7708 17.8363 22.6941C19.9514 21.6173 21.6997 19.9376 22.8601 17.8673L20.93 16.7854C19.9835 18.474 18.5576 19.844 16.8325 20.7222C15.1074 21.6004 13.1606 21.9473 11.2384 21.719C9.31615 21.4908 7.50475 20.6977 6.03326 19.44C4.56176 18.1823 3.49627 16.5165 2.97151 14.6532L0.841677 15.253Z" fill="#6029BB"/>
                                    <path d="M9.2865 0.408881C6.99399 1.02316 4.93512 2.30344 3.37025 4.08784C1.80537 5.87224 0.804776 8.08061 0.494988 10.4337C0.1852 12.7867 0.580135 15.1788 1.62985 17.3075C2.67957 19.4361 4.33692 21.2056 6.39233 22.3923L7.49867 20.4761C5.82226 19.5082 4.47051 18.0649 3.61435 16.3288C2.75819 14.5927 2.43608 12.6417 2.68874 10.7225C2.94141 8.8033 3.75751 7.00214 5.03383 5.54677C6.31016 4.09139 7.98939 3.04718 9.85918 2.54617L9.2865 0.408881Z" fill="#17B413"/>
                                    <path d="M22.7846 18C23.9713 15.9446 24.5218 13.5835 24.3666 11.2152C24.2114 8.84687 23.3574 6.57779 21.9125 4.69486C20.4677 2.81194 18.497 1.39974 16.2496 0.63684C14.0022 -0.126057 11.579 -0.205383 9.28648 0.408891L9.85916 2.54618C11.729 2.04517 13.7053 2.10987 15.5383 2.7321C17.3714 3.35432 18.9787 4.50613 20.1571 6.04186C21.3355 7.57759 22.0321 9.42828 22.1587 11.3599C22.2853 13.2915 21.8362 15.2173 20.8684 16.8937L22.7846 18Z" fill="#292EBB"/>
                                </svg>

                            </div>
                            <p className="dark:text-[#D9D9D9]">Çerçeve Rengi</p>
                        </div>
                        
                    </div> */}
                    <div className="flex items-center justify-between gap-2 py-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#282EBB] text-sm text-white">
                                <svg
                                    width="13"
                                    height="12"
                                    viewBox="0 0 13 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.3923 10.6667V1.33333C12.3923 0.596667 11.7957 0 11.059 0H1.72567C0.989001 0 0.392334 0.596667 0.392334 1.33333V10.6667C0.392334 11.4033 0.989001 12 1.72567 12H11.059C11.7957 12 12.3923 11.4033 12.3923 10.6667ZM4.059 7L5.72567 9.00333L8.059 6L11.059 10H1.72567L4.059 7Z"
                                        fill="#EBEBEB"
                                    />
                                </svg>
                            </div>
                            <p className="dark:text-[#D9D9D9]">Arkaplan</p>
                        </div>

                        <FaAngleRight className="cursor-pointer dark:text-[#D9D9D9]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
