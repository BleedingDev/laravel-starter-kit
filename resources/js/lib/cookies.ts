interface SetCookieOptions {
  name: string;
  value: string;
  maxAge?: number;
  path?: string;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
}

const canWriteCookies = () =>
  typeof window !== "undefined" && typeof cookieStore !== "undefined";

const buildCookie = ({
  name,
  value,
  maxAge,
  path = "/",
  sameSite = "lax",
  secure,
}: SetCookieOptions): CookieInit => {
  const cookie: CookieInit & { secure?: boolean } = {
    name,
    path,
    sameSite,
    value,
  };

  if (secure !== undefined) {
    cookie.secure = secure;
  }

  if (typeof maxAge === "number") {
    cookie.expires = Date.now() + maxAge * 1000;
  }

  return cookie;
};

export const setCookie = async (options: SetCookieOptions) => {
  if (!canWriteCookies()) {
    return;
  }

  try {
    await cookieStore.set(buildCookie(options));
  } catch {
    // Some browsers or privacy settings can block cookieStore writes.
  }
};
