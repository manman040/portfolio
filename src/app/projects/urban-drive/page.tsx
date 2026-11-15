import { projectMetadata, renderProject } from "@/lib/project-page";
export const metadata = projectMetadata("urban-drive");
export default function Page() {
  return renderProject("urban-drive");
}
