import React, { useState } from 'react';
import { signup } from '../../api/authApi';

export default function SignupForm({ onAuthed }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user, token } = await signup(form);
      localStorage.setItem('token', token);
      onAuthed(user);
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
      <button type="submit">Create account</button>
    </form>
  );
}
