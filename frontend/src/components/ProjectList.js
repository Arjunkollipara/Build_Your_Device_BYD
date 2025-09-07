import React, { useEffect, useState } from 'react';
import { getProjects, joinProject, toggleProject, approveMember, removeMember } from '../api/projectApi';

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
        <ul className="project-list">
          {projects.map(p => {
            // Is current user pending approval?
            const isPending = p.pendingMembers?.some(m => m._id === currentUserId);
            // Is current user already a member?
            const isMember = p.members?.some(m => m._id === currentUserId);
            return (
              <li key={p._id} className="card">
                <strong>{p.title}</strong> — {p.description || 'No description'}
                <div>Skills: {p.requiredSkills?.join(', ') || '—'}</div>
                <div>Owner: {p.owner?.name} | Members: {p.members?.length || 0} | Status: {p.isOpen ? 'Open' : 'Closed'}</div>

                {/* Pending members list for owner */}
                {p.owner?._id === currentUserId && p.pendingMembers && p.pendingMembers.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <strong>Pending Approvals:</strong>
                    <ul>
                      {p.pendingMembers.map(pm => (
                        <li key={pm._id}>
                          {pm.name} ({pm.email})
                          <button style={{ marginLeft: 8 }} onClick={async () => { await approveMember(p._id, pm._id); fetchProjects(); }}>Approve</button>
                          <button style={{ marginLeft: 4 }} onClick={async () => { await removeMember(p._id, pm._id); fetchProjects(); }}>Decline</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Show 'Waiting for approval' for current user if pending */}
                {isPending && !isMember && (
                  <div style={{ color: '#e67e22', marginTop: 8 }}><em>Waiting for approval</em></div>
                )}

                <div style={{ marginTop: 4 }}>
                  {/* Show Join button only if not already member or pending */}
                  {p.isOpen && !isMember && !isPending && <button onClick={() => handleJoin(p._id)}>Join</button>}
                  {/* Only show Close/Re-open button for owner */}
                  {p.owner?._id === currentUserId && (
                    <button onClick={() => handleToggle(p._id)} style={{ marginLeft: 8 }}>
                      {p.isOpen ? 'Close' : 'Re-open'}
                    </button>
                  )}
                  {/* Owner can remove members */}
                  {p.owner?._id === currentUserId && p.members && p.members.length > 1 && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Members:</strong>
                      <ul>
                        {p.members.filter(m => m._id !== p.owner._id).map(m => (
                          <li key={m._id}>
                            {m.name} ({m.email})
                            <button style={{ marginLeft: 8 }} onClick={async () => { await removeMember(p._id, m._id); fetchProjects(); }}>Remove</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
