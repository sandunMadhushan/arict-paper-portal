import Link from "next/link";
import Chip from "./Chip";

export default function RelatedPaperCard({ paper }) {
  return (
    <Link
      href={`/paper/${paper.docId || paper.id}?dept=${encodeURIComponent(
        paper.departmentFull || paper.department || ""
      )}`}
      className="related-card"
      id={`related-${paper.id}`}
    >
      <div className="related-card-header">
        <Chip>{paper.year}</Chip>
        <span className="material-symbols-outlined related-card-download">
          download
        </span>
      </div>
      <h3>{paper.title}</h3>
      <p className="related-card-meta">
        {paper.courseCode} · {paper.semester}
      </p>
    </Link>
  );
}
