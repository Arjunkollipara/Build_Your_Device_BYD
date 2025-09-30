import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import ProfileView from "../components/ProfileView";
import { getProfileByUserId } from "../api/profileApi";

function isProfileComplete(profile) {
  return profile && profile.bio && profile.bio.trim() !== "" && profile.skills && profile.skills.length > 0;
}

const ProfilePage = ({ me, onProfileUpdated }) => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getProfileByUserId(me._id);
        setProfile(res.data);
        setEditing(!isProfileComplete(res.data));
      } catch {
        setProfile(null);
        setEditing(true);
      }
    }
    fetchProfile();
  }, [me]);

  const handleProfileSaved = (newProfile) => {
    setProfile(newProfile);
    setEditing(false);
    // If profile is now complete, refresh user info in App.js
    if (isProfileComplete(newProfile) && onProfileUpdated) {
      onProfileUpdated();
      navigate("/projects");
    }
  };

  if (editing) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
        <h2 style={{ color: "#2d3a4a" }}>Please fill in your profile details</h2>
        <p style={{ color: "#4a5a6a", marginBottom: 24 }}>
          To access all features, complete your profile with your bio and skills. This helps us recommend the best projects for you!
        </p>
        <ProfileForm me={me} profile={profile} onProfileSaved={handleProfileSaved} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: 40, maxWidth: 480, width: "100%", textAlign: "center" }}>
        {/* Avatar */}
        <div style={{ marginBottom: 24 }}>
          {me.avatar ? (
            <img src={me.avatar} alt="avatar" style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }} />
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "#e0eafc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, color: "#2d3a4a", margin: "0 auto", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
              {me.name ? me.name[0] : "?"}
            </div>
          )}
        </div>
        <h2 style={{ color: "#2d3a4a", marginBottom: 8 }}>My Profile</h2>
        <div style={{ color: "#4a5a6a", fontSize: "1.1rem", marginBottom: 18 }}>{me.email}</div>
        <ProfileView userId={me._id} />
        <div style={{ marginTop: 32 }}>
          <button onClick={() => setEditing(true)} style={{ marginRight: 12, padding: "10px 28px", borderRadius: 8, background: "#a1c4fd", color: "#2d3a4a", fontWeight: 600, border: "none", fontSize: "1rem" }}>Edit Profile</button>
          <button onClick={() => navigate("/projects")} style={{ padding: "10px 28px", borderRadius: 8, background: "#fbc2eb", color: "#2d3a4a", fontWeight: 600, border: "none", fontSize: "1rem" }}>Go to Projects</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;