import React, { useState } from "react";
import "./BadgeSelectionPage.css";

const badges = [
  { id: 1, name: "Leader", icon: "🏆" },
  { id: 2, name: "Innovator", icon: "💡" },
  { id: 3, name: "Team Player", icon: "🤝" },
  { id: 4, name: "Problem Solver", icon: "🧩" },
  { id: 5, name: "Achiever", icon: "🎯" },
];

const BadgeSelectionPage = ({ selectedBadges = [], onSelect }) => {
  const [selected, setSelected] = useState(selectedBadges);

  const handleSelect = (badgeId) => {
    let updated;
    if (selected.includes(badgeId)) {
      updated = selected.filter(id => id !== badgeId);
    } else {
      updated = [...selected, badgeId];
    }
    setSelected(updated);
    if (onSelect) onSelect(updated);
  };

  return (
    <div className="badge-selection-container">
      <h2>Select Your Badges</h2>
      <div className="badge-list">
        {badges.map(badge => (
          <div
            key={badge.id}
            className={`badge-card${selected.includes(badge.id) ? " selected" : ""}`}
            onClick={() => handleSelect(badge.id)}
          >
            <span className="badge-icon">{badge.icon}</span>
            <span className="badge-name">{badge.name}</span>
          </div>
        ))}
      </div>
      <div className="badge-feedback">
        {selected.length === 0 ? "No badges selected." : `Selected: ${selected.length}`}
      </div>
    </div>
  );
};

export default BadgeSelectionPage;
