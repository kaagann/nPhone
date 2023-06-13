import React from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { useSettingsPage } from "../Settings";


function Wallpaper() {
    const {paginate} = useSettingsPage()

    
    return (
        <div class="absolute top-0 left-0 h-full w-full py-9 px-2 flex flex-col gap-4 z-10 bg-gray-200">
            <div class="flex items-center justify-center">
                <div onClick={() => paginate("home")}  className="absolute left-3 text-sm text-blue-400 font-medium cursor-pointer flex items-center inter">
                    <FaAngleLeft />
                    Back
                </div>
                <h1 class="font-semibold inter">Wallpaper</h1>
            </div>
            <h1>Content</h1>
        </div>
    )
}

export default Wallpaper