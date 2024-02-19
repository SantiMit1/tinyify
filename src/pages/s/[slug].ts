import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const urlsCollection = db.collection("urls");

export const GET: APIRoute = async ({ params, redirect }) => {
  const { slug } = params;
  const snapshot = await urlsCollection.where("slug", "==", slug).get();
  let { url } = snapshot.docs.map((doc) => ({ ...doc.data() }))[0];
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  return redirect(`${url}`);
};
