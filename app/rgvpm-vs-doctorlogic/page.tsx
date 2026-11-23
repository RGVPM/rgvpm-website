import VsPage, { vsMetadata } from "@/components/VsPage";

const slug = "rgvpm-vs-doctorlogic";
export const metadata = vsMetadata(slug);

export default function Page() {
  return <VsPage slug={slug} />;
}
