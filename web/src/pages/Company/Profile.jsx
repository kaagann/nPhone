import React from 'react';
import { useCompany } from '../Company';

function Profile() {
    const { paginate } = useCompany();
    return (
        <div className="page bg-[#EBEBEB] px-2 pt-8">
            <h2 className="text-2xl font-semibold">LSPD</h2>
            <p className="text-sm">İşletmenizi en kolay şekilde yönetin!</p>

            <div className="mt-5 flex flex-col gap-2">
                <div
                    onClick={e => paginate('employes')}
                    className="cursor-pointer rounded-lg bg-white py-2 px-3 text-sm shadow-sm transition-all"
                >
                    <p className="text-base font-medium">
                        Çalışanları Görüntüle
                    </p>
                    <p className="text-xs">
                        İşetmenizdeki bütün çalışanları görün
                    </p>
                </div>
                {/* <div className="cursor-pointer rounded-lg   bg-white py-2 px-3 text-sm shadow-sm transition-all">
                    <p className="text-base font-medium">Maaşları Ayarla</p>
                    <p className="text-xs">
                        Çalışanlarınızın maaşlarını ayarlayın
                    </p>
                </div> */}
            </div>
        </div>
    );
}

export default Profile;
