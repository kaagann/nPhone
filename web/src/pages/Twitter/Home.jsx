import { Gif } from '@giphy/react-components';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    FaHeart,
    FaPencilAlt,
    FaRegCommentDots,
    FaRetweet
} from 'react-icons/fa';
import { RiHeartsFill } from 'react-icons/ri';
import { useSettings } from '../../contexts/SettingsContext';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { useTwitterPage } from '../Twitter';

function Home() {
    const { settings } = useSettings();
    const [tweets, setTweets] = useState([]);
    const { paginate } = useTwitterPage();

    useNuiEvent('setTweet', data => {
        setTweets(data);
    });

    useEffect(() => {
        const getData = () => fetchNui('getTweets').then(setTweets);

        getData();
    }, []);

    return (
        <div class="absolute top-0 left-0 z-10 flex h-full w-full flex-col gap-4 bg-[#F7F7F7] px-4 pt-8 dark:bg-[#0D0D0D]">
            <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full border border-black p-0.5">
                    <img
                        className="h-full w-full rounded-full"
                        src={settings.photo}
                    />
                </div>
                <p className="text-lg font-medium capitalize text-[#444444]">
                    {settings.name}
                </p>
            </div>

            <div className="overflow-y-auto">
                <p className="mb-2 text-xs text-[#255CCF]">Bugünün Tweetleri</p>
                {tweets.map(tw => (
                    <Tweet data={tw} />
                ))}
            </div>

            <div
                onClick={e => paginate('post')}
                className="fixed bottom-5 right-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#20a3fa] text-white hover:bg-[#1c95e6]"
            >
                <FaPencilAlt />
            </div>
        </div>
    );
}

function Tweet({ data }) {
    const { settings, cache, setCache } = useSettings();
    const { paginate, setActivePage } = useTwitterPage();

    useEffect(() => {
        console.log(
            'data',
            data.likes.src,
            JSON.stringify(data.likes.src),
            data.likes.src[settings.citizenid],
            settings.citizenid
        );
    }, []);
    return (
        <div className="border-t border-[#CACACA] py-3">
            <div className="flex items-center gap-2">
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

            <div className="mt-3">
                <p className="text-xs text-[#444444]">{data.content}</p>
                {data.url && (
                    <img
                        onClick={e => setCache({ ...cache, picture: data.url })}
                        className="mt-3 rounded"
                        src={data.url}
                    />
                )}
                {data.gif && <Gif noLink={true} gif={data.gif} />}
            </div>

            <div className="mt-3 flex items-center gap-4">
                <div
                    onClick={e => fetchNui('changeLike', { id: data.id })}
                    className={`flex cursor-pointer items-center gap-1  ${
                        data.likes.src[settings.citizenid]
                            ? ' text-red-500'
                            : ' text-[#74869A] '
                    }`}
                >
                    <RiHeartsFill className="" />
                    <p className="text-sm">{data.likes.likes}</p>
                </div>
                {/* <div className="flex cursor-pointer items-center gap-1 text-[#74869A] hover:text-black ">
                    <FaRetweet className="" />
                    <p className="text-sm">4</p>
                </div> */}
                <div
                    onClick={e => {
                        setActivePage(data.id);
                        paginate('comments');
                    }}
                    className="flex cursor-pointer items-center gap-1 text-[#74869A] hover:text-blue-500 "
                >
                    <FaRegCommentDots />
                    <p className="text-sm">{data.comments?.lenght}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
