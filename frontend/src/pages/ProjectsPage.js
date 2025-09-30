import React, { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";


function ProjectsPage({ me }) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchOwner, setSearchOwner] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [showRecommended, setShowRecommended] = useState(false);

  const handleSearch = () => {
    setSearchTrigger(searchTrigger + 1);
    setShowRecommended(false);
  };

  const handleRecommended = () => {
    setShowRecommended(true);
    setSearchTrigger(searchTrigger + 1);
  };

  return (
    <div>
      <h2>Projects</h2>
      <ProjectForm onCreated={() => {}} />

      {/* Search Block */}
      <div style={{ margin: "32px 0", padding: "16px", background: "#f7fafd", borderRadius: "12px" }}>
        <h3>Search Projects</h3>
        <div style={{ marginBottom: 10, display: "flex", gap: "18px" }}>
          <input
            type="text"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            placeholder="Title"
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", width: "180px" }}
          />
          <input
            type="text"
            value={searchOwner}
            onChange={e => setSearchOwner(e.target.value)}
            placeholder="Owner Name"
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", width: "180px" }}
          />
          <input
            type="text"
            value={searchSkills}
            onChange={e => setSearchSkills(e.target.value)}
            placeholder="Skills Required"
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", width: "180px" }}
          />
        </div>
        <button onClick={handleSearch} style={{ padding: "8px 18px", borderRadius: "6px", background: "#a1c4fd", color: "#2d3a4a", fontWeight: 600 }}>Search</button>
        <button onClick={handleRecommended} style={{ marginLeft: 18, padding: "8px 18px", borderRadius: "6px", background: "#fbc2eb", color: "#2d3a4a", fontWeight: 600 }}>Show Recommended</button>
      </div>

      {/* Project List with search/filter props */}
      <ProjectList
        currentUserId={me._id}
        searchTitle={searchTitle}
        searchOwner={searchOwner}
        searchSkills={searchSkills}
        searchTrigger={searchTrigger}
        showRecommended={showRecommended}
        userSkills={me.skills}
      />
    </div>
  );
}

export default ProjectsPage;
