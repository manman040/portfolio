import { projectMetadata, renderProject } from "@/lib/project-page";
export const metadata = projectMetadata("steelfit");
export default function Page() {
  return renderProject("steelfit");
}
