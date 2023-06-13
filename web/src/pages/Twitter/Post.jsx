import React, { useEffect, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { BiImages } from 'react-icons/bi';
import { GiphyFetch } from '@giphy/js-fetch-api';
import GifModal from '../../components/Gif';
import { Gif } from '@giphy/react-components';
import { useTwitterPage } from '../Twitter';
import { fetchNui } from '../../utils/fetchNui';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Post() {
    const [postDetails, setPost] = useState({
        gif: '',
        content: '',
        photo: ''
    });
    const [openGif, setOpenGif] = useState(false);
    const [galleryD, setGallery] = useState(false);
    const { paginate } = useTwitterPage();

    const send = () => {
        fetchNui('sendTweet', postDetails);
        paginate('home');
    };

    useEffect(() => {
        var inputs, index;
        inputs = document.getElementsByTagName('textarea');
        console.log('sa');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].addEventListener('focusin', () => {
                fetchNui('inputFocus', true);
            });

            inputs[index].addEventListener('focusout', () => {
                console.log('input');
                fetchNui('inputFocus', false);
            });
        }
    }, []);

    return (
        <div class="absolute top-0 left-0 z-10 flex h-full w-full flex-col gap-4 overflow-y-auto bg-[#F7F7F7] px-4 pt-10 dark:bg-[#0D0D0D]">
            {openGif && (
                <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/60">
                    <div className="max-h-[15rem] overflow-y-auto bg-white p-2">
                        <GifModal
                            onClick={e => {
                                console.log(e.embed_url);
                                setPost({ ...postDetails, gif: e });
                                setOpenGif(false);
                            }}
                        />
                    </div>
                </div>
            )}
            {galleryD && (
                <Gallery
                    setURL={url => setPost({ ...postDetails, photo: url })}
                    setCurrentPage={e => setGallery(false)}
                />
            )}
            <div className="flex items-center justify-between">
                <svg
                    onClick={e => paginate('home')}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.5851 8.99807L17.6674 1.92695C17.8791 1.71527 17.998 1.42816 17.998 1.12878C17.998 0.829411 17.8791 0.542301 17.6674 0.330613C17.4557 0.118925 17.1686 0 16.8693 0C16.5699 0 16.2828 0.118925 16.0711 0.330613L8.99998 7.41297L1.92887 0.330613C1.71718 0.118925 1.43007 2.65796e-07 1.1307 2.68026e-07C0.83133 2.70257e-07 0.544219 0.118925 0.332531 0.330613C0.120844 0.542301 0.0019188 0.829411 0.0019188 1.12878C0.0019188 1.42816 0.120844 1.71527 0.332531 1.92695L7.41489 8.99807L0.332531 16.0692C0.227164 16.1737 0.143531 16.298 0.0864577 16.435C0.0293844 16.572 0 16.7189 0 16.8673C0 17.0158 0.0293844 17.1627 0.0864577 17.2997C0.143531 17.4367 0.227164 17.561 0.332531 17.6655C0.437039 17.7709 0.561375 17.8545 0.698367 17.9116C0.835359 17.9687 0.982296 17.9981 1.1307 17.9981C1.27911 17.9981 1.42604 17.9687 1.56304 17.9116C1.70003 17.8545 1.82436 17.7709 1.92887 17.6655L8.99998 10.5832L16.0711 17.6655C16.1756 17.7709 16.2999 17.8545 16.4369 17.9116C16.5739 17.9687 16.7209 17.9981 16.8693 17.9981C17.0177 17.9981 17.1646 17.9687 17.3016 17.9116C17.4386 17.8545 17.5629 17.7709 17.6674 17.6655C17.7728 17.561 17.8564 17.4367 17.9135 17.2997C17.9706 17.1627 18 17.0158 18 16.8673C18 16.7189 17.9706 16.572 17.9135 16.435C17.8564 16.298 17.7728 16.1737 17.6674 16.0692L10.5851 8.99807Z"
                        fill="#2891D5"
                    />
                </svg>

                <div
                    onClick={send}
                    className="cursor-pointer rounded-xl bg-[#2891D5] p-1 px-4 text-sm text-white hover:bg-[#1e98e9]"
                >
                    Gönder
                </div>
            </div>

            <div className="rounded-10 border border-[#DEDEDE] bg-white p-1">
                <textarea
                    placeholder="Neler Oluyor ?"
                    value={postDetails.content}
                    onChange={e =>
                        setPost({ ...postDetails, content: e.target.value })
                    }
                    className="min-h-[13rem] w-full resize-none p-4 outline-none"
                />

                {postDetails.gif && <Gif noLink={true} gif={postDetails.gif} />}
                {postDetails.photo && <img src={postDetails.photo} />}

                <div className="flex items-center gap-3 p-4 text-lg text-[#2891D5]">
                    <BiImages
                        onClick={e => setGallery(true)}
                        className="cursor-pointer"
                    />
                    <AiOutlineGif
                        onClick={e => setOpenGif(true)}
                        className="cursor-pointer"
                    />
                </div>
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

export default Post;
