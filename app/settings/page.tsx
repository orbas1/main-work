"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [show, setShow] = useState(false);

  const handleSave = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <div className="container stack-4" style={{ padding: "32px" }}>
      <div className="window">
        <div className="window__titlebar">
          <div className="window__controls">
            <span className="win-dot win-close"></span>
            <span className="win-dot win-min"></span>
            <span className="win-dot win-zoom"></span>
          </div>
          <div className="window__title">Settings</div>
          <div style={{ width: "24px" }}></div>
        </div>
        <div className="window__body stack-4">
          <label>
            Name
            <input className="input" type="text" placeholder="Acme Inc." />
          </label>
          <label>
            Plan
            <select className="select">
              <option>Free</option>
              <option>Pro</option>
            </select>
          </label>
          <label>
            Bio
            <textarea className="textarea" rows={4} placeholder="Company bio"></textarea>
          </label>
          <div className="inline-4">
            <span className="pill">v1.0</span>
            <span className="chip chip--green"><span className="chip-dot"></span> Active</span>
            <span className="chip chip--red"><span className="chip-dot"></span> Paused</span>
          </div>
          <button className="btn btn--primary" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
      {show && <div className="toast" role="status">Settings saved</div>}
    </div>
  );
}
