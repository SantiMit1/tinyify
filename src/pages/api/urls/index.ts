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
  let slug = formData.get("slug").toString();
  let description = formData.get("description").toString();

  const snapshot = await urlsCollection.where("slug", "==", slug).get();
  const existingUrl = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  })

  if(existingUrl.length > 0) {
    return new Response("Slug already exists", {
      status: 400,
    });
  }

  if (!url) {
    return new Response("Invalid request", {
      status: 400,
    });
  }

  if (!description) {
    description = "No description provided";
  }

  if (!slug) {
    slug = Math.random().toString(36).substring(7);
  }

  try {
    await urlsCollection.add({
      url,
      slug,
      userId: "123",
      description
    });
  } catch (error) {
    return new Response("Error creating url", {
      status: 500,
    });
  }

  return redirect("/dashboard");
};
