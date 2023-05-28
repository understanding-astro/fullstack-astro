import type { APIRoute } from "astro";
import { TOKEN } from "@constants/cookies";

export const post: APIRoute = (ctx) => {
  ctx.cookies.delete(TOKEN, {
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
