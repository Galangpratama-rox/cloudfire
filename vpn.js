export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing url param", { status: 400 });
    }

    const res = await fetch(decodeURIComponent(target), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
        Referer: new URL(decodeURIComponent(target)).origin,
      },
      redirect: "manual",
    });

    return new Response(res.body, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "text/html",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
