import Script from "next/script";

/** GHL "Web Design Interest" inline form embed + loader script. */
export default function WebDesignForm() {
  return (
    <>
      <iframe
        src="https://api.rgvperformancemarketing.com/widget/form/W4okHNYC7NqGmLm9tcA0"
        style={{ width: "100%", height: 1250, border: "none", borderRadius: 8 }}
        id="inline-W4okHNYC7NqGmLm9tcA0"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Web Design Interest"
        data-height="1250"
        data-layout-iframe-id="inline-W4okHNYC7NqGmLm9tcA0"
        data-form-id="W4okHNYC7NqGmLm9tcA0"
        title="Web Design Interest"
      />
      <Script
        src="https://api.rgvperformancemarketing.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
