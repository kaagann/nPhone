import React, { useEffect, useState } from 'react'
import { fetchNui } from '../../utils/fetchNui'
import { attemptCall } from '../../utils/misc'
import { usePhone } from '../Rehber'

function Recents() {
    const sliderArray = [1,2,3,4,5]
    const {paginate} = usePhone()
    const [recents, setRecents] = useState([])


    useEffect(() => {
        const getRecents = () => fetchNui("getCallHistory").then(setRecents)

        getRecents()
    }, [])

    return (
        <div className='page bg-white dark:bg-[#0D0D0D] px-4'>

            <div className='flex items-center justify-between'>
                <p className='font-semibold inter dark:text-[#DADADA]'>Son Aramalar</p>
            </div>

            <div className='w-full mt-2 bg-[#C2C2C2]/60 dark:bg-[#C2C2C2]/10 h-[1px]' />

            <div className='mt-1 divide-y '>
                {recents.reverse().map(x =>
                    <div onClick={() => attemptCall(x.number)} className='flex items-center py-1.5 cursor-pointer'>
                        <img className='w-10 h-10 rounded-10 mr-2' src="https://kagan.app/images/phone/user.png" />
                        <div>
                            <p className='inter text-[#5E5D5D] dark:text-[#DADADA] text-sm font-medium'>{x.name}</p>
                            <p className='inter text-[#5E5D5D] dark:text-[#ABABAB] text-xs'>{x.type}</p>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Recents