import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import './UrlItem.css';

const UrlItem = ({ original, short, clicks, expiresAt, url, onDelete }) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const isActive = new Date(expiresAt) > new Date();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(short);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="url-item">
      <div className="url-cell original-url">
        <a href={original} target="_blank" rel="noopener noreferrer">
          {original.length > 40 ? `${original.substring(0, 40)}...` : original}
        </a>
      </div>
      
      <div className="url-cell short-url">
        <span>{short}</span>
        <button 
          className={`copy-btn ${isCopied ? 'copied' : ''}`}
          onClick={copyToClipboard}
        >
          {isCopied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <div className="url-cell clicks">
        {clicks}
      </div>

      <div className="url-cell status">
        <span className={`status-badge ${isActive ? 'active' : 'expired'}`}>
          {isActive ? 
            `Expires in ${formatDistanceToNow(new Date(expiresAt))}` : 
            'Expired'
          }
        </span>
      </div>

      <div className="url-cell actions">
        {/* Edit button updated to use navigate */}
        <button className="edit-btn" onClick={() => navigate(`/edit/${url._id}`)}>Edit</button>
        <button className="delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UrlItem;
