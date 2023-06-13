/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            theme: {
                sflight: 'sflight'
            },
            borderRadius: {
                10: '10px'
            }
        }
    },
    plugins: [require('@headlessui/tailwindcss')]
};
