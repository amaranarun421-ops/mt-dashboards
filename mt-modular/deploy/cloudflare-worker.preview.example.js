const ROUTES = [
  {
    prefix: "/templates/dash/mt-modular",
    origin: "https://YOUR-MT-MODULAR-VERCEL-PROJECT.vercel.app",
  },
  {
    prefix: "/templates/suites/PROJECT-ONE",
    origin: "https://YOUR-SUITE-ONE-VERCEL-PROJECT.vercel.app",
  },
  {
    prefix: "/templates/suites/PROJECT-TWO",
    origin: "https://YOUR-SUITE-TWO-VERCEL-PROJECT.vercel.app",
  },
  {
    prefix: "/templates/suites/PROJECT-THREE",
    origin: "https://YOUR-SUITE-THREE-VERCEL-PROJECT.vercel.app",
  },
];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const route = ROUTES
      .sort((a, b) => b.prefix.length - a.prefix.length)
      .find((item) => url.pathname === item.prefix || url.pathname.startsWith(`${item.prefix}/`));

    if (!route) {
      return new Response("Not found", { status: 404 });
    }

    const upstream = new URL(request.url);
    upstream.protocol = "https:";
    upstream.hostname = new URL(route.origin).hostname;

    const headers = new Headers(request.headers);
    headers.set("host", upstream.hostname);
    headers.set("x-forwarded-host", url.hostname);
    headers.set("x-forwarded-proto", url.protocol.replace(":", ""));

    return fetch(upstream, {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });
  },
};