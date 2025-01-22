import { cookies } from "next/headers";

interface Session {
  name: string;
  email: string;
  image: string;
  token: string;
}

export const getSession = async (): Promise<Session | null> => {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get("NEXT_CWS_SU");

  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(sessionCookie.value) as Session;
    return session;
  } catch (error) {
    console.error("Failed to parse session cookie:", error);
    return null;
  }
};
