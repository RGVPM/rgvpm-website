import { buildGoogleAdsCityProps, googleAdsCityMetadata, googleAdsCityJsonLd } from "@/lib/googleAds";
import JsonLd from "@/components/JsonLd";
import ServiceCityPage from "@/components/ServiceCityPage";

const SLUG = "harlingen";
const NAME = "Harlingen";

export const metadata = googleAdsCityMetadata(SLUG, NAME);

export default function Page() {
  return (
    <>
      <JsonLd data={googleAdsCityJsonLd(SLUG, NAME)} />
      <ServiceCityPage {...buildGoogleAdsCityProps(SLUG, NAME)} />
    </>
  );
}
