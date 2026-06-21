import { localSeoCityMetadata, localSeoCityJsonLd, localSeoCityCrumbs, getLocalSeoCity, LOCAL_SEO } from "@/lib/localSeo";
import JsonLd from "@/components/JsonLd";
import LocalSeoPage from "@/components/LocalSeoPage";

const SLUG = "harlingen";
const NAME = "Harlingen";
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
        backToMain
      />
    </>
  );
}
