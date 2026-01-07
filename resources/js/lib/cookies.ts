import Cookies from "js-cookie";

interface SetCookieOptions {
  name: string;
  value: string;
  maxAge?: number;
  path?: string;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
}

const canWriteCookieStore = () =>
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

type CookieAttributes = NonNullable<Parameters<typeof Cookies.set>[2]>;

const buildCookieAttributes = ({
  maxAge,
  path = "/",
  sameSite = "lax",
  secure,
}: SetCookieOptions): CookieAttributes => {
  const attributes: CookieAttributes = {
    path,
    sameSite,
  };

  if (typeof maxAge === "number") {
    attributes.expires = new Date(Date.now() + maxAge * 1000);
  }

  if (secure !== undefined) {
    attributes.secure = secure;
  }

  return attributes;
};

export const setCookie = async (options: SetCookieOptions) => {
  if (typeof window === "undefined") {
    return;
  }

  if (canWriteCookieStore()) {
    try {
      await cookieStore.set(buildCookie(options));
    } catch {
      // Some browsers or privacy settings can block cookieStore writes.
    }
    return;
  }

  try {
    Cookies.set(options.name, options.value, buildCookieAttributes(options));
  } catch {
    // Ignore cookie writes when blocked by browser privacy settings.
  }
};
