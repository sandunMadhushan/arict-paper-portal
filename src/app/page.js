import SearchBar from "@/components/SearchBar";
import DepartmentCard from "@/components/DepartmentCard";
import { departments } from "@/data/departments";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Search Section */}
      <section className="hero" id="hero-section">
        <div className="hero-pattern" />
        <div className="container hero-content">
          <span className="hero-badge">Past Paper Archive</span>
          <h1 className="text-headline-xl">
            Access Years of Academic Excellence
          </h1>
          <p className="text-body-lg hero-subtitle">
            Search through thousands of past examination papers, meticulously
            organized by department and course for ARICT students.
          </p>
          <SearchBar />
          <div className="hero-popular">
            <span>Popular:</span>
            <Link href="/search?q=ICT101">ICT101</Link>
            <Link href="/search?q=NET204">NET204</Link>
            <Link href="/search?q=DBM302">DBM302</Link>
          </div>
        </div>
      </section>

      {/* Browse by Department */}
      <section className="department-section" id="departments-section">
        <div className="container">
          <div className="department-header">
            <div>
              <h2 className="text-headline-lg">Browse by Department</h2>
              <p className="text-body-md">
                Explore resources organized by academic faculties.
              </p>
            </div>
            <Link href="/search" className="view-all">
              View all{" "}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="department-grid">
            {departments.map((dept, index) => (
              <DepartmentCard
                key={dept.id}
                department={dept}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
