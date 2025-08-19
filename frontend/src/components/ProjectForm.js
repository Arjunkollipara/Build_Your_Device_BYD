import React, { useState } from 'react';
import { createProject } from '../api/projectApi';

const ProjectForm = ({ ownerId, onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState(''); // comma-separated

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredSkills = skills.split(',').map(s => s.trim()).filter(Boolean);
    const payload = { title, description, requiredSkills, ownerId };
    const res = await createProject(payload);
    setTitle(''); setDescription(''); setSkills('');
    onCreated && onCreated(res.data);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input placeholder="Project title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Short description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input placeholder="Required skills (comma-separated)" value={skills} onChange={e=>setSkills(e.target.value)} />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
