import { getCity, webDesignCityMetadata, webDesignCityJsonLd, webDesignCityCrumbs, webDesignCityFaqs, webDesignCityLinks } from "@/lib/cities";
import JsonLd from "@/components/JsonLd";
import WebDesignPage from "@/components/WebDesignPage";
import { WEB_DESIGN } from "@/lib/webDesign";

const city = getCity("pharr")!;

export const metadata = webDesignCityMetadata(city);

export default function Page() {
  return (
    <>
      <JsonLd data={webDesignCityJsonLd(city)} />
      <WebDesignPage
        eyebrow={WEB_DESIGN.eyebrow}
        h1={city.webDesign.h1}
        heroSub={city.webDesign.heroSub}
        crumbs={webDesignCityCrumbs(city)}
        cityIntro={city.webDesign.intro}
        details={city.webDesign.details}
        faqs={webDesignCityFaqs(city)}
        nearby={{ heading: `More for ${city.name} Businesses`, links: webDesignCityLinks(city) }}
        backToMain
      />
    </>
  );
}
