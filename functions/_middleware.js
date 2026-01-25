export async function onRequest(context) {
  const auth = context.request.headers.get("Authorization");

  const USER = context.env.AUTH_USER;
  const PASS = context.env.AUTH_PASS;

  if (!auth) {
    return new Response("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="Protected"`,
      },
    });
  }

  const [type, encoded] = auth.split(" ");
  const [user, pass] = atob(encoded).split(":");

  if (type !== "Basic" || user !== USER || pass !== PASS) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="Protected"`,
      },
    });
  }

  return context.next(); // 放行到静态页面
}
