import React, { useEffect, useState } from "react";
import { getProjects, approveMember, removeMember } from "../api/projectApi";
import { useNavigate } from "react-router-dom";
import "./OwnerApprovalPage.css";

const OwnerApprovalPage = ({ me }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError("");
      try {
        const res = await getProjects();
        setProjects(res.data.filter(p => p.owner?._id === me._id));
      } catch (err) {
        setError("Failed to fetch projects");
      }
      setLoading(false);
    }
    fetchProjects();
  }, [me]);

  const handleApprove = async (projectId, userId) => {
    setError("");
    try {
      await approveMember(projectId, userId);
      const res = await getProjects();
      setProjects(res.data.filter(p => p.owner?._id === me._id));
    } catch (err) {
      setError("Failed to approve member");
    }
  };

  const handleDecline = async (projectId, userId) => {
    setError("");
    try {
      await removeMember(projectId, userId);
      const res = await getProjects();
      setProjects(res.data.filter(p => p.owner?._id === me._id));
    } catch (err) {
      setError("Failed to decline member");
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="owner-approval-container">
      <div className="owner-approval-title">Pending Approvals for Your Projects</div>
      {loading ? <p>Loading...</p> : null}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {projects.length === 0 ? <p className="project-list-empty">No projects found.</p> : (
        <div>
          {projects.map(project => (
            <div key={project._id} className="owner-project-card">
              <div className="owner-project-header">
                <h3>{project.title}</h3>
                <div>{project.description}</div>
              </div>
              <div className="owner-project-body">
                <div className="owner-pending-label">Pending Members</div>
                {project.pendingMembers?.length === 0 ? (
                  <div className="owner-no-pending">No pending requests.</div>
                ) : (
                  <div className="owner-pending-cards">
                    {project.pendingMembers.map((user, idx) => (
                      <div key={user._id} className="owner-pending-card">
                        {user.avatar ? (
                          <img src={user.avatar} alt="avatar" className="owner-pending-avatar" />
                        ) : (
                          <div className="owner-pending-avatar owner-pending-initial">{user.name[0]}</div>
                        )}
                        <div className="owner-pending-name">{user.name}</div>
                        <div className="owner-pending-details">
                          <div className="owner-pending-email">{user.email}</div>
                          <div className="owner-pending-actions">
                            <button className="owner-approval-btn" onClick={() => handleViewProfile(user._id)}>View Profile</button>
                            <button className="owner-approval-btn" onClick={() => handleApprove(project._id, user._id)}>Approve</button>
                            <button className="owner-approval-btn" onClick={() => handleDecline(project._id, user._id)}>Decline</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerApprovalPage;
