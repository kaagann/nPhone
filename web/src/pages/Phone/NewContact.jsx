import React from 'react';
import { useEffect, useState } from 'react';
import { usePhone } from '../Rehber';
import { FaCamera, FaCarSide, FaChevronLeft } from 'react-icons/fa';
import { fetchNui } from '../../utils/fetchNui';
import { useSettings } from '../../contexts/SettingsContext';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { motion } from 'framer-motion';

function NewContact() {
    const { paginate, setNavigation } = usePhone();
    const { cache, setCache } = useSettings();
    const [values, set] = useState({
        picture:
            cache?.contact?.pictrue ??
            'https://kagan.app/images/phone/user.png',
        name: cache?.contact?.name ?? '',
        surname: cache?.contact?.surname ?? '',
        number: cache?.contact?.number ?? '',
        iban: cache?.contact?.iban ?? '',
        job: cache?.contact?.job ?? '',
        favorite: false,
        not: cache?.contact?.not ?? '',
        fast: false
    });

    const [gallery, setGallery] = useState(false);

    const submit = () => {
        if (cache?.contact) setCache({ ...cache, contact: null });
        fetchNui('addContact', values).then(() => paginate('contacts'));
    };

    useEffect(() => {
        setNavigation(false);
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
        <div className="page flex flex-col gap-4 bg-[#F7F7F7] p-4 dark:bg-[#0D0D0D]">
            {gallery && (
                <Gallery
                    setCurrentPage={e => setGallery(false)}
                    setURL={image => set({ ...values, picture: image })}
                />
            )}
            <div className="mt-4 flex items-center justify-between">
                <h1
                    onClick={() => paginate('contacts')}
                    className="text-sm font-semibold text-red-400"
                >
                    Vazgeç
                </h1>
                <h1 onClick={submit} className="text-sm font-semibold">
                    Bitti
                </h1>
            </div>
            <div className="z-10 flex items-center justify-center">
                <div className="group relative flex h-24 w-24">
                    <div
                        onClick={e => setGallery(true)}
                        className="absolute top-0 left-0 hidden h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/50 text-white group-hover:flex"
                    >
                        <FaCamera />
                    </div>
                    <img
                        className="h-full w-full rounded-full"
                        src={values.picture}
                    />
                </div>
            </div>

            <div className="shadow-xs divide-y rounded bg-white">
                <input
                    value={values.name}
                    onChange={e => set({ ...values, name: e.target.value })}
                    type="text"
                    placeholder="Ad"
                    className="w-full p-2 text-sm font-medium outline-none "
                />
                <input
                    value={values.surname}
                    onChange={e => set({ ...values, surname: e.target.value })}
                    type="text"
                    placeholder="Soyad"
                    className="w-full p-2 text-sm font-medium outline-none "
                />
            </div>
            <div className="shadow-xs divide-y rounded bg-white">
                <input
                    value={values.number}
                    onChange={e => set({ ...values, number: e.target.value })}
                    type="text"
                    placeholder="Telefon Numarası"
                    className="w-full p-2 text-sm font-medium outline-none "
                />
                <input
                    value={values.iban}
                    onChange={e => set({ ...values, iban: e.target.value })}
                    type="text"
                    placeholder="IBAN"
                    className="w-full p-2 text-sm font-medium outline-none "
                />
                <input
                    value={values.job}
                    onChange={e => set({ ...values, job: e.target.value })}
                    type="text"
                    placeholder="Meslek"
                    className="w-full p-2 text-sm font-medium outline-none "
                />
                <input
                    value={values.not}
                    onChange={e => set({ ...values, not: e.target.value })}
                    type="text"
                    placeholder="Not"
                    className="w-full p-2 text-sm font-medium outline-none "
                />
            </div>
        </div>
    );
}

const Gallery = ({ setURL, setCurrentPage }) => {
    const [photos, setPhotos] = useState([]);
    useNuiEvent('setPhotos', setPhotos);

    useEffect(() => {
        const getPhotos = () => fetchNui('getPhotos').then(setPhotos);

        getPhotos();
    }, []);

    return (
        <div className="page z-50 bg-[#fff] dark:bg-black">
            <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                transition={{ type: 'tween' }}
                className="relative h-full w-full pt-8"
            >
                <FaChevronLeft
                    onClick={() => setCurrentPage('newpost')}
                    className="ml-1 cursor-pointer dark:text-white"
                />
                <div className="h-[95%] overflow-y-auto">
                    <div className="px-2 py-4">
                        <div className="grid grid-cols-3 items-center">
                            {photos.map(value => (
                                <div
                                    onClick={() => {
                                        setURL(value.url);
                                        setCurrentPage('newpost');
                                    }}
                                    className="h-[5.5rem] w-[5.5rem] cursor-pointer border-2 border-b-0 border-black dark:border-[#1C1C1E]"
                                >
                                    <img
                                        className="h-full w-full object-cover"
                                        src={value.url}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default NewContact;
