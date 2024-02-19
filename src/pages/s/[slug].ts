import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

interface Url {
  id: string;
  slug: string;
  url: string;
  description: string;
  userId: string;
  views: number;
}

const db = getFirestore(app);
const urlsCollection = db.collection("urls");

export const GET: APIRoute = async ({ params, redirect }) => {
  const { slug } = params;
  const snapshot = await urlsCollection.where("slug", "==", slug).get();
  let url = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0] as Url;
  if (!url.url.startsWith("http://") && !url.url.startsWith("https://")) {
    url.url = "http://" + url.url;
  }

  await urlsCollection.doc(url.id).update({
    views: url.views + 1,
  })

  return redirect(`${url.url}`);
};
