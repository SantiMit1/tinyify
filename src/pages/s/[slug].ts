import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const urlsCollection = db.collection("urls");

export const GET: APIRoute = async ({ params, redirect }) => {
  const { slug } = params;
  const snapshot = await urlsCollection.where("slug", "==", slug).get();
  const url = snapshot.docs.map((doc) => ({ ...doc.data() }))[0];

  return redirect(`${url.url}`);
};
