import TexasMedspaCityPage, { texasCityMetadata } from "@/components/TexasMedspaCityPage";
import { texasCity } from "@/lib/texasMedspa";

const city = texasCity("austin");

export const metadata = texasCityMetadata(city);

export default function MedSpaMarketingAustinPage() {
  return <TexasMedspaCityPage city={city} />;
}
