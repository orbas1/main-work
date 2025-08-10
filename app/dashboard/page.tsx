"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [view, setView] = useState("Overview");
  const segments = ["Overview", "Reports", "Settings"];

  return (
    <div className="container stack-4" style={{ padding: "32px" }}>
      <div className="window">
        <div className="window__titlebar">
          <div className="window__controls">
            <span className="win-dot win-close"></span>
            <span className="win-dot win-min"></span>
            <span className="win-dot win-zoom"></span>
          </div>
          <div className="window__title">Analytics – Q3 Dashboard</div>
          <div style={{ width: "24px" }}></div>
        </div>
        <div className="window__body">
          <div className="toolbar">
            <div className="segmented" role="group" aria-label="View switch">
              {segments.map((seg) => (
                <button
                  key={seg}
                  className="segmented__btn"
                  aria-pressed={view === seg}
                  onClick={() => setView(seg)}
                >
                  {seg}
                </button>
              ))}
            </div>
            <button className="btn btn--primary">New Widget</button>
          </div>

          <div className="grid-3" style={{ marginTop: "16px" }}>
            <section className="widget">
              <div className="widget__header">
                Revenue
                <span className="pill">FY25</span>
              </div>
              <p className="muted">+12.4% MoM</p>
            </section>

            <section className="widget">
              <div className="widget__header">
                Incidents
                <span className="chip chip--green"><span className="chip-dot"></span> Low</span>
              </div>
              <div className="scroll-area" style={{ maxHeight: "140px" }}>
                <table className="table">
                  <thead>
                    <tr><th>ID</th><th>Owner</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>#1042</td><td>Ops</td><td>Resolved</td></tr>
                    <tr><td>#1043</td><td>Sec</td><td>Investigating</td></tr>
                    <tr><td>#1044</td><td>Ops</td><td>Resolved</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="widget">
              <div className="widget__header">Actions</div>
              <div className="inline-4">
                <button className="btn">Cancel</button>
                <button className="btn btn--ghost">Preview</button>
                <button className="btn btn--primary">Save</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
