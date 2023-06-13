import React, { useEffect, useState } from 'react'
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { usePhone } from '../Rehber'

function Favorites() {
    const sliderArray = [1,2,3,4,5]
    const {paginate, setData} = usePhone()

    const [contacts, setContacts] = useState([]);
    useNuiEvent("setContacts", setContacts)

    useEffect(() => {
        const getData = () => fetchNui("getContacts").then(setContacts)

        getData()
    }, [])

    const redirect = (contact) => {
        setData(contact);
        paginate("contactdetails");
    }

    return (
        <div className='page bg-white dark:bg-[#0D0D0D] px-4'>

            <div className='flex items-center justify-between'>
                <p className='font-semibold inter dark:text-[#DADADA]'>Favoriler</p>
            </div>


            <div className='mt-1 divide-y '>
                {contacts.filter(x => x.favorite == true).map(x =>
                    <div onClick={() => redirect(x)} className='flex items-center py-1.5 cursor-pointer'>
                        <img className='w-10 h-10 rounded-10 mr-2' src="https://kagan.app/images/phone/user.png" />
                        <div>
                            <p className='inter text-[#5E5D5D] dark:text-[#DADADA] text-sm font-medium'>{x.name} {x.surname}</p>
                            <p className='inter text-[#5E5D5D] dark:text-[#ABABAB]  text-xs'>{x.number}</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Favorites