import VsPage, { vsMetadata } from "@/components/VsPage";

const slug = "rgvpm-vs-patientgain";
export const metadata = vsMetadata(slug);

export default function Page() {
  return <VsPage slug={slug} />;
}
