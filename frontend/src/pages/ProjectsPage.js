import React from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

function ProjectsPage({ me }) {
  return (
    <div>
      <h2>Projects</h2>
      <ProjectForm onCreated={() => {}} />
      <ProjectList currentUserId={me._id} />
    </div>
  );
}

export default ProjectsPage;
