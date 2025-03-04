import fetch from 'node-fetch';
import 'dotenv/config';

export async function GET() {
    try {
        const response = await fetch(`https://trefle.io/api/v1/plants?filter_not%5Bedible_part%5D=null&token=${process.env.ACCESS_TOKEN}`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const json = await response.json();
        return Response.json(json);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

          