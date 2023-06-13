// Will return whether the current environment is in a regular browser

import { fetchNui } from './fetchNui';
import { Howl, Howler } from 'howler';
// and not CEF
export const isEnvBrowser = () => !window.invokeNative;

// Basic no operation function
export const noop = () => {};

export const keys = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'Ğ',
    'H',
    'I',
    'İ',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'Ö',
    'P',
    'R',
    'S',
    'Ş',
    'T',
    'U',
    'Ü',
    'V',
    'Y',
    'Z'
];

export const attemptCall = number => {
    if (number) fetchNui('attemptCall', number);
};

export const PlayAudio = aud => {
    var sound = new Howl({
        src: [aud],
        autoplay: true,
        loop: true,
        volume: 0.1,
        onend: function () {
            console.log('Finished!');
        }
    });

    return sound;
};
