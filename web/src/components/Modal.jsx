import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { fetchNui } from '../utils/fetchNui';

function Modal({ inputs, onClose, onSubmit, header }) {
    const [values, setValues] = useState({});
    const inputRef = useRef();

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

    return (
        <div className="absolute top-0 left-0 z-50 flex  h-full w-full items-center justify-center bg-black/50">
            <div className="relative mx-5 w-full rounded-xl bg-white dark:bg-[#0D0D0D] dark:text-white">
                <h1 className="text-semibold inter mt-2 text-center">
                    {header ?? 'başlık yaz la salak herif'}
                </h1>
                <div className="flex  flex-1 flex-col items-center">
                    <div className="mt-3 mb-5 flex flex-col gap-2 px-2">
                        {inputs.map(x => (
                            <input
                                onChange={e =>
                                    setValues({
                                        ...values,
                                        [x.name]: e.target.value
                                    })
                                }
                                placeholder={x.placeholder}
                                type="text"
                                className="rounded border-none bg-gray-200 py-1 px-2 text-sm outline-none transition-all dark:!border-[#C2C2C2]/10  dark:bg-[#111]"
                            />
                        ))}
                    </div>
                </div>

                <div className="divide-[] b bottom-0  flex items-center justify-around divide-x border-t text-[#007aff] dark:divide-[#C2C2C2]/10 dark:border-[#C2C2C2]/10">
                    <div
                        onClick={onClose}
                        className="w-1/2 cursor-pointer py-1"
                    >
                        <p className="text-center">Vazgeç</p>
                    </div>
                    <div
                        onClick={() => onSubmit(values)}
                        className="w-1/2 cursor-pointer py-1"
                    >
                        <p className="text-center">Oluştur</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
