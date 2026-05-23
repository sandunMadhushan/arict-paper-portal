"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const departmentOptions = [
  "Biological Sciences",
  "Chemical Sciences",
  "Computing",
  "Health Promotion",
  "Physical Sciences",
];

const initialForm = {
  subjectCode: "",
  subjectName: "",
  instructor: "",
  year: "",
  department: "",
  driveLink: "",
};

const extractDriveId = (url = "") => {
  if (!url) return "";
  const directMatch = url.match(/\/d\/([^/]+)/);
  if (directMatch) return directMatch[1];
  const paramMatch = url.match(/[?&]id=([^&]+)/);
  if (paramMatch) return paramMatch[1];
  return "";
};

const getPreviewUrl = (url = "") => {
  const id = extractDriveId(url);
  if (id) return `https://drive.google.com/file/d/${id}/preview`;
  if (url && url.toLowerCase().endsWith(".pdf")) return url;
  return "";
};

const getDownloadUrl = (url = "") => {
  const id = extractDriveId(url);
  if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
  return url || "";
};

export default function AddPaperPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const previewUrl = getPreviewUrl(form.driveLink);
  const downloadUrl = getDownloadUrl(form.driveLink);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!form.subjectCode || !form.subjectName || !form.year || !form.department) {
      setStatus({
        type: "error",
        message: "Subject code, subject name, year, and department are required.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        "subject code": form.subjectCode.trim(),
        "subject name": form.subjectName.trim(),
        instructor: form.instructor.trim(),
        year: form.year.trim(),
        "drive link": form.driveLink.trim(),
        department: form.department,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, form.department), payload);
      setStatus({ type: "success", message: "Paper added successfully." });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Failed to add paper.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-page" id="add-paper-page">
      <div className="container">
        <div className="form-header">
          <h1 className="text-headline-lg">Add Paper</h1>
          <p className="text-body-md">
            Add a new past paper to the selected Firestore department.
          </p>
        </div>

        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="subjectCode">Subject Code *</label>
              <input
                id="subjectCode"
                name="subjectCode"
                className="input-field"
                value={form.subjectCode}
                onChange={handleChange}
                placeholder="ICT3214"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="subjectName">Subject Name *</label>
              <input
                id="subjectName"
                name="subjectName"
                className="input-field"
                value={form.subjectName}
                onChange={handleChange}
                placeholder="Mobile Application Development"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="year">Year *</label>
              <input
                id="year"
                name="year"
                className="input-field"
                value={form.year}
                onChange={handleChange}
                placeholder="October | November 2025"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="department">Department *</label>
              <select
                id="department"
                name="department"
                className="input-field"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select department
                </option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="instructor">Instructor</label>
              <input
                id="instructor"
                name="instructor"
                className="input-field"
                value={form.instructor}
                onChange={handleChange}
                placeholder="Ms. A.K.N.L. Aththanagoda"
              />
            </div>
            <div className="form-field">
              <label htmlFor="driveLink">Drive Link</label>
              <input
                id="driveLink"
                name="driveLink"
                className="input-field"
                value={form.driveLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div className="form-field form-field--full">
              <div className="form-preview">
                <div className="form-preview-header">
                  <h3 className="text-headline-sm">PDF Preview</h3>
                  <div className="form-preview-actions">
                    {previewUrl ? (
                      <a
                        className="btn btn-secondary"
                        href={previewUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Preview
                      </a>
                    ) : (
                      <button className="btn btn-secondary" disabled>
                        Open Preview
                      </button>
                    )}
                    {downloadUrl ? (
                      <a
                        className="btn btn-primary"
                        href={downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download PDF
                      </a>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        Download PDF
                      </button>
                    )}
                  </div>
                </div>
                <div className="form-preview-frame">
                  {previewUrl ? (
                    <iframe
                      title="PDF preview"
                      src={previewUrl}
                      loading="lazy"
                      allow="autoplay"
                    />
                  ) : (
                    <div className="form-preview-empty">
                      Add a Drive link to see the PDF preview here.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {status.type !== "idle" && (
            <div className={`form-status form-status--${status.type}`}>
              {status.message}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Add Paper"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
