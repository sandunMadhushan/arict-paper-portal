import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Chip from "@/components/Chip";
import RelatedPaperCard from "@/components/RelatedPaperCard";
import { getPaperById, getRelatedPapers, papers } from "@/data/papers";

export async function generateStaticParams() {
  return papers.map((paper) => ({
    id: paper.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const paper = getPaperById(id);
  if (!paper) return { title: "Paper Not Found" };

  return {
    title: `${paper.title} - ${paper.courseCode} | ARICT Portal`,
    description: paper.description,
  };
}

export default async function PaperDetailPage({ params }) {
  const { id } = await params;
  const paper = getPaperById(id);

  if (!paper) {
    notFound();
  }

  const relatedPapers = getRelatedPapers(paper.id);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/search" },
    { label: paper.departmentFull, href: `/search?q=${encodeURIComponent(paper.departmentFull)}` },
    { label: `${paper.courseCode}-${paper.title.split(" ").slice(0, 2).join(" ")}` },
  ];

  return (
    <section className="paper-detail" id="paper-detail">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Detail Card */}
        <div className="paper-detail-card" id="paper-detail-card">
          <div>
            <div className="paper-detail-chips">
              {paper.type && <Chip>{paper.type}</Chip>}
              <Chip>{paper.semester}</Chip>
            </div>

            <h1 className="text-headline-xl paper-detail-title">
              {paper.title}
            </h1>

            <p className="paper-detail-module">
              Module Code: {paper.courseCode}
            </p>

            <div className="paper-detail-meta">
              <div className="paper-detail-meta-item">
                <label>Academic Year</label>
                <span>{paper.year}</span>
              </div>
              <div className="paper-detail-meta-item">
                <label>Department</label>
                <span>{paper.departmentFull}</span>
              </div>
              <div className="paper-detail-meta-item">
                <label>Duration</label>
                <span>{paper.duration}</span>
              </div>
              <div className="paper-detail-meta-item">
                <label>File Size</label>
                <span>{paper.fileSize}</span>
              </div>
            </div>

            <div className="paper-detail-actions">
              <button className="btn btn-primary" id="download-btn">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  download
                </span>
                Download PDF
              </button>
              <button className="btn btn-secondary" id="preview-btn">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  visibility
                </span>
                Preview
              </button>
            </div>
          </div>

          {/* PDF Preview Placeholder */}
          <div className="paper-detail-preview">
            <div className="paper-detail-preview-inner">
              <span className="material-symbols-outlined file-icon">
                description
              </span>
              <div className="file-name">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px", color: "var(--color-primary)" }}
                >
                  picture_as_pdf
                </span>
                {paper.courseCode}.pdf
              </div>
            </div>
          </div>
        </div>

        {/* Related Papers */}
        <div className="related-section" id="related-papers">
          <h2 className="text-headline-md">Related Papers</h2>
          <div className="related-grid">
            {relatedPapers.map((rp) => (
              <RelatedPaperCard key={rp.id} paper={rp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
