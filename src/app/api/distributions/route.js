import fetch from 'node-fetch';
import 'dotenv/config';

export async function GET(request) {
    try {
        let apiUrl = `https://trefle.io/api/v1/distributions?token=${process.env.ACCESS_TOKEN}`;
        
        if (request && request.url) {
            const { searchParams } = new URL(request.url);
            const region = searchParams.get('region');
            const page = searchParams.get('page')

            // If a region is provided, modify the API endpoint
            if (region) {
                apiUrl = `https://trefle.io/api/v1/distributions/${region}?token=${process.env.ACCESS_TOKEN}`;
            }
            if (page) {
                apiUrl = `https://trefle.io/api/v1/distributions?page=${page}&token=${process.env.ACCESS_TOKEN}`;
            }
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const json = await response.json();
        return Response.json(json);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

//returns a list of all distributions, from levels 1 through 4
// Must pass a region to get a specific distribution, otherwise all are returned in alphabetical order
// if you pass a page number you can query the next set
