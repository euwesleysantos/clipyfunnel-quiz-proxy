export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const host = request.headers.get('host') || '';
  const domain = host.split(':')[0];

  const targetUrl = new URL('https://dcpqyzdeqgounzlrweao.supabase.co/functions/v1/serve-quiz');
  targetUrl.searchParams.set('domain', domain);

  const response = await fetch(targetUrl.toString(), {
    method: request.method,
    headers: { 'Content-Type': 'text/html' },
  });

  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}
