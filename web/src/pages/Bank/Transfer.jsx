import { range } from 'lodash';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaAngleRight, FaSearch } from 'react-icons/fa';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { useBank } from '../Bank';

function Transfer() {
    const { paginate, setIban } = useBank();
    const [account, setAccount] = useState('');

    const changePage = iban => {
        if (iban) {
            setIban(iban);
        } else {
            setIban(account);
        }

        paginate('sendmoney');
    };

    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    useNuiEvent('setContacts', setContacts);

    useEffect(() => {
        const getData = () => fetchNui('getContacts').then(setContacts);
        getData();
    }, []);

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
        <div className="absolute top-0 left-0 flex h-full w-full flex-col gap-4 bg-[#EBEBEB] pt-8  dark:bg-[#0D0D0D]">
            <div className="px-4">
                <p className="inter font-semibold dark:text-[#DADADA]">
                    Para Transferi
                </p>

                <div className="mt-3 w-full cursor-pointer   gap-2 divide-y  rounded-[10px] border border-gray-200 bg-[#FBFBFB]  px-3 dark:border-white/10 dark:bg-[#111111]">
                    <div className="flex items-center justify-between py-2">
                        <input
                            placeholder="Iban"
                            onChange={e => setAccount(e.target.value)}
                            className="border-none bg-transparent text-sm outline-none dark:text-[#DADADA]"
                        ></input>
                        <FaAngleRight
                            onClick={e => changePage()}
                            className="dark:text-[#DADADA]"
                        />
                    </div>
                </div>

                <div className="mt-3 ">
                    <div className="flex items-center gap-2 border-b border-[#D4D4D4] px-2 py-1">
                        <FaSearch className="text-[#404040]" />
                        <input
                            type="text"
                            placeholder="Kullanıcı Ara"
                            className="border-none bg-transparent text-sm outline-none"
                        />
                    </div>
                    <div className="mt-2 h-[24rem] divide-y divide-[#D4D4D4] overflow-y-auto ">
                        {contacts
                            .filter(x => x.iban !== '')
                            .map(x => (
                                <div
                                    onClick={() => changePage(x.iban)}
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
                                            {x.iban}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transfer;
