import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

function Dropdown({ text, items, onSelect }) {
    const [open, setOpen] = useState(false);
    const [txt, setTxt] = useState('');
    return (
        <div>
            <div
                className="flex w-full cursor-pointer items-center justify-between"
                onClick={() => setOpen(!open)}
            >
                <p className="text-sm">{txt ? txt : text}</p>
                <MdKeyboardArrowDown
                    className={
                        open ? 'rotate-180' : 'rotate-0' + ' transition-all'
                    }
                />
            </div>

            {open && (
                <ul className="mt-2">
                    {items.map(item => (
                        <li
                            className="cursor-pointer text-sm hover:text-blue-500"
                            onClick={() => {
                                setTxt(item.label);
                                setOpen(!open);
                                onSelect(item.onClick);
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
