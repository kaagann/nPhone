import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaChevronLeft, FaComment, FaPhone } from 'react-icons/fa';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import { REDIRECT_PATH } from '../utils/router';
import { useNavigate } from 'react-router-dom';
import AdsAppIcon from '../resources/apps/yellowpages.png';
import PageAnimation from '../components/PageAnimation';
import { attemptCall } from '../utils/misc';
import { useSettings } from '../contexts/SettingsContext';

function Yellowpages() {
    const navigate = useNavigate();

    const [ads, setAds] = useState([]);
    const [currentPage, setCurrentPage] = useState('');
    const [details, setDetails] = useState({
        url: '',
        content: '',
        category: ''
    });

    useNuiEvent('setAds', data => {
        setAds(data);
    });

    const { setCache, cache } = useSettings();

    useEffect(() => {
        const getData = () => fetchNui('getAds').then(setAds);
        getData();
    }, []);

    const [activeType, setActiveType] = useState('event');
    const [types, setTypes] = useState(['Etkinlik', 'Kiralık', 'Satlık']);

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
    }, [currentPage]);

    return (
        <div>
            <PageAnimation
                image={AdsAppIcon}
                name="Yellow Pages"
                bgcolor="bg-yellow-300"
            >
                {currentPage != '' && (
                    <NewPost
                        details={details}
                        setDetails={setDetails}
                        types={types}
                        setCurrentPage={setCurrentPage}
                    />
                )}
                {currentPage == 'gallery' && (
                    <Gallery
                        setDetails={setDetails}
                        setCurrentPage={setCurrentPage}
                    />
                )}
                {currentPage == '' && (
                    <div className="page bg-[#ffc828]">
                        <motion.div
                            initial={{ x: -500 }}
                            animate={{ x: 0 }}
                            exit={{ x: -500 }}
                            transition={{ type: 'tween' }}
                            className="h-full w-full py-4 px-4"
                        >
                            <div className="flex items-start justify-between">
                                <p className="text-xl">Sarı Sayfalar</p>
                                <FaPlus
                                    onClick={() => setCurrentPage('newpost')}
                                    className="text-md my-2"
                                />
                            </div>

                            <div className="relative h-[81%] overflow-y-auto">
                                <div className="flex flex-col gap-2">
                                    {ads.map(ad => (
                                        <div className="w-full rounded-xl bg-[#ffd868]">
                                            <div className="relative h-full w-full">
                                                <div className="flex items-center justify-between px-2 pt-2">
                                                    <p className="text-xs">
                                                        {ad.name}
                                                    </p>
                                                    <div></div>
                                                    <div className="flex gap-1">
                                                        <FaPhone
                                                            onClick={() =>
                                                                attemptCall(
                                                                    ad.number
                                                                )
                                                            }
                                                            className="text-xs"
                                                        />
                                                        <FaComment
                                                            onClick={() => {
                                                                setCache({
                                                                    ...cache,
                                                                    number: ad.number
                                                                });
                                                                navigate(
                                                                    REDIRECT_PATH.MESSAGES
                                                                );
                                                            }}
                                                            className="text-xs"
                                                        />
                                                    </div>
                                                </div>
                                                {ad.url && (
                                                    <img
                                                        className="mt-1 h-full w-full"
                                                        src={ad.url}
                                                    />
                                                )}
                                                <div className="break-all py-2 px-2">
                                                    <p className="inter text-sm">
                                                        {ad.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </PageAnimation>
        </div>
    );
}

const NewPost = ({ details, setDetails, types, setCurrentPage }) => {
    const [selectedType, setType] = useState('event');

    useEffect(() => {
        var inputs, index;
        inputs = document.getElementsByTagName('textarea');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].addEventListener('focusin', () => {
                fetchNui('inputFocus', true);
            });

            inputs[index].addEventListener('focusout', () => {
                fetchNui('inputFocus', false);
            });
        }
    }, []);

    useEffect(() => {
        var inputs, index;
        inputs = document.getElementsByTagName('input');
        console.log('sa');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].addEventListener('focusin', () => {
                fetchNui('inputFocus', true);
            });

            inputs[index].addEventListener('focusout', () => {
                fetchNui('inputFocus', false);
            });
        }
    }, []);

    return (
        <div className="page bg-[#ffc828]">
            <motion.div
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                transition={{ type: 'tween' }}
                className="relative h-full w-full"
            >
                <div className="grid grid-cols-4 items-center justify-between gap-8 p-4 py-2">
                    <div className="cursor-pointer text-black">
                        <FaChevronLeft
                            onClick={() => setCurrentPage('')}
                            className="text-sm"
                        />
                    </div>

                    <div className="col-span-2 flex flex-1 cursor-pointer items-center justify-center text-[18px]">
                        <p>Yeni İlan</p>
                    </div>

                    <div className="flex flex-1 cursor-pointer items-end justify-center text-black">
                        <p
                            onClick={() => {
                                fetchNui('sendAds', {
                                    ...details,
                                    selectedType
                                });
                                setDetails({
                                    ...details,
                                    url: '',
                                    content: '',
                                    category: ''
                                });
                                setCurrentPage('');
                            }}
                        >
                            Paylaş
                        </p>
                    </div>
                </div>

                <div className="mt-4 px-4">
                    <div className="relative flex h-8 items-center justify-center gap-1">
                        <input
                            value={details.url}
                            onChange={e =>
                                setDetails({ ...details, url: e.target.value })
                            }
                            placeholder="URL"
                            className="w-full rounded-md border-none bg-[#F3F2F7] p-1 px-2 outline-none"
                        />
                        <div className="flex h-full items-center justify-center rounded-md bg-[#F3F2F7] px-2 text-black">
                            <FaPlus
                                onClick={() => setCurrentPage('gallery')}
                                className="text-sm"
                            />
                        </div>
                    </div>
                    <textarea
                        value={details.content}
                        onChange={e =>
                            setDetails({ ...details, content: e.target.value })
                        }
                        placeholder="İlanın hakkında detaylar yaz!"
                        className="ring-none mt-2 h-[220px] w-full resize-none rounded-md !border-none bg-[#F3F2F7] p-1 px-2 !outline-none"
                    />
                </div>
            </motion.div>
        </div>
    );
};

const Gallery = ({ setDetails, setCurrentPage }) => {
    const [photos, setPhotos] = useState([]);
    useNuiEvent('setPhotos', setPhotos);

    useEffect(() => {
        const getPhotos = () => fetchNui('getPhotos').then(setPhotos);

        getPhotos();
    }, []);

    return (
        <div className="page bg-[#fff] dark:bg-black">
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
                                        setDetails(x => {
                                            return { ...x, url: value.url };
                                        });
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

export default Yellowpages;
