import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.scss';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.error || 'Registration failed';
      alert(msg);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        <p>Already have an account?</p>
        <button className="login-button" type="button" onClick={() => navigate('/login')}>Login</button>
      </form>
      <div className="divider">
        <h1>The <span>Glen</span></h1>
      </div>
    </div>
  );
};

export default Register;
