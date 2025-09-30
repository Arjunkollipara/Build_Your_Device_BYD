import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
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
    <div className="profile-page-bg">
      {/* Animated background shapes */}
      <div className="profile-bg-shapes">
        <div className="profile-bg-shape1" />
        <div className="profile-bg-shape2" />
        <div className="profile-bg-shape3" />
      </div>
      <div className="profile-card-anim">
        {/* ProfileView and buttons go here */}
        <ProfileView profile={profile} />
        <div style={{ marginTop: 32 }}>
          <button className="profile-btn-anim" onClick={() => setEditing(true)} style={{ marginRight: 12, padding: "10px 28px", borderRadius: 8, background: "#a1c4fd", color: "#2d3a4a", fontWeight: 600, border: "none", fontSize: "1rem" }}>Edit Profile</button>
          <button className="profile-btn-anim" onClick={() => navigate("/projects")} style={{ padding: "10px 28px", borderRadius: 8, background: "#fbc2eb", color: "#2d3a4a", fontWeight: 600, border: "none", fontSize: "1rem" }}>Go to Projects</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;