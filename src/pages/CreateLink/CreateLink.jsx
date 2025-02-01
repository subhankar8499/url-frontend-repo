import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import './CreateLink.css';

const CreateLink = () => {
  const { id } = useParams();
  const [originalUrl, setOriginalUrl] = useState('');
  const [remarks, setRemarks] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // For edit mode (Screenshot 17)
  useEffect(() => {
    if (id) {
      const fetchLink = async () => {
        try {
          const res = await axios.get(`/api/urls/${id}`, {
            headers: { Authorization: `Bearer ${user?.token}` }
          });
          setOriginalUrl(res.data.originalUrl);
          setRemarks(res.data.remarks || '');
          setExpiresAt(res.data.expiresAt?.split('T')[0] || '');
        } catch (err) {
          toast.error('Failed to load link details');
        }
      };
      fetchLink();
    }
  }, [id, user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) {
      toast.error('Destination URL is required!'); // Screenshot 16
      return;
    }

    try {
      const payload = { originalUrl, remarks, expiresAt };
      
      if (id) {
        // Edit existing link
        await axios.patch(`/api/urls/${id}`, payload, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        toast.success('Link updated successfully!');
      } else {
        // Create new link
        await axios.post('/api/urls', payload, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        toast.success('Link created successfully!');
      }
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleClear = () => {
    setOriginalUrl('');
    setRemarks('');
    setExpiresAt('');
  };

  return (
    <div className="create-link-container">
      <h2>{id ? 'Edit Link' : 'Create New Link'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Destination URL *</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Remarks</label>
          <input
            type="text"
            placeholder="Add campaign notes (optional)"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Expiration Date</label>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="secondary-btn"
            onClick={handleClear}
          >
            Clear
          </button>
          <button type="submit" className="primary-btn">
            {id ? 'Save Changes' : 'Create Link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLink;