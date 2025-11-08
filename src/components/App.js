import React, { useState, useEffect } from 'react';
import GitHubService from '../services/githubService';
import StatsDashboard from './StatsDashboard';
import Login from './Login';

const App = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const token = localStorage.getItem('github_token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    setLoading(true);
    try {
      const githubService = new GitHubService(token);
      const userData = await githubService.getUser();
      const userRepos = await githubService.getUserRepos();
      
      setUser(userData);
      setRepos(userRepos);
    } catch (error) {
      console.error('Error fetching data:', error);
      localStorage.removeItem('github_token');
    }
    setLoading(false);
  };

  const handleLogin = (token) => {
    localStorage.setItem('github_token', token);
    fetchUserData(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setUser(null);
    setRepos([]);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub Dev Analytics</h1>
        {user && (
          <div className="user-info">
            <img src={user.avatar_url} alt={user.login} width="40" />
            <span>Hello, {user.name || user.login}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <StatsDashboard user={user} repos={repos} />
      )}
    </div>
  );
};

export default App;