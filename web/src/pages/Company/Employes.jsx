import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaAngleRight, FaSearch } from 'react-icons/fa';
import { fetchNui } from '../../utils/fetchNui';
import { useCompany } from '../Company';

function Employes() {
    const { paginate, cache, setCache } = useCompany();
    const [users, setUsers] = useState([
        {
            name: 'Kagan Baba',
            grade: 'Patron',
            avatar: 'https://media.discordapp.net/attachments/1065317698185220139/1094336185113002134/image.png?width=1191&height=671'
        },
        {
            name: 'Cool',
            grade: 'Patron Yard',
            avatar: 'https://media.discordapp.net/attachments/1065317698185220139/1094336185113002134/image.png?width=1191&height=671'
        },
        {
            name: 'Emre',
            grade: 'Üst düzey yetkili',
            avatar: 'https://media.discordapp.net/attachments/1065317698185220139/1094336185113002134/image.png?width=1191&height=671'
        }
    ]);

    useEffect(() => {
        const get = () => fetchNui('getEmployeList').then(setUsers);

        get();
    }, []);
    const [input, setInput] = useState('');

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
        <div className="page overflow-y-auto bg-[#EBEBEB] px-2 pt-8">
            <h2 className="text-2xl font-semibold">Çalışanlarınız</h2>
            <p className="text-xs">İşetmenizdeki bütün çalışanlar aşağıdadır</p>

            <div className="mt-2 flex items-center gap-2 rounded-md bg-white p-1 px-2">
                <FaSearch className="text-sm" />
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Çalışan ara"
                    className="w-full outline-none"
                />
            </div>

            <div className="">
                {users
                    .filter(x =>
                        x.name
                            .toLocaleLowerCase()
                            .includes(input.toLocaleLowerCase())
                    )
                    .map(user => (
                        <div className="mt-2 divide-y rounded-md bg-white shadow-sm">
                            <div
                                onClick={e => {
                                    paginate('userProfile');
                                    setCache({ ...cache, user });
                                }}
                                className="flex cursor-pointer items-center justify-between p-2 "
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user.avatar}
                                    />
                                    <div>
                                        <p className="text-sm font-medium capitalize">
                                            {user.name}
                                        </p>
                                        <p className="text-xs font-medium capitalize opacity-50">
                                            {user.grade.name}
                                        </p>
                                    </div>
                                </div>
                                <FaAngleRight />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Employes;
