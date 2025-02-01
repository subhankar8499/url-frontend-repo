import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">Cuvette</Link>
        {user ? (
          <div className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}