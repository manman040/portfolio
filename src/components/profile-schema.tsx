import { portfolio, skills } from "@/data/portfolio";

// Structured data that helps search engines understand this profile.
export function ProfileSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: portfolio.name,
      ...(portfolio.siteUrl ? { url: `${portfolio.siteUrl}/` } : {}),
      description: portfolio.headline,
      homeLocation: { "@type": "Place", name: portfolio.location },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: portfolio.education.institution,
      },
      knowsAbout: skills.flatMap((group) => group.items),
      sameAs: [portfolio.github, portfolio.linkedin].filter(Boolean),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
