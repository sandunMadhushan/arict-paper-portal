import Link from "next/link";

export default function DepartmentCard({ department, index }) {
  const isFirst = index === 0;

  return (
    <Link
      href={`/search?q=${encodeURIComponent(department.name)}`}
      className="card dept-card"
      id={`dept-card-${department.id}`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "both",
      }}
    >
      <div className={`dept-card-icon ${isFirst ? "primary" : "neutral"}`}>
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {department.icon}
        </span>
      </div>
      <h3 className="text-headline-sm">{department.name}</h3>
      <p className="dept-card-meta">
        {department.paperCount.toLocaleString()} Papers ·{" "}
        {department.courseCount} Courses
      </p>
    </Link>
  );
}
