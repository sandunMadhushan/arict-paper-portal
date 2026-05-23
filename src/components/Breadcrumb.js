import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb" id="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {index > 0 && (
              <span
                className="material-symbols-outlined separator"
                style={{ fontSize: "18px" }}
              >
                chevron_right
              </span>
            )}
            {isLast ? (
              <span className="current">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
