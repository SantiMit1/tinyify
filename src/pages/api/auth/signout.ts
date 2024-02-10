import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete("session", {
    path: "/",
  });
  cookies.delete("userUid", {
    path: "/",
  })
  return redirect("/");
};