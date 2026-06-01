import { getCity, aiCityMetadata, aiCityJsonLd, aiCityCrumbs } from "@/lib/cities";
import JsonLd from "@/components/JsonLd";
import AiImplementationPage from "@/components/AiImplementationPage";
import { AI_IMPL } from "@/lib/aiImplementation";

const city = getCity("san-benito")!;

export const metadata = aiCityMetadata(city);

export default function Page() {
  return (
    <>
      <JsonLd data={aiCityJsonLd(city)} />
      <AiImplementationPage
        eyebrow={AI_IMPL.eyebrow}
        h1={city.ai.h1}
        heroSub={city.ai.heroSub}
        crumbs={aiCityCrumbs(city)}
        cityIntro={city.ai.intro}
        backToMain
      />
    </>
  );
}
