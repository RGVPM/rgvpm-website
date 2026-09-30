import { localSeoCityMetadata, localSeoCityJsonLd, localSeoCityCrumbs, localSeoCityFaqs, localSeoCityLinks, getLocalSeoCity, LOCAL_SEO } from "@/lib/localSeo";
import JsonLd from "@/components/JsonLd";
import LocalSeoPage from "@/components/LocalSeoPage";

const SLUG = "edinburg";
const NAME = "Edinburg";
const city = getLocalSeoCity(SLUG)!;

export const metadata = localSeoCityMetadata(SLUG, NAME);

export default function Page() {
  return (
    <>
      <JsonLd data={localSeoCityJsonLd(SLUG, NAME)} />
      <LocalSeoPage
        eyebrow={LOCAL_SEO.eyebrow}
        h1={city.h1}
        heroSub={city.heroSub}
        crumbs={localSeoCityCrumbs(SLUG, NAME)}
        cityIntro={city.intro}
        details={city.details}
        faqs={localSeoCityFaqs(SLUG)}
        nearby={{ heading: `More for ${NAME} Businesses`, links: localSeoCityLinks(SLUG, NAME) }}
        backToMain
      />
    </>
  );
}
