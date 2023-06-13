import React, { useState, useEffect } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaCar, FaChevronDown } from 'react-icons/fa'
import { fetchNui } from '../utils/fetchNui'
import { TbGasStation } from 'react-icons/tb'
import { BsPalette } from 'react-icons/bs'
import { motion } from 'framer-motion'
import ValetAppIcon from '../resources/apps/valet.png'
import PageAnimation from "../components/PageAnimation";

function Valet() {
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        const getVehicles = () => fetchNui("getVehicles").then(setVehicles)

        getVehicles()

    }, [])


    return (
        <div>
            <div className='page bg-[#f3f1f8] dark:bg-black'>
                <PageAnimation image={ValetAppIcon} name="Valet" bgcolor="bg-pink-700">
                    <motion.div initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }} transition={{ type: "tween" }} className='px-4 py-4 w-full h-full relative overflow-hidden'>
                        <p className='text-xl dark:text-white'>Vale</p>

                        <div className='flex flex-col gap-3 h-[90%] pt-4 overflow-y-auto'>
                            {vehicles?.map((value, key) =>
                                <VehicleContainer value={value} />
                            )}
                        </div>
                    </motion.div>
                </PageAnimation>
            </div>
        </div>
    )
}

function VehicleContainer({ value }) {
    const [open, setOpen] = useState(false)
    return (
        <div className='flex bg-[#fff] dark:bg-[#1C1C1E] rounded-xl text-black shadow cursor-pointer dark:text-white'>
            <div className='w-full h-full relative px-4 py-3'>
                <div onClick={() => setOpen(!open)} className='w-full flex items-center justify-between'>
                    <div className='flex justify-start items-center gap-2'>
                        <FaCar className='text-[#ad5389] text-3xl' />
                        <p className='ml-1'>{value.name}</p>
                        {!value.stored &&
                            <p className='bg-[#f3f1f8] shadow text-[#ad5389] text-[.70rem] px-2 py-[.15rem] rounded-lg'>Dışarıda</p>
                        }
                    </div>

                    <FaChevronDown className={`${open ? "rotate-180" : "rotate-0"} transition-all text-xs`} />
                </div>


                {open &&
                    <div className=''>
                        <div className='flex flex-wrap flex-1 my-2 justify-between'>
                            <div className='flex items-center gap-1 my-0.5'>
                                <div className='flex items-center gap-1'>
                                    <AiOutlineHeart className='text-[#ad5389] text-[.80rem]' />
                                    <p className='text-[.70rem]'>Motor: </p>
                                </div>
                                <p className='text-[.70rem] font-semibold'>{(parseInt(value.mods.engineHealth) / 10).toFixed(2)}%</p>
                            </div>

                            <div className='flex items-center gap-1 my-0.5'>
                                <div className='flex items-center gap-1'>
                                    <AiOutlineHeart className='text-[#ad5389] text-[.80rem]' />
                                    <p className='text-[.70rem]'>Sağlamlık Durumu: </p>
                                </div>
                                <p className='text-[.70rem] font-semibold'>{(parseInt(value.mods.bodyHealth) / 10).toFixed(2)}%</p>
                            </div>

                            <div className='flex items-center gap-1 my-0.5'>
                                <div className='flex items-center gap-1'>
                                    <TbGasStation className='text-[#ad5389] text-[.80rem]' />
                                    <p className='text-[.70rem]'>Yakıt: </p>
                                </div>
                                <p className='text-[.70rem] font-semibold'>{parseInt(value.mods.fuelLevel).toFixed(2)}%</p>
                            </div>

                            <div className='flex items-center gap-1 my-0.5'>
                                <div className='flex items-center gap-1'>
                                    <BsPalette className='text-[#ad5389] text-[.80rem]' />
                                    <p className='text-[.70rem]'>Renk: </p>
                                </div>
                                <p className='text-[.70rem] font-semibold'>{value.colors.first}</p>
                            </div>
                        </div>
                        {value.stored &&
                            <p onClick={() => fetchNui("spawnVehicle", { vehicle: value, plate: value.plate })} className='px-4 bg-[#ad5389]/80 hover:bg-[#ad5389]/90 transition-all text-black dark:text-white font-semibold rounded-full text-xs py-1 shadow  cursor-pointer text-center uppercase'>Al</p>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Valet