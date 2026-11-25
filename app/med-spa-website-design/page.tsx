import MedspaServicePage, { medspaServiceMetadata } from "@/components/MedspaServicePage";

export const metadata = medspaServiceMetadata("website");

export default function MedSpaWebsiteDesignPage() {
  return <MedspaServicePage slug="website" />;
}
