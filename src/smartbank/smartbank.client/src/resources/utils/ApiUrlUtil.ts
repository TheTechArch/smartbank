
export function getApiBaseUrl(){
    const { hostname } = window.location;

    if (hostname === 'evkx-test.azurewebsites.net') {
        return 'https://evkx-test.azurewebsites.net/api/';
    }

    if (hostname === 'evkx.net') {
        return 'https://evkx.net/api/';
    }

    return 'https://localhost:7053/api/';
};