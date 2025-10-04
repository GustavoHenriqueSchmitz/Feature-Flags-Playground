import { statsigAdapter, StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";
import { cookies, headers } from "next/headers";

type UserProfile = {
  userID: string;
  custom: {
    role: "admin" | "user";
  };
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
    custom: { role: "user" },
  };
}) satisfies Identify<StatsigUser>);

export const createFeatureFlag = (key: string) =>
  flag<boolean, StatsigUser>({
    key,
    adapter: statsigAdapter.featureGate((gate) => gate.value, {
      exposureLogging: true,
    }),
    identify,
  });
