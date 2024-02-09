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

export const GET: APIRoute = ({ request, params }) => {
  return new Response(JSON.stringify(mockUrls), {
    headers: {
      "content-type": "application/json"
    },
    status: 200,
  })
}
