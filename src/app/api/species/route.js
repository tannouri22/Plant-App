import fetch from 'node-fetch';
import 'dotenv/config';

export async function GET(request) {
    try {

        let apiUrl = `https://trefle.io/api/v1/species?token=${process.env.ACCESS_TOKEN}`

        if (request && request.url) {
            const { searchParams } = new URL(request.url);
            const speciesId = searchParams.get('speciesId');
            const next = searchParams.get('next');
            const prev = searchParams.get('prev');

            // If a region is provided, modify the API endpoint
            if (speciesId) {
                apiUrl = `https://trefle.io/api/v1/species/${speciesId}?token=${process.env.ACCESS_TOKEN}`;
            }

            if (next) {
                const cleanNext = next.replace(/^["']|["']$/g, "");
                apiUrl = cleanNext.includes("token=") ? cleanNext : `https://trefle.io${cleanNext}&token=${process.env.ACCESS_TOKEN}`;
            }

            if (prev) {
                const cleanPrev = prev.replace(/^["']|["']$/g, "");
                apiUrl = cleanPrev.includes("token=") ? cleanPrev : `https://trefle.io${cleanPrev}&token=${process.env.ACCESS_TOKEN}`;

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

          