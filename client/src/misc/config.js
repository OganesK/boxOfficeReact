const BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(queryString) {

    const response = await fetch(`${BASE_URL}${queryString}`).then(r => r.json())
    return response;
}