
export function getApiBaseUrl(){
    const { hostname } = window.location;

    if (hostname === 'smartbankdemo.azurewebsites.net') {
        return 'https://smartbankdemo.azurewebsites.net/api/';
    }

    return 'https://localhost:7053/api/';
};