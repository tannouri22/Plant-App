import fetch from 'node-fetch';
import 'dotenv/config';

export async function GET(request) {
    try {

        let apiUrl = `https://trefle.io/api/v1/species?token=${process.env.ACCESS_TOKEN}`

        if (request && request.url) {
            const { searchParams } = new URL(request.url);
            const speciesId = searchParams.get('speciesId');

            // If a region is provided, modify the API endpoint
            if (speciesId) {
                apiUrl = `https://trefle.io/api/v1/species/${speciesId}?token=${process.env.ACCESS_TOKEN}`;
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

          