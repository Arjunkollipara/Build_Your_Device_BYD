import React, { useEffect, useState } from "react";
import { getProfileByUserId } from "../api/profileApi";

const ProfileView = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfileByUserId(userId);
      setProfile(res.data);
    };
    fetchProfile();
  }, [userId]);

  if (!profile) return <p>No profile found. Please create one.</p>;

  return (
    <div>
      <h2>{profile.details}</h2>
      <p><strong>Bio:</strong> {profile.bio}</p>
      {profile.avatar && <img src={profile.avatar} alt="avatar" width="100" />}
      <p><strong>Skills:</strong> {profile.skills.join(", ")}</p>
      <p><strong>Achievements:</strong> {profile.achievements.join(", ")}</p>
      <p><a href={profile.links.github}>GitHub</a></p>
      <p><a href={profile.links.linkedin}>LinkedIn</a></p>
      <p><a href={profile.links.portfolio}>Portfolio</a></p>
    </div>
  );
};

export default ProfileView;
