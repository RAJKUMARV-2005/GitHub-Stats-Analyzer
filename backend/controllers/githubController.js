const axios  = require("axios");

const analyzeGitHubProfile = async (req, res) => {
  const { username } = req.params;

  const headers = process.env.GITHUB_TOKEN
    ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    : {};

  try {
    const { data: user }  = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers }
    );

    const { data: repos } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers }
    );

    if (!repos.length)
      return res.json({ message: "User has no public repositories." });

    const totalStars = repos.reduce(
      (sum, r) => sum + r.stargazers_count,
      0
    );

    const mostStarredRepo = repos.reduce(
      (max, r) =>
        r.stargazers_count > max.stargazers_count ? r : max,
      repos[0]
    );

    const languagesUsed = [
      ...new Set(repos.map(r => r.language).filter(Boolean))
    ];

    res.json({
      username:          user.login,
      public_repos:      user.public_repos,
      followers:         user.followers,
      top_language:      mostStarredRepo.language,
      most_starred_repo: {
        name: mostStarredRepo.name,
        stars: mostStarredRepo.stargazers_count,
        url: mostStarredRepo.html_url
      },
      total_stars:       totalStars,
      languages_used:    languagesUsed
    });
  } catch (err) {
    console.error(err.message);
    const status = err.response?.status || 500;
    res.status(status).json({ error: err.response?.data?.message || "GitHub API error" });
  }
};
module.exports = { analyzeGitHubProfile };
