import React, { useState, useEffect } from "react";
import { createOrUpdateProfile } from "../api/profileApi";

const ProfileForm = ({ me, profile, onProfileSaved }) => {
  const [form, setForm] = useState({
    bio: profile?.bio || "",
    avatar: profile?.avatar || "",
    details: profile?.details || "",
    skills: (profile?.skills || []).join(", "),
    github: profile?.links?.github || "",
    linkedin: profile?.links?.linkedin || "",
    portfolio: profile?.links?.portfolio || "",
    achievements: (profile?.achievements || []).join(", "),
  });

  useEffect(() => {
    setForm({
      bio: profile?.bio || "",
      avatar: profile?.avatar || "",
      details: profile?.details || "",
      skills: (profile?.skills || []).join(", "),
      github: profile?.links?.github || "",
      linkedin: profile?.links?.linkedin || "",
      portfolio: profile?.links?.portfolio || "",
      achievements: (profile?.achievements || []).join(", "),
    });
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      userId: me._id,
      bio: form.bio,
      avatar: form.avatar,
      details: form.details,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      links: {
        github: form.github,
        linkedin: form.linkedin,
        portfolio: form.portfolio,
      },
      achievements: form.achievements.split(",").map((a) => a.trim()).filter(Boolean),
    };

    const res = await createOrUpdateProfile(profileData);
    if (onProfileSaved) onProfileSaved(res.data); // notify parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <input name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
      <input name="avatar" placeholder="Avatar URL" value={form.avatar} onChange={handleChange} />
      <input name="details" placeholder="Details" value={form.details} onChange={handleChange} />
      <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
      <input name="github" placeholder="GitHub link" value={form.github} onChange={handleChange} />
      <input name="linkedin" placeholder="LinkedIn link" value={form.linkedin} onChange={handleChange} />
      <input name="portfolio" placeholder="Portfolio link" value={form.portfolio} onChange={handleChange} />
      <input name="achievements" placeholder="Achievements (comma separated)" value={form.achievements} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
