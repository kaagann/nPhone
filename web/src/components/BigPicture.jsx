import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

function BigPicture() {
    const { cache, setCache } = useSettings();
    return (
        cache.picture && (
            <div className="absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center gap-2 bg-black/50">
                <img src={cache.picture} className="h-1/2" />
                <div
                    onClick={e => {
                        setCache({ ...cache, picture: null });
                    }}
                    className="inter flex h-8 w-8 items-center justify-center rounded-md bg-white"
                >
                    X
                </div>
            </div>
        )
    );
}

export default BigPicture;
