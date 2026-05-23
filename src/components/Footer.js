import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-inner container">
        <span className="footer-brand">ARICT Portal</span>

        <nav className="footer-links">
          <Link href="/about">Privacy Policy</Link>
          <Link href="/about">Terms of Service</Link>
          <Link href="/about">Contact Support</Link>
          <Link href="/about">About ARICT</Link>
        </nav>

        <span className="footer-copyright">
          © 2024 Association of Rajarata Information &amp; Communication
          Technology. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
