import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req: NextRequest) {
  const { cookies } = req;

  const token = cookies.get("token");
  const url = req.url;
  const hostName = "https://todo-forproject.vercel.app";

  if (
    url === `${hostName}/` ||
    url === `${hostName}/sign-up` ||
    url === `${hostName}/forgot-password` ||
    url === `${hostName}/recovery-password`
  ) {
    if (!token) return NextResponse.next();

    try {
      return NextResponse.redirect(`${hostName}/tasks`);
    } catch (error) {
      NextResponse.next();
    }
  }

  if (
    url === `${hostName}/tasks` ||
    url === `${hostName}/settings` ||
    url === `${hostName}/task/*`
  ) {
    if (!token) return NextResponse.redirect(`${hostName}/`);

    try {
      const secret = new TextEncoder().encode(
        "1c+fl03biSIfLrV7dUBD39gBmXBcL/30Ya3D82mCEUC4zg/UkOfQOmkmV3Lc8YUL"
      );

      await jwtVerify(token.value, secret);
    } catch (error) {
      NextResponse.redirect(`${hostName}/`);
    }
  }

  return NextResponse.next();
}
