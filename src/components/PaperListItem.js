import Link from "next/link";
import Chip from "./Chip";

export default function PaperListItem({ paper }) {
  return (
    <div className="paper-list-item" id={`paper-list-${paper.id}`}>
      <div className="paper-list-item-code">{paper.courseCode}</div>
      <div className="paper-list-item-content">
        <h3>{paper.title}</h3>
        <div className="paper-list-item-chips">
          <Chip icon="calendar_today">{paper.year}</Chip>
          <Chip>{paper.department}</Chip>
          {paper.type && <Chip variant="accent">{paper.type}</Chip>}
          {paper.difficulty && (
            <Chip icon="bar_chart">{paper.difficulty}</Chip>
          )}
          {paper.duration && (
            <Chip icon="schedule">{paper.duration}</Chip>
          )}
          {paper.isRestricted && (
            <Chip icon="lock">Restricted</Chip>
          )}
        </div>
        {paper.description && (
          <p className="paper-list-item-description">{paper.description}</p>
        )}
      </div>
      <div className="paper-list-item-action">
        <Link
          href={`/paper/${paper.docId || paper.id}?dept=${encodeURIComponent(
            paper.departmentFull || paper.department || ""
          )}`}
          className="btn btn-secondary"
          id={`list-view-details-${paper.id}`}
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
