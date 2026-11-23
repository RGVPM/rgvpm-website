import TexasMedspaCityPage, { texasCityMetadata } from "@/components/TexasMedspaCityPage";
import { texasCity } from "@/lib/texasMedspa";

const city = texasCity("houston");

export const metadata = texasCityMetadata(city);

export default function MedSpaMarketingHoustonPage() {
  return <TexasMedspaCityPage city={city} />;
}
