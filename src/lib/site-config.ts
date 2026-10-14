// Site chrome (navigation + footer) from a checked-in JSON stub. The starter
// ships it empty, so a fresh site renders the logo-only Nav + placeholder
// Footer; a site fills it in, or swaps this module for a Prismic
// `settings`-document loader behind the same exports.
import config from "./site-config.json";
import type { AheadService } from "$lib/privacy/services";

export type NavItem = { label: string; href: string; children?: NavItem[] };
export type FooterSocial = { network: string; href?: string };

// A footer column row: a text line (optionally linked — tel:/mailto:/http(s))
// or an image (a footer logo). Shared so the type flows from site-config
// through the layout into Footer as one source of truth.
export type FooterText = { text: string; href?: string };
export type FooterImage = {
  image: { url: string; maxWidth?: string; alt?: string };
  href?: string;
};
export type FooterItem = FooterText | FooterImage;
export type FooterColumn = { items: FooterItem[] };

export type PrivacyConfig = {
  /** The owner the policy names, as the footer's copyright line names it. */
  legalName?: string;
  /** Where privacy requests go. Empty renders "[privacy contact email]". */
  contactEmail?: string;
  /** ISO date (YYYY-MM-DD). Empty renders "[effective date]". */
  effectiveDate?: string;
  /** Services disclosed before the code that starts them lands
   *  (see discloseAhead in $lib/privacy/services). */
  discloseAhead?: AheadService[];
};

export type SiteConfig = {
  privacy?: PrivacyConfig;
  nav: {
    logo?: { url: string; maxWidth?: string };
    items: NavItem[];
  };
  footer: {
    socials: FooterSocial[];
    /** Who holds the copyright, e.g. "Roalson Interests". <Footer> supplies the
     *  year at render. Set THIS, not `text`. */
    owner?: string;
    /** The whole rights line, verbatim — only for a line that is not
     *  "© <year> <owner>". It freezes the year it contains. */
    text?: string;
    // Optional footer columns — text, link, or image rows. Absent on the stub.
    columns?: FooterColumn[];
  };
};

/** The checked-in site config (empty on a fresh site). */
export function loadSiteConfig(): SiteConfig {
  return config as SiteConfig;
}

/** Resolve the footer columns for a route: per-route page data wins, else the
 *  site-config defaults. Undefined when neither supplies columns — <Footer>
 *  renders its placeholder. */
export function footerColumns(
  pageColumns: FooterColumn[] | undefined,
  siteConfig: SiteConfig = loadSiteConfig(),
): FooterColumn[] | undefined {
  return pageColumns ?? siteConfig.footer.columns;
}
