import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';

export default function LoginForm({ onAuthed }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user, token } = await login(form);
      localStorage.setItem('token', token);
      onAuthed(user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <h2>Log In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
      <button type="submit">Log in</button>
    </form>
  );
}
