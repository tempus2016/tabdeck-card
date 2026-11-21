// Right-to-left: `direction` in the config, else Home Assistant's language
// (its translation metadata marks RTL languages), else the page's dir (HA
// sets <html dir="rtl"> for them).
export function isRtl(direction: string | undefined, hass: any, docDir: string | undefined): boolean {
  if (direction === "rtl" || direction === "ltr") return direction === "rtl";
  const meta = hass?.translationMetadata?.translations?.[hass?.language];
  if (meta && typeof meta.isRTL === "boolean") return meta.isRTL;
  return docDir === "rtl";
}
