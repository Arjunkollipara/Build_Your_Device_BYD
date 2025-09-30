
const ProfileView = ({ profile }) => {
  if (!profile) return <p>No profile found. Please create one.</p>;

  return (
    <div>
      {/* Hero/banner image at top */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        alt="LinkedIn Banner"
        className="profile-banner-img"
        style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "18px 18px 0 0", marginBottom: "-60px" }}
      />
      {/* Profile avatar below hero image */}
      {profile.avatar && (
        <img src={profile.avatar} alt="avatar" className="profile-avatar-anim" />
      )}
      <h2>{profile.details}</h2>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Skills:</strong> {profile.skills?.join(", ")}</p>
      <p><strong>Achievements:</strong> {profile.achievements?.join(", ")}</p>
      <div className="profile-social-links">
        {profile.links?.github && (
          <a className="profile-social-link" href={profile.links.github} target="_blank" rel="noopener noreferrer" title="GitHub">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2v3.26c0 .31.21.67.8.56A10.99 10.99 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>
          </a>
        )}
        {profile.links?.linkedin && (
          <a className="profile-social-link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#0077B5" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-3v-10h3v1.5c.41-.59 1.09-1.5 2.5-1.5 1.93 0 3.5 1.57 3.5 3.5v6.5z"/></svg>
          </a>
        )}
        {profile.links?.portfolio && (
          <a className="profile-social-link" href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" title="Portfolio">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
