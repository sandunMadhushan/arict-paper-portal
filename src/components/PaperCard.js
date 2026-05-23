import Link from "next/link";
import Chip from "./Chip";

export default function PaperCard({ paper }) {
  return (
    <div className="card paper-card" id={`paper-card-${paper.id}`}>
      <div>
        <div className="paper-card-chips">
          <Chip icon="calendar_today">{paper.year}</Chip>
          <Chip>{paper.department}</Chip>
          {paper.type && <Chip variant="accent">{paper.type}</Chip>}
          {paper.isRestricted && (
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "18px",
                color: "var(--color-secondary)",
                alignSelf: "center",
              }}
            >
              lock
            </span>
          )}
        </div>
        <div className="paper-card-code">{paper.courseCode}</div>
        <h3>{paper.title}</h3>
        {paper.description && (
          <p className="paper-card-description">{paper.description}</p>
        )}
      </div>
      <div className="paper-card-footer">
        <Link
          href={`/paper/${paper.id}`}
          className="btn btn-secondary"
          id={`view-details-${paper.id}`}
        >
          View Details
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "18px" }}
          >
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
