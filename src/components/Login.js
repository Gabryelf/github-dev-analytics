import React from 'react';

const Login = ({ onLogin }) => {
  const handleLogin = () => {
    const clientId = 'Ov23liJs0okbziaqg2tT';
    const redirectUri = encodeURIComponent('http://localhost:3000/auth');
    const scope = encodeURIComponent('repo user read:org');
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to GitHub Dev Analytics</h2>
        <p>Track and analyze your GitHub development activity</p>
        <button onClick={handleLogin} className="login-button">
          Login with GitHub
        </button>
        <div className="features">
          <h3>Features:</h3>
          <ul>
            <li>📊 Visualize your commit activity</li>
            <li>🎯 Track Issues and Pull Requests</li>
            <li>📈 Analyze coding patterns</li>
            <li>🏆 Set development goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
