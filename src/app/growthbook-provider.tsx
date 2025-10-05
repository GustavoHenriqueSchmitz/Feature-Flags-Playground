"use client";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { ReactNode } from "react";

const gb = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  enableDevMode: true,
  // TODO: Set targeting attributes
  // attributes: {
  //   id: 'user-123',
  // },
});

// Load feature flags
gb.loadFeatures();

export default function Provider({ children }: { children: ReactNode }) {
  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>;
}
