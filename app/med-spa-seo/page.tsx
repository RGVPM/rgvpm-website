import MedspaServicePage, { medspaServiceMetadata } from "@/components/MedspaServicePage";

export const metadata = medspaServiceMetadata("seo");

export default function MedSpaSeoPage() {
  return <MedspaServicePage slug="seo" />;
}
