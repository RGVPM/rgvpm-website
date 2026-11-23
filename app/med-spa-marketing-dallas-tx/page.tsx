import TexasMedspaCityPage, { texasCityMetadata } from "@/components/TexasMedspaCityPage";
import { texasCity } from "@/lib/texasMedspa";

const city = texasCity("dallas");

export const metadata = texasCityMetadata(city);

export default function MedSpaMarketingDallasPage() {
  return <TexasMedspaCityPage city={city} />;
}
