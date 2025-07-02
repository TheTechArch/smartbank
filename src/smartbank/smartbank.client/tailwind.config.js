module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        // layout & container
        'max-w-screen-xl',
        'mx-auto',
        'bg-white',
        // page background
        'bg-gray-100',
        // padding & spacing
        'px-4', 'sm:px-6', 'lg:px-8',
        'pt-16', 'min-h-screen',
        // footer/header
        'bg-gray-800', 'text-white', 'mt-8', 'py-6',
        // any other classes you reference only in .cshtml
    ],
    theme: { extend: {} },
    plugins: [],
};