import Homepage from '../pages/Homepage';
import Rehber from '../pages/Rehber';
import Settings from '../pages/Settings';
import Bank from '../pages/Bank';
import Twitter from '../pages/Twitter';
import Map from '../pages/Map';
import Yellowpages from '../pages/Yellowpages';
import Messages from '../pages/Messages';
import Gallery from '../pages/Gallery';
import Valet from '../pages/Valet';
import JobCenter from '../pages/JobCenter';
import Calculator from '../pages/Calculator';
import Company from '../pages/Company';

export const REDIRECT_PATH = {
    HOME_PAGE: 'web/build',
    SETTINGS: '/settings',
    REHBER: '/rehber',
    BANK: '/bank',
    TWITTER: '/twitter',
    MAP: '/map',
    YELLOWPAGES: '/yellowpages',
    MESSAGES: '/messages',
    GALLERY: '/gallery',
    VALET: '/valet',
    JOB: '/jobcenter',
    CALCULATOR: '/calculator',
    COMPANY: '/company'
};

export const router = [
    {
        component: <Homepage />,
        path: REDIRECT_PATH.HOME_PAGE
    },
    {
        component: <Settings />,
        path: REDIRECT_PATH.SETTINGS
    },
    {
        component: <Rehber />,
        path: REDIRECT_PATH.REHBER
    },
    {
        component: <Bank />,
        path: REDIRECT_PATH.BANK
    },
    {
        component: <Twitter />,
        path: REDIRECT_PATH.TWITTER
    },
    {
        component: <Map />,
        path: REDIRECT_PATH.MAP
    },
    {
        component: <Yellowpages />,
        path: REDIRECT_PATH.YELLOWPAGES
    },
    {
        component: <Messages />,
        path: REDIRECT_PATH.MESSAGES
    },
    {
        component: <Gallery />,
        path: REDIRECT_PATH.GALLERY
    },
    {
        component: <Valet />,
        path: REDIRECT_PATH.VALET
    },
    {
        component: <JobCenter />,
        path: REDIRECT_PATH.JOB
    },
    {
        component: <Calculator />,
        path: REDIRECT_PATH.CALCULATOR
    },
    {
        component: <Company />,
        path: REDIRECT_PATH.COMPANY
    }
];
