export const config = {
  runtime: 'edge'
};

const EXTRACTION_SYSTEM_PROMPT = `You are a precision resume information extraction engine.
Extract ONLY information explicitly present in the supplied resume text.
Never invent companies, dates, skills, degrees, projects, achievements, or URLs.
Return valid JSON conforming to CanonicalProfile including all projects, education, hackathons, certifications, and extracurriculars.`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { cleanText } = await req.json();
    if (!cleanText || typeof cleanText !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing cleanText parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cerebrasKey = process.env.VITE_CEREBRAS_API_KEY || process.env.CEREBRAS_API_KEY || '';
    const groqKey = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY || '';

    // 1. Try Cerebras
    if (cerebrasKey) {
      try {
        const cerebrasRes = await fetch('https://api.cerebras.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cerebrasKey}`
          },
          body: JSON.stringify({
            model: 'llama3.1-70b',
            messages: [
              { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
              { role: 'user', content: `Extract the canonical profile JSON from this resume text:\n\n${cleanText}` }
            ],
            temperature: 0.1,
            max_tokens: 4000,
            response_format: { type: 'json_object' }
          })
        });

        if (cerebrasRes.ok) {
          const data = await cerebrasRes.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            const clean = content.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
            const parsed = JSON.parse(clean);
            return new Response(JSON.stringify(parsed), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } catch (err) {
        console.error('Serverless Cerebras error', err);
      }
    }

    // 2. Try Groq
    if (groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: EXTRACTION_SYSTEM_PROMPT },
              { role: 'user', content: `Extract the canonical profile JSON from this resume text:\n\n${cleanText}` }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          })
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            const clean = content.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
            const parsed = JSON.parse(clean);
            return new Response(JSON.stringify(parsed), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
      } catch (err) {
        console.error('Serverless Groq error', err);
      }
    }

    return new Response(JSON.stringify({ error: 'LLM extraction upstream unavailable, client heuristic will handle' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
