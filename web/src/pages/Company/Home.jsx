import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaAngleRight, FaPlus } from 'react-icons/fa';
import { fetchNui } from '../../utils/fetchNui';
import { useCompany } from '../Company';
function Home() {
    const { paginate } = useCompany();

    const [companies, setCompanies] = useState([
        { name: 'testto' },
        { name: 'lspd' }
    ]);
    useEffect(() => {
        const get = () => fetchNui('getPlayerCompanies').then(setCompanies);

        get();
    }, []);
    return (
        <div className="page bg-[#EBEBEB] px-2 pt-8">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Şirketlerim</p>
                <FaPlus
                    onClick={() => paginate('createcompany')}
                    className="cursor-pointer text-sm"
                />
            </div>

            {companies.map(company => (
                <div className="mt-2 divide-y rounded-xl bg-white shadow-sm">
                    <div
                        onClick={e => paginate('profile')}
                        className="flex cursor-pointer items-center justify-between p-2 "
                    >
                        <div className="flex items-center gap-2">
                            <div>
                                <p className="text-sm font-medium capitalize">
                                    {company.name}
                                </p>
                                <p className="text-xs font-medium capitalize opacity-50">
                                    Patron
                                </p>
                            </div>
                        </div>
                        <FaAngleRight />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
