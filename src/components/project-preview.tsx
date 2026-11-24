import { publicPath } from "@/lib/paths";
import Image from "next/image";
import { Check, Code2, Smartphone, Wrench } from "lucide-react";

export function ProjectPreview({ id }: { id: string }) {
  if (id === "drive")
    return (
      <div className="project-preview preview-drive-report">
        <span className="preview-caption">
          ACTUAL APPLICATION CAPTURES · FINAL FYP REPORT
        </span>
        <div className="report-preview-copy">
          <span>CAMPUS TRANSPORT, CONNECTED.</span>
          <strong>Urban Drive</strong>
          <p>Rider → Driver → Admin</p>
        </div>
        <div className="report-preview-screens">
          <div className="report-phone report-phone-one">
            <Image
              src={publicPath("/projects/urban-drive/rider-dashboard.png")}
              alt="Urban Drive rider dashboard captured in the final FYP report"
              width={438}
              height={974}
              sizes="(max-width: 520px) 110px, 145px"
            />
          </div>
          <div className="report-phone report-phone-two">
            <Image
              src={publicPath("/projects/urban-drive/booking-preview.png")}
              alt="Urban Drive booking preview with route, fare, and passenger package from the final report"
              width={416}
              height={926}
              sizes="(max-width: 520px) 110px, 145px"
            />
          </div>
        </div>
      </div>
    );
  if (id === "steelfit")
    return (
      <div className="project-preview preview-steelfit">
        <span className="preview-caption">
          REPOSITORY ARTWORK · NOT A SCREENSHOT
        </span>
        <Image
          src={publicPath("/projects/steelfit-logo.png")}
          alt="SteelFit gym project logo from its Android repository"
          width={250}
          height={200}
          sizes="(max-width: 520px) 230px, 250px"
          className="steelfit-artwork"
        />
      </div>
    );
  return (
    <div
      className={`project-preview preview-${id}`}
      aria-label="Placeholder for ReadyTech screenshots"
      role="img"
    >
      <span className="preview-caption">
        PLACEHOLDER · SCREENSHOTS TO COME
      </span>
      <div className="readytech-art">
        <div className="readytech-symbol">
          <Wrench size={38} strokeWidth={1.4} />
        </div>
        <strong>ReadyTech</strong>
        <p>From request to resolution.</p>
        <div className="readytech-flow">
          <span>
            <Smartphone size={18} />
            Request
          </span>
          <i />
          <span>
            <Code2 size={18} />
            Match
          </span>
          <i />
          <span>
            <Check size={18} />
            Resolve
          </span>
        </div>
      </div>
    </div>
  );
}
