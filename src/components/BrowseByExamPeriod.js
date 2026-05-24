"use client";

import Link from "next/link";

export default function BrowseByExamPeriod({
  periods = [],
  linkBase = "/search",
  queryParamName = "years",
}) {
  const hasPeriods = periods.length > 0;
  const buildHref = (period) =>
    `${linkBase}?${queryParamName}=${encodeURIComponent(period)}`;

  return (
    <section className="exam-period-section" id="exam-period-section">
      <div className="exam-period-header">
        <div>
          <h2 className="text-headline-lg">Browse by Examination Period</h2>
          <p className="text-body-md">Filter papers by exam session.</p>
        </div>
      </div>
      <div className="exam-period-grid">
        {hasPeriods ? (
          periods.map((period) => (
            <Link
              key={period}
              className="card exam-period-card"
              href={buildHref(period)}
            >
                <div className="exam-period-card-body">
                  <div className="exam-period-card-avatar">
                    <div className="exam-period-card-avatar-inner">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        calendar_month
                      </span>
                    </div>
                  </div>
                  <h3 className="exam-period-card-title">{period}</h3>
                  <p className="exam-period-card-desc">
                    Past papers grouped by this exam session.
                  </p>
                  <div className="exam-period-card-cta">
                    <span className="exam-period-card-cta-text">Browse papers</span>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "18px" }}
                    >
                      arrow_forward
                    </span>
                  </div>
                </div>
            </Link>
          ))
        ) : (
          <p className="exam-period-empty">No examination periods available.</p>
        )}
      </div>
    </section>
  );
}
