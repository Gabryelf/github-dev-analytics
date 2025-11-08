import React, { useState, useEffect } from 'react';
import GitHubService from '../services/githubService';
import CommitChart from './CommitChart';
import RepoList from './RepoList';
import ActivitySummary from './ActivitySummary';

const StatsDashboard = ({ user, repos }) => {
  const [commits, setCommits] = useState([]);
  const [issues, setIssues] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem('github_token');
      const githubService = new GitHubService(token);

      try {
        // Получаем коммиты из последних 10 репозиториев
        const recentRepos = repos.slice(0, 10);
        let allCommits = [];

        for (const repo of recentRepos) {
          const repoCommits = await githubService.getRepoCommits(
            repo.owner.login, 
            repo.name
          );
          allCommits = [...allCommits, ...repoCommits.map(commit => ({
            ...commit,
            repo: repo.name
          }))];
        }

        const userIssues = await githubService.getUserIssues();
        const userPRs = await githubService.getUserIssues(); // Упрощенно

        setCommits(allCommits);
        setIssues(userIssues);
        setPullRequests(userPRs);
      } catch (error) {
        console.error('Error fetching detailed data:', error);
      }
      setLoading(false);
    };

    fetchAllData();
  }, [repos]);

  if (loading) {
    return <div className="loading">Loading your GitHub data...</div>;
  }

  return (
    <div className="dashboard">
      <ActivitySummary 
        commits={commits}
        issues={issues}
        pullRequests={pullRequests}
        repos={repos}
      />
      
      <div className="charts-container">
        <CommitChart commits={commits} />
      </div>

      <RepoList repos={repos} />
    </div>
  );
};

export default StatsDashboard;