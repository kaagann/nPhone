import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useNuiEvent } from '../hooks/useNuiEvent'
import { fetchNui } from '../utils/fetchNui'
import { FaChevronLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { REDIRECT_PATH } from "../utils/router";
import PageAnimation from '../components/PageAnimation';
import GalleryAppIcon from '../resources/apps/gallery.png'


function Gallery() {
    const [clicked, setClicked] = useState({ clicked: false, id: 0, url: null })
    const [photos, setPhotos] = useState([])
    const navigate = useNavigate()

    useNuiEvent("setGalleryPage", () => {
        navigate(REDIRECT_PATH.GALLERY)
    })
    useNuiEvent("setPhotos", setPhotos)

    useEffect(() => {
        const getPhotos = () => fetchNui("getPhotos").then(setPhotos)

        getPhotos()
    }, [])

    return (
        <div>
            <div className='page bg-[#fff] dark:bg-black !pt-0'>
                <PageAnimation image={GalleryAppIcon} name="Gallery" bgcolor="bg-blue-700">
                    {clicked.clicked &&
                        <motion.div initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }} transition={{ type: "tween" }} className='absolute w-full h-full bg-[#F2F2F7] dark:bg-black z-[10] rounded-[1.5rem] flex flex-col'>
                            <div className='w-full bg-white dark:bg-[#1C1C1E] pt-6 rounded-t-[1.45rem] flex justify-between items-center py-1.5 px-2'>
                                <FaChevronLeft onClick={() => setClicked({ ...clicked, clicked: false })} className='text-blue-500 text-md cursor-pointer' />
                                <p onClick={() => {
                                    fetchNui("removePhoto", {
                                        id: clicked.id
                                    })

                                    setClicked({ ...clicked, clicked: false })
                                }} className='text-red-500 text-md cursor-pointer'>Sil</p>
                            </div>

                            <div className='flex-1 flex items-center'>
                                <img src={clicked.url} className='w-full px-2 h-[25%] object-cover' />
                            </div>
                        </motion.div>
                    }

                    {!clicked.clicked &&
                        <motion.div initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }} transition={{ type: "tween" }} className='w-full h-full relative pt-8'>
                            <div className='h-[95%] overflow-y-auto'>
                                <div className='px-2 py-4'>
                                    <div className='grid grid-cols-3 items-center'>
                                        {photos.map(value =>
                                            <div onClick={() => setClicked({ ...clicked, clicked: true, id: value.id, url: value.url })} className='w-[5.5rem] h-[5.5rem] border-2 border-black dark:border-[#1C1C1E] border-b-0 cursor-pointer'>
                                                <img className='w-full h-full object-cover' src={value.url} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    }
                </PageAnimation>
            </div>
        </div>
    )
}

export default Gallery