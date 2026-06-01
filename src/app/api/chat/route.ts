import { NextRequest } from 'next/server';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are StreamBuddy, the highly conversational, extremely friendly, and witty virtual assistant for StreamKart.
StreamKart is India's leading portal for premium subscriptions, including Streaming (Netflix, Amazon Prime, Disney+, JioHotstar, SonyLIV, Zee5, Crunchyroll), AI Tools (ChatGPT Plus, Gemini Advanced, Claude Pro, Perplexity Pro, Midjourney), Music (Spotify, Apple Music, YouTube Music), and Design/Productivity software (Canva Pro, Adobe Creative Cloud, CapCut, Microsoft 365).

Your goals:
1. Be extremely engaging, conversational, and helper-oriented. Avoid boring generic robotic templates.
2. If a user asks for recommendations (like scary movies, funny shows, or productivity apps), provide high-quality personalized recommendations based on their mood/needs.
3. Align recommendations with our available services:
   - Scary/funny/action movies -> Recommend Netflix, Prime, Disney+, or JioHotstar.
   - Design/editing software -> Recommend Canva Pro (for social media/creatives) or Adobe Creative Cloud (for professional editing).
   - Coding/writing assistants -> Recommend ChatGPT Plus or Claude Pro.
4. Keep your responses concise and readable (using short paragraphs, bullet points, and select emojis). Avoid extremely long blocks of text.
5. If the user wants to buy something, encourage them! Mention that they can just say "Add Netflix" or "Add Canva" and you will do it instantly, or they can click cart buttons.
6. Address any typos or spelling mistakes gracefully, understanding the user's intent.

Current time: ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}, Date: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ 
                error: "GEMINI_API_KEY is not configured", 
                isFallback: true 
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Format history into Gemini API format: { role: 'user'|'model', parts: [{ text: string }] }
        const contents = messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const payload = {
            contents,
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
            }
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API stream error:", errText);
            return new Response(JSON.stringify({ 
                error: "Failed to communicate with Gemini API", 
                isFallback: true 
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Handle streaming response
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        const reader = response.body?.getReader();

        if (!reader) {
            return new Response(JSON.stringify({ error: "No stream body available" }), { status: 500 });
        }

        let buffer = '';
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });

                        // Gemini stream output format is a JSON array of parts or stream events.
                        // We extract JSON objects matching candidates[0].content.parts[0].text
                        // Using a simple regex parser to stream text fragments instantly
                        const regex = /"text"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
                        let match;
                        while ((match = regex.exec(buffer)) !== null) {
                            try {
                                // Decode escaped JSON string value
                                const unescaped = JSON.parse(`"${match[1]}"`);
                                controller.enqueue(encoder.encode(unescaped));
                            } catch (e) {
                                // Ignore parsing errors of partial json segments
                            }
                        }
                        
                        // Clear processed buffer periodically to prevent memory bloating
                        if (buffer.length > 50000) {
                            buffer = buffer.substring(buffer.lastIndexOf('}') + 1);
                        }
                    }
                    controller.close();
                } catch (err) {
                    controller.error(err);
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            }
        });

    } catch (error: any) {
        console.error("Chat API route error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
