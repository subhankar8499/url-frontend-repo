import { useAuth } from '../../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Account Settings</h2>
        
        <div className="user-info">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{user?.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Mobile:</span>
            <span className="info-value">+91 9876543210</span>
          </div>
        </div>

        <div className="upgrade-section">
          <h3>Unlock Premium Features</h3>
          <p>Upgrade your plan for advanced analytics and custom domains</p>
          <button className="upgrade-btn">Upgrade Now →</button>
        </div>

        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <button className="delete-btn">Delete Account</button>
        </div>
      </div>
    </div>
  );
}