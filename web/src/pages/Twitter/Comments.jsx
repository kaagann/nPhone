import React from 'react';
import { FaChevronLeft, FaRegCommentDots, FaRetweet } from 'react-icons/fa';
import { RiHeartsFill } from 'react-icons/ri';
import { fetchNui } from '../../utils/fetchNui';
import { useTwitterPage } from '../Twitter';
import { TiMessages } from 'react-icons/ti';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { useNuiEvent } from '../../hooks/useNuiEvent';

function Comments() {
    const { paginate, activePageId } = useTwitterPage();
    const [data, setData] = useState({});
    const { settings } = useSettings();
    useEffect(() => {
        const get = () => fetchNui('getTweetById', activePageId).then(setData);

        get();
    }, []);

    useNuiEvent('updateComments', x => {
        if (data.id == x.id) {
            setData(x);
        }
    });

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

    const [inpt, setInpt] = useState('');
    return (
        <div class="absolute top-0 left-0 z-10 flex h-full w-full flex-col  overflow-y-auto bg-[#F7F7F7] px-4 pt-10 dark:bg-[#0D0D0D]">
            <div className="h-[90%] overflow-y-auto">
                <div className="flex items-center gap-2">
                    <FaChevronLeft onClick={e => paginate('home')} />
                    <div className="h-12 w-12 rounded-full border border-black p-0.5">
                        <img
                            className="h-full w-full rounded-full"
                            src={data.photo}
                        />
                    </div>
                    <div>
                        <p className="font-medium capitalize leading-4 text-[#373737]">
                            {data.fullname}
                        </p>
                        <p className="text-xs font-medium  lowercase leading-4 text-[#8A8A8A]">
                            @{data.fullname}
                        </p>
                    </div>
                </div>

                <div className="mt-1">
                    <p className="text-xs  text-[#444444]">{data.content}</p>

                    {data.url && (
                        <img className="mt-3 rounded" src={data.url} />
                    )}
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <div
                        onClick={e => fetchNui('changeLike', { id: data.id })}
                        className={`flex cursor-pointer items-center gap-1  ${
                            data.likes?.src[settings.citizenid]
                                ? ' text-red-500'
                                : ' text-[#74869A] '
                        }`}
                    >
                        <RiHeartsFill className="" />
                        <p className="text-sm">
                            {data.likes?.src[settings.citizenid]?.likes ?? 0}
                        </p>
                    </div>
                </div>
                {data.comments?.map(val => (
                    <div className="mt-2 border-t border-[#CACACA] py-3">
                        <div className="flex items-center gap-2">
                            <div className="h-12 w-12 rounded-full border border-black p-0.5">
                                <img
                                    className="h-full w-full rounded-full"
                                    src={val.photo}
                                />
                            </div>
                            <div>
                                <p className="font-medium capitalize leading-4 text-[#373737]">
                                    {val.fullname}
                                </p>
                                <p className="text-xs font-medium  lowercase leading-4 text-[#8A8A8A]">
                                    @{val.fullname}
                                </p>
                            </div>
                        </div>
                        <p className="mt-2 text-xs  text-[#444444]">
                            {val.content}
                        </p>

                        <div className="mt-2 flex items-center gap-4">
                            <div
                                onClick={e => fetchNui('changeLike', { id: 1 })}
                                className={`flex cursor-pointer items-center gap-1 text-[#74869A] ${
                                    val.likes.src[settings.citizenid]
                                        ? ' text-red-500'
                                        : ' text-[#74869A] '
                                }`}
                            >
                                <RiHeartsFill className="" />
                                <p className="text-sm">1</p>
                            </div>
                            <div className="flex cursor-pointer items-center gap-1 text-[#74869A] hover:text-black ">
                                <FaRetweet className="" />
                                <p className="text-sm">4</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex h-[10%] items-center  ">
                <input
                    className="w-full bg-transparent px-2 outline-none"
                    placeholder="Yanıtını Tweetle"
                    value={inpt}
                    onChange={e => setInpt(e.target.value)}
                    onKeyDown={e => {
                        if (
                            e.key.toLocaleLowerCase() ==
                            'enter'.toLocaleLowerCase()
                        ) {
                            fetchNui('sendComment', {
                                id: data.id,
                                comment: inpt
                            });
                            setInpt('');
                        }
                    }}
                />
                <div className="cursor-pointer">
                    <TiMessages />
                </div>
            </div>
        </div>
    );
}

export default Comments;
