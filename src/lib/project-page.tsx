import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { portfolio } from "@/data/portfolio";
import { shareImage } from "@/lib/share-image";
import { CaseStudy } from "@/components/case-study";

export function projectMetadata(slug: string): Metadata {
  const project = projects.find((project) => project.slug === slug);
  if (!project) return {};
  const title = `${project.title} | ${portfolio.name}`;
  const url = portfolio.siteUrl
    ? `${portfolio.siteUrl}/projects/${slug}/`
    : undefined;
  return {
    title,
    description: project.description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title,
      description: project.description,
      type: "article",
      images: [shareImage],
      ...(url ? { url } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [shareImage],
    },
  };
}

export function renderProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) notFound();
  return (
    <CaseStudy
      project={projects[index]}
      nextProject={projects[(index + 1) % projects.length]}
    />
  );
}
