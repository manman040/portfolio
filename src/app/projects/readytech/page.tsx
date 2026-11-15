import { projectMetadata, renderProject } from "@/lib/project-page";
export const metadata = projectMetadata("readytech");
export default function Page() {
  return renderProject("readytech");
}
