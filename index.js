const headers = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': `base-uri 'none'; default-src 'none'`,
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(self), sync-xhr=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
};

export default {
  async fetch({ method, url }) {
    if (method !== 'GET') {
      return new Response(undefined, { status: 405, headers });
    }

    const { pathname } = new URL(url);

    switch (pathname.toLowerCase()) {
      case '/.well-known/atproto-did':
        return new Response('did:plc:rfnwqtxqcm4ncjxid3uidjis', {
          status: 200,
          headers: { 'content-type': 'text/plain', ...headers }
        });
      case '/.well-known/security.txt':
        return new Response(
          'Contact: https://github.com/jdanyow/jd.town/issues\nExpires: 2082-12-31T00:00:00.000Z',
          {
            status: 200,
            headers: { 'content-type': 'text/plain', ...headers }
          }
        );
      case '/':
        return new Response(null, {
          status: 302,
          headers: { location: 'https://bsky.app/profile/jd.town', ...headers }
        });
      default:
        return new Response(undefined, { status: 404, headers });
    }
  }
};
