import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Analytics.css';

// Sample data - replace with API data
const clickData = [
  { date: '2024-01-21', clicks: 1234 },
  { date: '2024-01-20', clicks: 1140 },
  { date: '2024-01-19', clicks: 134 },
  { date: '2024-01-18', clicks: 34 },
];

const deviceData = [
  { type: 'Mobile', percentage: 64, color: '#2563eb' },
  { type: 'Desktop', percentage: 32, color: '#3b82f6' },
  { type: 'Tablet', percentage: 4, color: '#60a5fa' },
];

const browserData = [
  { name: 'Chrome', percentage: 58 },
  { name: 'Safari', percentage: 22 },
  { name: 'Firefox', percentage: 12 },
  { name: 'Edge', percentage: 8 },
];

const Analytics = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics Overview</h1>
      
      {/* Date-wise Clicks Chart */}
      <div className="chart-container">
        <h2>Clicks Over Time</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clickData}>
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b' }}
              />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="clicks" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Device & Browser Breakdown */}
      <div className="breakdown-grid">
        {/* Device Distribution */}
        <div className="breakdown-card">
          <h2>Device Distribution</h2>
          <div className="device-list">
            {deviceData.map((device, index) => (
              <div key={index} className="device-item">
                <div className="device-header">
                  <span>{device.type}</span>
                  <span>{device.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${device.percentage}%`,
                      backgroundColor: device.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Breakdown */}
        <div className="breakdown-card">
          <h2>Browser Usage</h2>
          <div className="browser-list">
            {browserData.map((browser, index) => (
              <div key={index} className="browser-item">
                <span>{browser.name}</span>
                <div className="browser-percentage">
                  <div 
                    className="percentage-bar" 
                    style={{ width: `${browser.percentage}%` }}
                  ></div>
                  <span>{browser.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          className="pagination-btn" 
          onClick={() => setCurrentPage(p => Math.max(1, p-1))}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button 
          className="pagination-btn" 
          onClick={() => setCurrentPage(p => p+1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Analytics;