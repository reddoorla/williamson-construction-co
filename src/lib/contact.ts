export const CONTACT_EMAIL = "info@williamson-construction.com";
export const CONTACT_PHONE_DISPLAY = "310.570.7278";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;
export const CONTACT_PHONE_HREF = "tel:3105707278";
export const LICENSE_LINE = "License 976074 SBE 2019518";

export const NAV_LINKS = [
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
  { label: "Join the Team", href: "/join-the-team" },
] as const;

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
