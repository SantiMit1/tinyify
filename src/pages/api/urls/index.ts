import { type APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const urlsCollection = db.collection("urls");

export const GET: APIRoute = async () => {
  const snapshot = await urlsCollection.get();
  const urls = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return new Response(JSON.stringify(urls), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const url = formData.get("url").toString();
  const slug = formData.get("slug").toString();

  if (!url || !slug) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  try {
    await urlsCollection.add({
      url,
      slug,
      userId: "123",
    });
  } catch (error) {
    return new Response("Error creating url", {
      status: 500,
    });
  }

  return redirect("/dashboard");
};
