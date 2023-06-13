import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';

const Gallery = ({ setPage, onSelect }) => {
    const [photos, setPhotos] = useState([]);

    useNuiEvent('setPhotos', setPhotos);

    useEffect(() => {
        const getPhotos = () => fetchNui('getPhotos').then(setPhotos);

        getPhotos();
    }, []);

    return (
        <div className="page z-[101] !rounded-t-xl bg-[#fff] dark:bg-black">
            <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                transition={{ type: 'tween' }}
                className="relative h-full w-full"
            >
                <FaChevronLeft
                    className="mx-4 my-4 text-sm dark:text-white"
                    onClick={() => setPage()}
                />
                <div className="px-4 py-8">
                    <div className="grid h-[97%] grid-cols-3 items-center overflow-y-auto">
                        {photos.map(value => (
                            <div
                                onClick={() => {
                                    fetchNui('updatePhoto', value.url);
                                    setPage();
                                }}
                                className="h-[5.5rem] w-[5.5rem] cursor-pointer border-2 border-b-0 border-black"
                            >
                                <img
                                    className="h-full w-full object-cover"
                                    src={value.url}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Gallery;
