import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../context/AuthContext';
import UrlItem from '../../components/UrlItem/UrlItem';
import './Dashboard.css';

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  // Updated fetchUrls function with search and pagination parameters
  const fetchUrls = async (currentPage = 1, searchText = '') => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/urls`, {
        headers: { Authorization: `Bearer ${user?.token}` },
        params: {
          page: currentPage,
          limit: 10,
          search: searchText,
        }
      });
      // Assuming the backend returns an object: { urls, total, page, pages }
      setUrls(res.data.urls);
      setPage(res.data.page);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  // Fetch URLs when the user, page, or searchTerm changes
  useEffect(() => {
    if (user) {
      fetchUrls(page, searchTerm);
    }
  }, [user, page, searchTerm]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when search term changes
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  // Dummy functions for edit/delete actions (update with your actual handlers)
  const handleEdit = (id) => {
    console.log('Edit URL with id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete URL with id:', id);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Good morning, {user?.name}</h1>
        <a href="/create" className="create-btn">+ New Link</a>
      </div>
      
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search URLs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* URL Table */}
      <div className="urls-table">
        <div className="table-header">
          <div>Original Link</div>
          <div>Short Link</div>
          <div>Clicks</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {urls.map(url => (
          <UrlItem 
            key={url._id}
            original={url.originalUrl}
            short={`https://cuvette/${url.shortCode}`}
            clicks={url.clicks?.length || 0}
            expiresAt={url.expiresAt}
            onEdit={() => handleEdit(url._id)}
            onDelete={() => handleDelete(url._id)}
          />
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
