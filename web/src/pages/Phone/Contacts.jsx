import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { usePhone } from '../Rehber';

function Contacts() {
    const sliderArray = [1, 2, 3, 4, 5];
    const { paginate, setData } = usePhone();

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    useNuiEvent('setContacts', setContacts);

    useEffect(() => {
        const getData = () => fetchNui('getContacts').then(setContacts);
        getData();
    }, []);

    const redirect = contact => {
        setData(contact);
        paginate('contactdetails');
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
        <div className="page bg-white px-4 dark:bg-[#0D0D0D]">
            <div className="flex items-center justify-between">
                <p className="inter font-semibold dark:text-[#DADADA]">
                    Kişiler
                </p>
                <div
                    onClick={() => paginate('newcontact')}
                    className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-[#DADADA] dark:border-[#323232]"
                >
                    <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.66667 0H3.33333V3.33333H0V4.66667H3.33333V8H4.66667V4.66667H8V3.33333H4.66667V0Z"
                            fill="#606060"
                        />
                    </svg>
                </div>
            </div>

            <div className="mt-3 flex h-[37px] w-full  items-center gap-2 rounded-[10px] border border-gray-200 bg-[#FBFBFB] px-3 dark:border-white/10 dark:bg-[#111111]">
                <FaSearch className="dark:text-white/70" />
                <input
                    className="inter flex-1 bg-transparent text-sm outline-none dark:text-white"
                    placeholder="Ara"
                />
            </div>

            <div className="mt-3 flex items-center gap-2">
                {contacts
                    .filter(x => x.fast == true)
                    .map(x => (
                        <div
                            onClick={() => redirect(x)}
                            className="cursor-pointer rounded-10"
                        >
                            <img
                                className="mb-0.5 h-[45px] w-[45px] !rounded-xl"
                                src="https://kagan.app/images/phone/user.png"
                            />
                            <p className="inter  text-center text-xs text-[#5E5D5D] ">
                                {x.name}
                            </p>
                        </div>
                    ))}
            </div>

            <div className="mt-2 h-[1px] w-full bg-[#C2C2C2]/60  dark:bg-[#C2C2C2]/10" />

            <div className="mt-1 divide-y dark:divide-[#C2C2C2]/10">
                {contacts.map(x => (
                    <div
                        onClick={() => redirect(x)}
                        className="flex cursor-pointer items-center py-1.5"
                    >
                        <img
                            className="mr-2 h-10 w-10 rounded-10"
                            src="https://kagan.app/images/phone/user.png"
                        />
                        <div>
                            <p className="inter text-sm font-medium text-[#5E5D5D] dark:text-[#DADADA]">
                                {x.name} {x.surname}
                            </p>
                            <p className="inter text-xs text-[#5E5D5D] dark:text-[#ABABAB]">
                                {x.number}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Contacts;
