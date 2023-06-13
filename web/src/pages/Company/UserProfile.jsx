import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchNui } from '../../utils/fetchNui';
import { useCompany } from '../Company';

function UserProfile() {
    const { paginate, cache } = useCompany();
    return (
        <div className="page bg-[#EBEBEB] px-2 pt-8">
            <FaChevronLeft onClick={e => paginate('employes')} />

            <div className="mt-5">
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="h-20 w-20 rounded-full"
                        src={cache.user.avatar}
                    />
                    <p className="mt-2 text-xl">{cache.user.name}</p>
                </div>

                <div className="mt-5 divide-y rounded-md bg-white ">
                    <p
                        onClick={e => paginate('changegrade')}
                        className="cursor-pointer p-2 px-4"
                    >
                        Rütbesini Düzenle
                    </p>
                    <p
                        onClick={e =>
                            fetchNui('fireEmploye', cache.user.empSource)
                        }
                        className="cursor-pointer p-2 px-4 text-red-500"
                    >
                        İşten Çıkar
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
