import { useState } from "react";

function IssueInput({ onAddIssue }) {
  const [issueUrl, setIssueUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const parseGitHubUrl = (url) => {
    // Parse GitHub issue URL format: https://github.com/owner/repo/issues/123
    const regex = /github\.com\/([^\/]+)\/([^\/]+)\/issues\/(\d+)/;
    const match = url.match(regex);

    if (match) {
      return {
        owner: match[1],
        repo: match[2],
        issueNumber: match[3],
      };
    }
    return null;
  };

  const fetchIssue = async () => {
    if (!issueUrl.trim()) {
      setError("Please enter a GitHub issue URL");
      return;
    }

    const parsed = parseGitHubUrl(issueUrl);
    if (!parsed) {
      setError(
        "Invalid GitHub issue URL. Format: https://github.com/owner/repo/issues/123",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/issues/${parsed.issueNumber}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch issue");
      }

      const data = await response.json();

      onAddIssue({
        title: data.title,
        number: data.number,
        url: data.html_url,
        state: data.state,
        author: data.user.login,
        authorAvatar: data.user.avatar_url,
        createdAt: new Date(data.created_at).toLocaleDateString(),
        labels: data.labels.map((label) => label.name),
        repository: `${parsed.owner}/${parsed.repo}`,
      });

      setIssueUrl("");
    } catch (err) {
      setError("Failed to fetch issue. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchIssue();
  };

  return (
    <div className='mb-8 bg-white rounded-lg shadow-md p-6'>
      <form onSubmit={handleSubmit} className='flex gap-4'>
        <div className='flex-1'>
          <input
            type='text'
            value={issueUrl}
            onChange={(e) => setIssueUrl(e.target.value)}
            placeholder='Enter GitHub issue URL (e.g., https://github.com/owner/repo/issues/123)'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            disabled={loading}
          />
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </div>
        <button
          type='submit'
          disabled={loading}
          className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'
        >
          {loading ? "Loading..." : "Add Issue"}
        </button>
      </form>
    </div>
  );
}

export default IssueInput;
