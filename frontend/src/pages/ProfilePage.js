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
      <div>
        <h2>Complete Your Profile</h2>
        <ProfileForm me={me} profile={profile} onProfileSaved={handleProfileSaved} />
      </div>
    );
  }

  return (
    <div>
      <h2>My Profile</h2>
      <ProfileView userId={me._id} />
      <button onClick={() => setEditing(true)}>Edit Profile</button>
    </div>
  );
};

export default ProfilePage;