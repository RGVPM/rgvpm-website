import { getDigitalMarketingCity, digitalMarketingCityMetadata, digitalMarketingCityJsonLd } from "@/lib/digitalMarketing";
import JsonLd from "@/components/JsonLd";
import DigitalMarketingPage from "@/components/DigitalMarketingPage";

const city = getDigitalMarketingCity("brownsville")!;

export const metadata = digitalMarketingCityMetadata(city);

export default function Page() {
  return (
    <>
      <JsonLd data={digitalMarketingCityJsonLd(city)} />
      <DigitalMarketingPage city={city} />
    </>
  );
}
