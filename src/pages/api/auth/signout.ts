import type { APIRoute } from "astro";

export const post: APIRoute = (ctx) => {
  ctx.cookies.delete("X-Token", {
    path: "/",
  });

  return {
    body: JSON.stringify({ message: "successfully signed out" }),
  };
};

export const all: APIRoute = async (ctx) => {
  const method = ctx.request.method;

  return {
    body: JSON.stringify({
      method,
      message: "Unsupported HTTP method",
    }),
    status: 501,
  };
};
