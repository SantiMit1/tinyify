import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const urlsCollection = db.collection("urls");

export const DELETE: APIRoute = async ({ params }) => {
  if (!params.id) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  try {
    await urlsCollection.doc(params.id).delete();
  } catch (error) {
    return new Response("Error deleting url", {
      status: 500,
    });
  }

  return new Response("Url deleted", {
    status: 200,
  })
};
