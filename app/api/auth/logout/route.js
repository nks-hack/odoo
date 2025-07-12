// import { NextResponse } from "next/server";

// export default function handler(req, res) {
//   const cookie = serialize("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     expires: new Date(0),
//     path: "/",
//   });

//   res.setHeader("Set-Cookie", cookie);
//   res.status(200).json({ message: "Logged out" });
// }
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // Delete cookie
    path: "/",
  });

  return response;
}
