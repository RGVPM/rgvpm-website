import MedspaServicePage, { medspaServiceMetadata } from "@/components/MedspaServicePage";

export const metadata = medspaServiceMetadata("advertising");

export default function MedSpaAdvertisingPage() {
  return <MedspaServicePage slug="advertising" />;
}
