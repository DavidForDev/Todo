import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req) {
  const { cookies } = req;

  const token = cookies.get("token");
  const url = req.url;
  const hostName = process.env.APP_URL;

  if (
    url === `${hostName}/sign-in` ||
    url === `${hostName}/sign-up` ||
    url === `${hostName}/forgot-password` ||
    url === `${hostName}/recovery-password`
  ) {
    if (!token) return NextResponse.next();

    try {
      return NextResponse.redirect(`${hostName}/`);
    } catch (error) {
      NextResponse.next();
    }
  }

  if (
    url === `${hostName}/` ||
    url === `${hostName}/profile` ||
    url === `${hostName}/tasks` ||
    url === `${hostName}/collections`
  ) {
    if (!token) return NextResponse.redirect(`${hostName}/sign-in`);

    try {
      const secret = new TextEncoder().encode(
        "1c+fl03biSIfLrV7dUBD39gBmXBcL/30Ya3D82mCEUC4zg/UkOfQOmkmV3Lc8YUL"
      );

      const { payload } = await jwtVerify(token.value, secret);

      console.log(payload);
    } catch (error) {
      NextResponse.redirect(`${hostName}/sign-in`);
    }
  }

  return NextResponse.next();
}
