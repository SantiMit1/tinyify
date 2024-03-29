import { type APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const urlsCollection = db.collection("urls");

export const GET: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const userUid = requestUrl.searchParams.get("userUid");
  const snapshot = await urlsCollection.where("userId", "==", userUid).get();
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

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  const formData = await request.formData();
  const url = formData.get("url").toString();
  let slug = formData.get("slug").toString();
  let description = formData.get("description").toString();
  const userId = cookies.get("userUid").value;

  const snapshot = await urlsCollection.where("slug", "==", slug).get();
  const existingUrl = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  })

  if(existingUrl.length > 0) {
    return new Response(JSON.stringify({message: "Slug already exist"}), {
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
      userId,
      description,
      views: 0
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating url" }), {
      status: 500,
    });
  }

  return redirect("/dashboard");
};

export const DELETE: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const urlId = requestUrl.searchParams.get("id");

  if (!urlId) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  try {
    await urlsCollection.doc(urlId).delete();
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "Url deleted successfully" }), {
    status: 200,
  })
}