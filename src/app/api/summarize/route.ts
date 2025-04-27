import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages: [
                { role: "system", content: "You are a helpful assistant that summarizes text." },
                { role: "user", content: `Summarize this: ${text}` }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_OPENAI_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return NextResponse.json({
            summary:
                response.data.choices[0].message.content.trim()
        }, { status: 200 });

    } catch (error) {
        console.error('Summarize API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
