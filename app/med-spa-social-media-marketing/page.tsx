import MedspaServicePage, { medspaServiceMetadata } from "@/components/MedspaServicePage";

export const metadata = medspaServiceMetadata("social");

export default function MedSpaSocialMediaPage() {
  return <MedspaServicePage slug="social" />;
}
