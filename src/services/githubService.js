class GitHubService {
    constructor(token) {
      this.token = token;
      this.baseURL = 'https://api.github.com';
    }
  
    async request(endpoint) {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
  
      return response.json();
    }
  
    async getUser() {
      return this.request('/user');
    }
  
    async getUserRepos() {
      return this.request('/user/repos?sort=updated&per_page=100');
    }
  
    async getRepoCommits(owner, repo) {
      return this.request(`/repos/${owner}/${repo}/commits?per_page=100`);
    }
  
    async getUserIssues() {
      return this.request('/user/issues?filter=all&state=all');
    }
  
    async getPullRequests(owner, repo) {
      return this.request(`/repos/${owner}/${repo}/pulls?state=all&per_page=100`);
    }
  }
  
  export default GitHubService;