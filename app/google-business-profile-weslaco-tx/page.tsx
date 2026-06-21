import { buildGbpCityProps, gbpCityMetadata, gbpCityJsonLd } from "@/lib/gbp";
import JsonLd from "@/components/JsonLd";
import ServiceCityPage from "@/components/ServiceCityPage";

const SLUG = "weslaco";
const NAME = "Weslaco";

export const metadata = gbpCityMetadata(SLUG, NAME);

export default function Page() {
  return (
    <>
      <JsonLd data={gbpCityJsonLd(SLUG, NAME)} />
      <ServiceCityPage {...buildGbpCityProps(SLUG, NAME)} />
    </>
  );
}
