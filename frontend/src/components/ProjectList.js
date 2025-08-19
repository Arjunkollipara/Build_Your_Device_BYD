import React, { useEffect, useState } from 'react';
import { getProjects, joinProject, toggleProject } from '../api/projectApi';

const ProjectList = ({ currentUserId }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleJoin = async (id) => {
    await joinProject(id, currentUserId);
    fetchProjects();
  };

  const handleToggle = async (id) => {
    await toggleProject(id);
    fetchProjects();
  };

  return (
    <div>
      <h2>Projects</h2>
      {projects.length === 0 ? <p>No projects yet.</p> : (
        <ul>
          {projects.map(p => (
            <li key={p._id} style={{ marginBottom: 8 }}>
              <strong>{p.title}</strong> — {p.description || 'No description'}
              <div>Skills: {p.requiredSkills?.join(', ') || '—'}</div>
              <div>Owner: {p.owner?.name} | Members: {p.members?.length || 0} | Status: {p.isOpen ? 'Open' : 'Closed'}</div>
              <div style={{ marginTop: 4 }}>
                {p.isOpen && <button onClick={() => handleJoin(p._id)}>Join</button>}
                <button onClick={() => handleToggle(p._id)} style={{ marginLeft: 8 }}>
                  {p.isOpen ? 'Close' : 'Re-open'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
