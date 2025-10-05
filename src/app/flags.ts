import { growthbookAdapter } from "@flags-sdk/growthbook";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";
import { cookies, headers } from "next/headers";

type UserProfile = {
  userID: string;
  role: "admin" | "user";
};

export const identify = dedupe((async (): Promise<UserProfile> => {
  const requestHeaders = await headers();
  const userProfileHeader = requestHeaders.get("x-user-profile");

  if (userProfileHeader) {
    return JSON.parse(userProfileHeader);
  }

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("userProfile");
  if (userCookie) {
    return JSON.parse(userCookie.value);
  }

  return {
    userID: "anonymous",
    role: "user",
  };
}) satisfies Identify<UserProfile>);

// export const createFeatureFlag = (key: string) =>
//   flag<boolean>({
//     key,
//     adapter: growthbookAdapter.feature<boolean>(),
//     identify,
//     defaultValue: false,
//   });

export const exampleFlag = flag({
  key: "login_page",
  // identify,
  adapter: growthbookAdapter.feature<boolean>(),
  defaultValue: false,
});
