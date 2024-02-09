import { type APIRoute } from "astro";

const mockUrls = [
  {
    name: "google",
    url: "https://www.google.com",
    creatorId: "1"
  },
  {
    name: "facebook",
    url: "https://www.facebook.com",
    creatorId: "1"
  },
  {
    name: "twitter",
    url: "https://www.twitter.com",
    creatorId: "1"
  
  }
]

export const GET: APIRoute = async ({ request }) => {
  const creatorId = new URL(request.url).searchParams.get("id")
  const resUrls = mockUrls.filter(url => url.creatorId === creatorId)

  return new Response(JSON.stringify(resUrls), {
    headers: {
      "content-type": "application/json"
    },
    status: 200,
  })
}
