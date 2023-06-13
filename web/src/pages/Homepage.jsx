import React, { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import settingsIcon from '../resources/apps/settings.png';
import adsIcon from '../resources/apps/yellowpages.png';
import bankIcon from '../resources/apps/bank.png';
import valetIcon from '../resources/apps/valet.png';
import phoneIcon from '../resources/apps/contacts.png';
import messagesIcon from '../resources/apps/messages.png';
import cameraIcon from '../resources/apps/camera.png';
import twitterIcon from '../resources/apps/twitter.png';
import mapIcon from '../resources/apps/map.png';
import galleryIcon from '../resources/apps/gallery.png';
import { REDIRECT_PATH } from '../utils/router';
import { fetchNui } from '../utils/fetchNui';
import { useSettings } from '../contexts/SettingsContext';

function Homepage() {
    const { settings, setSettings } = useSettings();
    const HomeButtons = [
        {
            name: 'Phone',
            icon: phoneIcon,
            path: REDIRECT_PATH.REHBER,
            label: 'Rehber'
        },
        {
            name: 'Messages',
            icon: messagesIcon,
            path: REDIRECT_PATH.MESSAGES,
            label: 'Mesajlar'
        },
        {
            name: 'Camera',
            icon: cameraIcon,
            fetch: 'openCamera',
            label: 'Kamera'
        },
        {
            name: 'Settings',
            icon: settingsIcon,
            path: REDIRECT_PATH.SETTINGS,
            label: 'Ayarlar'
        },
        {
            name: 'Twitter',
            icon: twitterIcon,
            color: '#1da1f2',
            path: REDIRECT_PATH.TWITTER,
            label: 'Twitter'
        },
        {
            name: 'Yellowpages',
            icon: adsIcon,
            color: '#FF9F0A',
            path: REDIRECT_PATH.YELLOWPAGES,
            label: 'İlanlar'
        },
        {
            name: 'Bank',
            icon: bankIcon,
            color: '#BF5AF2',
            path: REDIRECT_PATH.BANK,
            label: 'Banka'
        },
        // {
        //   name: "Valet",
        //   icon: valetIcon,
        //   color: "#BF5AF2",
        //   path: REDIRECT_PATH.VALET,
        //   label: "Vale",
        // },
        {
            name: 'Map',
            icon: mapIcon,
            color: '#BF5AF2',
            path: REDIRECT_PATH.MAP,
            label: 'Harita'
        },

        {
            name: 'Gallery',
            icon: galleryIcon,
            color: '#BF5AF2',
            path: REDIRECT_PATH.GALLERY,
            label: 'Galeri'
        },
        {
            name: 'Jobcenter',
            icon: galleryIcon,
            color: '#BF5AF2',
            path: REDIRECT_PATH.JOB,
            label: 'İş Merkezi'
        },

        {
            name: 'sirketlerim',
            icon: galleryIcon,
            color: '#BF5AF2',
            path: REDIRECT_PATH.COMPANY,
            label: 'Şirketlerim'
        }
        // {
        //     name: 'taksi',
        //     icon: galleryIcon,
        //     color: '#BF5AF2',
        //     path: REDIRECT_PATH.CALCULATOR,
        //     label: 'Taksi'
        // }

        // {
        //     name: 'youtube',
        //     icon: galleryIcon,
        //     color: '#BF5AF2',
        //     path: REDIRECT_PATH.CALCULATOR,
        //     label: 'Youtube'
        // },

        // {
        //     name: 'News',
        //     icon: galleryIcon,
        //     color: '#BF5AF2',
        //     path: REDIRECT_PATH.CALCULATOR,
        //     label: 'Haberler'
        // },
        // {
        //     name: 'mail',
        //     icon: galleryIcon,
        //     color: '#BF5AF2',
        //     path: REDIRECT_PATH.CALCULATOR,
        //     label: 'Mail'
        // },

        // {
        //     name: 'borsa',
        //     icon: galleryIcon,
        //     color: '#BF5AF2',
        //     path: REDIRECT_PATH.CALCULATOR,
        //     label: 'Borsa'
        // },

        // {
        //     name: 'Files',
        //     icon: galleryIcon,
        //     color: '#BF5AF2',
        //     path: REDIRECT_PATH.CALCULATOR,
        //     label: 'Belgeler'
        // }

        // {
        //   name: "Calculator",
        //   icon: galleryIcon,
        //   color: "#BF5AF2",
        //   path: REDIRECT_PATH.CALCULATOR,
        //   label: "Hesap Makinesi",
        // },
    ];

    useEffect(() => {
        const getData = () => fetchNui('getSettings').then(setSettings);

        getData();
    }, []);

    return (
        <div className="page">
            <div className="flex items-center justify-center pt-3">
                <div className="grid grid-cols-4 justify-center gap-3 p-2">
                    {HomeButtons.map(data => (
                        <HomeButton isTop={true} data={data}></HomeButton>
                    ))}
                </div>
            </div>
        </div>
    );
}

const HomeButton = ({ data, isTop }) => {
    let navigate = useNavigate();
    return (
        <div className="flex flex-col items-center">
            <img
                onClick={() =>
                    data.fetch ? fetchNui('openCamera') : navigate(data.path)
                }
                src={`https://kagan.app/images/phone/${data.name.toLowerCase()}.png`}
                className="mb-0 flex h-[3.125] w-[3.125] cursor-pointer items-center justify-center rounded-xl  text-2xl text-white shadow"
            ></img>
            {isTop && (
                <p className="inter mt-1 text-center text-xs text-white">
                    {data.label ?? ''}
                </p>
            )}
        </div>
    );
};

export default Homepage;
