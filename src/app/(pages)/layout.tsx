import flagsmith from "flagsmith/isomorphic";
import Provider from "../provider";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const flagsmithState = await flagsmith
    .init({
      environmentID: process.env.Flagsmith,
      identity: "test_user_id",
    })
    .then(() => {
      return flagsmith.getState();
    });

  return <Provider flagsmithState={flagsmithState}>{children}</Provider>;
}
