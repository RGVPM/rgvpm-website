import TexasMedspaCityPage, { texasCityMetadata } from "@/components/TexasMedspaCityPage";
import { texasCity } from "@/lib/texasMedspa";

const city = texasCity("san-antonio");

export const metadata = texasCityMetadata(city);

export default function MedSpaMarketingSanAntonioPage() {
  return <TexasMedspaCityPage city={city} />;
}
