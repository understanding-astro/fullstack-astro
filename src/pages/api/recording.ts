import type { APIRoute } from "astro";

import { nanoid } from "nanoid";
import { TOKEN } from "@constants/cookies";
import { getAuth } from "firebase-admin/auth";
import { BUCKET_NAME } from "@constants/firebase";
import { getStorage } from "firebase-admin/storage";
import { serverApp } from "@scripts/firebase/initServer";

const auth = getAuth(serverApp);

export const post: APIRoute = async (ctx) => {
  const authUserError = new Response("Unauthenticated user", { status: 401 });

  try {
    const authToken = ctx.cookies.get(TOKEN).value;

    if (!authToken) {
      return authUserError;
    }

    await auth.verifyIdToken(authToken);
  } catch (error) {
    return authUserError;
  }

  try {
    const blob = await ctx.request.blob();

    const storage = getStorage(serverApp);
    const bucket = storage.bucket(BUCKET_NAME);

    // convert Blob to native Node Buffer for server storage
    const buffer = Buffer.from(await blob.arrayBuffer());
    const file = bucket.file(`recording-${nanoid()}.wav`);

    await file.save(buffer);

    return {
      body: JSON.stringify({
        message: "Recording uploaded",
      }),
    };
  } catch (error) {
    console.error(error);
    return new Response("Something went horribly wrong", { status: 500 });
  }
};

export const all: APIRoute = async (ctx) => {
  const method = ctx.request.method;

  return new Response(`Unsupported HTTP method ${method}`, { status: 501 });
};
