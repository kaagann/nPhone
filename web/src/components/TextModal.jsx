import React from 'react';

function TextModal({ header, text, onClose, onSubmit }) {
    return (
        <div className="absolute top-0 left-0 !z-50 flex h-full w-full items-center justify-center bg-black/50">
            <div className="relative mx-5 w-full rounded-xl bg-white dark:bg-[#0D0D0D] dark:text-white">
                <h1 className="text-semibold inter  p-2 text-center text-sm">
                    {header ?? 'başlık yaz la salak herif'}
                </h1>
                <div className="inter  p-2">
                    <p className="inter text-center text-sm">{text}</p>
                </div>

                <div className="bottom-0 flex items-center  justify-around divide-x border-t text-[#007aff]">
                    <div
                        onClick={onClose}
                        className="w-1/2 cursor-pointer py-1"
                    >
                        <p className="text-center">Vazgeç</p>
                    </div>
                    <div
                        onClick={() => onSubmit()}
                        className="w-1/2 cursor-pointer py-1"
                    >
                        <p className="text-center">Onayla</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TextModal;
