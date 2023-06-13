import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { fetchNui } from '../../utils/fetchNui';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import TextModal from '../../components/TextModal';
import moment from 'moment';

const people = [{ name: 'Me' }, { name: 'Police' }];

function Bills() {
    const [selected, setSelected] = useState(null);
    const [bills, setBills] = useState([
        {
            summary: 'kagan baba bir numara',
            amount: 500,
            current_payment: 2,
            payments_num: 3
        }
    ]);

    useEffect(() => {
        const get = () => fetchNui('getBills').then(setBills);

        get();
    }, []);

    useNuiEvent('setBills', setBills);

    return (
        <div className="flex flex-col gap-2 px-3 pt-8">
            {selected && (
                <TextModal
                    header="Fatura Öde"
                    text="Fatura ödeme işlemini onaylıyormusunuz?"
                    onClose={e => setSelected(null)}
                    onSubmit={e => {
                        fetchNui('payBill', selected);
                        setSelected(null);
                    }}
                />
            )}

            <h1 className="text-lg font-medium">Faturalar</h1>

            <div className="">
                {bills
                    .filter(x => x.status != 'completed')
                    .map(data => (
                        <Bill data={data} onClick={e => setSelected(e)} />
                    ))}
            </div>
        </div>
    );
}

function Bill({ data, onClick }) {
    const [open, setOpen] = useState(false);
    const [nextPayment, setNextPayment] = useState(new Date());

    useEffect(() => {
        const periodUnix = data.payments_period * 24 * 60 * 60 * 1000;
        const end = data.timestamp + (data.current_payment + 1) * periodUnix;

        console.log(new Date(end));
        setNextPayment(new Date(end));
    }, []);

    return (
        <div className="relative mb-2 w-full cursor-pointer select-none rounded-lg bg-white py-2  px-3 text-left shadow focus:outline-none sm:text-sm">
            <div
                className="flex items-center gap-2 "
                onClick={e => setOpen(!open)}
            >
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-white">
                    <p>{data.payments_num}</p>
                </div>
                <div>
                    <p className="inter leading-4">{data.summary}</p>
                    <p className="inter text-xs">${data.amount}</p>
                </div>
            </div>
            {open && (
                <div className="mt-2">
                    <p className="text-xs">
                        Bir sonraki ödeme tarihi:{' '}
                        {moment(nextPayment).calendar()}
                    </p>
                    <p className="text-xs">
                        Toplam Ödenen Taksit Tutarı: {data.current_payment}
                    </p>
                    <div
                        onClick={e => onClick(data)}
                        className="mt-2 w-full rounded-md bg-blue-500 p-1 text-center uppercase text-white "
                    >
                        Ode
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bills;
