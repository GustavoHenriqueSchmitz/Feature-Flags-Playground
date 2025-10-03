import { statsigAdapter, StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";

import { randomUUID } from "crypto";

type UserProfile = {
  userID: string;
  custom: {
    role: "admin" | "user";
  };
};

export const identify = dedupe((async (): Promise<UserProfile> => {
  const newUserProfile: UserProfile = {
    userID: randomUUID(),
    custom: {
      role: Math.random() > 0.5 ? "admin" : "user",
    },
  };

  return newUserProfile;
}) satisfies Identify<StatsigUser>);

export const createFeatureFlag = (key: string) =>
  flag<boolean, StatsigUser>({
    key,
    adapter: statsigAdapter.featureGate((gate) => gate.value, {
      exposureLogging: true,
    }),
    identify,
  });
