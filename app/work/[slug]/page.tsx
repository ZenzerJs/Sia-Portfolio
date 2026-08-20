import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { getProject, projects } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: `Work - ${siteConfig.name}` };
  return {
    title: `${project.title} - ${siteConfig.name}`,
    description: project.heroDescription,
  };
}

export default async function CaseStudyPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyPage project={project} />;
}
