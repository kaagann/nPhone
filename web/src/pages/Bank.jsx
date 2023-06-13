import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './Bank/Home';
import { wrap } from 'popmotion';
import Transfer from './Bank/Transfer';
import SendMoney from './Bank/SendMoney';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { fetchNui } from '../utils/fetchNui';
import Bills from './Bank/Bills';
import History from './Bank/History';

const variants = {
    enter: direction => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: direction => {
        return {
            zIndex: 0,
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const BankContext = React.createContext([]);
export const useBank = () => React.useContext(BankContext);
function Navbar({ activePage, paginate }) {
    return (
        <div className="absolute bottom-0 z-10 flex h-14 w-full items-center justify-around border-t bg-[#d3d3d3] !p-0 dark:border-[#282828] dark:bg-[#151515]">
            <div onClick={() => paginate('home')} className="cursor-pointer">
                <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.29406 18.1113V15.154C6.29405 14.4046 6.89274 13.7957 7.63431 13.791H10.3572C11.1021 13.791 11.7059 14.4012 11.7059 15.154V18.1027C11.7059 18.7527 12.2249 19.2809 12.868 19.2857H14.7257C15.5933 19.2879 16.4262 18.9412 17.0405 18.3221C17.6548 17.7029 18 16.8622 18 15.9854V7.58491C18 6.87668 17.6893 6.20489 17.1517 5.75051L10.8407 0.650186C9.73754 -0.241917 8.16193 -0.213099 7.09142 0.718762L0.916117 5.75051C0.353123 6.1915 0.0166285 6.86528 0 7.58491V15.9769C0 17.8043 1.46594 19.2857 3.27427 19.2857H5.08954C5.39922 19.2879 5.69699 19.1652 5.91676 18.9447C6.13654 18.7243 6.26014 18.4242 6.26013 18.1113H6.29406Z"
                        fill={activePage == 'home' ? '#D04457' : '#000'}
                    />
                </svg>
            </div>

            <div
                onClick={() => paginate('transfer')}
                className="cursor-pointer"
            >
                <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.53125 7.1875L6.78125 15.25L20 0.593748L6.53125 7.1875Z"
                        fill={
                            activePage == 'transfer' ||
                            activePage == 'sendmoney'
                                ? '#D04457'
                                : '#000'
                        }
                    />
                    <path
                        d="M0 1.125L6.28125 6.59375L19.7812 0L0 1.125Z"
                        fill={
                            activePage == 'transfer' ||
                            activePage == 'sendmoney'
                                ? '#D04457'
                                : '#000'
                        }
                    />
                </svg>
            </div>

            <div onClick={() => paginate('history')} className="cursor-pointer">
                <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.24884 11.1783H17.4978C17.6855 11.1783 17.8655 11.1038 17.9982 10.9711C18.1309 10.8384 18.2054 10.6584 18.2054 10.4707C18.2054 10.283 18.1309 10.103 17.9982 9.97033C17.8655 9.83762 17.6855 9.76307 17.4978 9.76307H1.56072C1.47477 9.74653 1.38617 9.74843 1.30082 9.76876L1.30074 9.76845L1.28971 9.77173C1.1698 9.80737 1.0653 9.8815 0.992096 9.98221C0.926302 10.0437 0.875977 10.12 0.845407 10.2049C0.809584 10.2889 0.791099 10.3793 0.791099 10.4707C0.791099 10.565 0.810801 10.6584 0.848944 10.7447L0.848872 10.7447L0.851335 10.7499C0.897399 10.8468 0.969879 10.9285 1.06014 10.9857L5.02954 14.9551C5.09337 15.0224 5.17017 15.0761 5.25531 15.113C5.34155 15.1503 5.43453 15.1696 5.52851 15.1696C5.62248 15.1696 5.71546 15.1503 5.80171 15.113C5.88592 15.0765 5.96197 15.0236 6.02538 14.9573C6.09165 14.8939 6.14459 14.8179 6.18105 14.7337C6.21838 14.6474 6.23764 14.5544 6.23764 14.4605C6.23764 14.3665 6.21838 14.2735 6.18105 14.1873C6.14421 14.1022 6.09056 14.0254 6.02333 13.9616L3.24884 11.1783ZM21.1799 5.75758L21.1876 5.74005L21.1921 5.7214C21.2124 5.6363 21.2143 5.54798 21.1979 5.46227C21.1968 5.37686 21.1779 5.29257 21.1425 5.21473C21.1094 5.12434 21.0539 5.04383 20.9811 4.98077L16.9972 0.996889C16.8654 0.865124 16.6867 0.791099 16.5004 0.791099C16.314 0.791099 16.1353 0.865124 16.0036 0.996889C15.8718 1.12865 15.7978 1.30737 15.7978 1.49371C15.7978 1.68005 15.8718 1.85876 16.0036 1.99053L16.0043 1.99124L18.7755 4.73596H4.53106C4.34339 4.73596 4.1634 4.81051 4.0307 4.94322C3.89799 5.07592 3.82344 5.25591 3.82344 5.44358C3.82344 5.63126 3.89799 5.81124 4.0307 5.94395C4.1634 6.07665 4.34339 6.15121 4.53106 6.15121H20.5081C20.594 6.16775 20.6826 6.16585 20.768 6.14552L20.7866 6.14108L20.8041 6.13331C20.9717 6.0591 21.1057 5.92516 21.1799 5.75758Z"
                        fill={activePage == 'history' ? '#D04457' : '#000'}
                        stroke="#000"
                        stroke-width="0.417801"
                    />
                </svg>
            </div>

            <div onClick={() => paginate('bills')} className="cursor-pointer">
                <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill={activePage == 'bills' ? '#D04457' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16.6525 0H3.34748C2.46 0.00106307 1.60917 0.354085 0.981629 0.981629C0.354085 1.60917 0.00106307 2.46 0 3.34748V12.0614C0.00106307 12.9489 0.354085 13.7997 0.981629 14.4272C1.60917 15.0548 2.46 15.4078 3.34748 15.4089H16.6525C17.54 15.4078 18.3908 15.0548 19.0184 14.4272C19.6459 13.7997 19.9989 12.9489 20 12.0614V3.34748C19.9989 2.46 19.6459 1.60917 19.0184 0.981629C18.3908 0.354085 17.54 0.00106307 16.6525 0ZM3.34748 1.33899H16.6525C17.185 1.33956 17.6956 1.55135 18.0721 1.92789C18.4487 2.30443 18.6604 2.81497 18.661 3.34748V4.22559H1.33899V3.34748C1.33956 2.81497 1.55135 2.30443 1.92789 1.92789C2.30443 1.55135 2.81497 1.33956 3.34748 1.33899ZM16.6525 14.0699H3.34748C2.81497 14.0693 2.30443 13.8575 1.92789 13.481C1.55135 13.1044 1.33956 12.5939 1.33899 12.0614V5.56459H18.661V12.0614C18.6604 12.5939 18.4487 13.1044 18.0721 13.481C17.6956 13.8575 17.185 14.0693 16.6525 14.0699ZM16.831 10.9388C16.831 11.1163 16.7605 11.2866 16.6349 11.4122C16.5094 11.5377 16.3391 11.6083 16.1615 11.6083H14.5563C14.3788 11.6083 14.2085 11.5377 14.0829 11.4122C13.9574 11.2866 13.8868 11.1163 13.8868 10.9388C13.8868 10.7612 13.9574 10.5909 14.0829 10.4654C14.2085 10.3398 14.3788 10.2693 14.5563 10.2693H16.1615C16.3391 10.2693 16.5094 10.3398 16.6349 10.4654C16.7605 10.5909 16.831 10.7612 16.831 10.9388Z"
                        fill={activePage == 'bills' ? '#D04457' : '#000'}
                    />
                </svg>
            </div>
        </div>
    );
}

function Bank() {
    const pages = [
        {
            name: 'home',
            element: <Home />
        },
        {
            name: 'transfer',
            element: <Transfer />
        },
        {
            name: 'history',
            element: <History />
        },
        {
            name: 'bills',
            element: <Bills />
        },
        {
            name: 'sendmoney',
            element: <SendMoney />
        }
    ];
    const [[page, direction], setPage] = useState(['home', 0]);
    const pageIndex = wrap(
        0,
        pages.length,
        pages.findIndex(x => x.name == page) ?? 0
    );

    const paginate = _page => {
        var oldIndex = pages.findIndex(x => x.name == page) ?? 0;
        var newIndex = pages.findIndex(x => x.name == _page) ?? 1;
        var direction = 1;

        if (oldIndex >= newIndex) {
            direction = direction * -1;
        }

        setPage([_page, direction]);
    };

    const [iban, setIban] = useState('');
    const [accountIndex, setAccountIndex] = useState(0);

    const [cards, setCards] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useNuiEvent('setBank', data => {
        console.log(data, 'updateing');
        setCards(data.cards);
        setTransactions(data.transactions);
    });

    useEffect(() => {
        const getData = () => fetchNui('getBankDetails');

        getData();
    }, []);

    const values = {
        paginate,
        iban,
        setIban,
        cards,
        setCards,
        transactions,
        setTransactions,
        accountIndex,
        setAccountIndex
    };

    return (
        <div className="absolute top-0 left-0 z-10   h-full w-full bg-[#EBEBEB] dark:bg-[#0D0D0D]">
            <AnimatePresence initial={false}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    layout
                    transition={{
                        x: { type: 'tween', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                >
                    <BankContext.Provider value={values}>
                        <div className="absolute top-0 left-0 z-10  h-full w-full bg-[#EBEBEB] dark:bg-[#0D0D0D]">
                            {pages[pageIndex].element}
                        </div>
                    </BankContext.Provider>
                </motion.div>
            </AnimatePresence>

            <Navbar paginate={paginate} activePage={page} />
        </div>
    );
}

function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export default Bank;
