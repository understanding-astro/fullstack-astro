import type { APIRoute } from "astro";
import { nanoid } from "nanoid";
import { getStorage } from "firebase-admin/storage";
import { serverApp } from "@scripts/firebase/initServer";
import { BUCKET_NAME } from "@constants/firebase";

export const post: APIRoute = async (ctx) => {
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
      ok: true,
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      body: JSON.stringify({
        error: "Something went horribly wrong",
      }),
      status: 500,
      ok: false,
    };
  }
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
