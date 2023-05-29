import type { APIRoute } from "astro";

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
