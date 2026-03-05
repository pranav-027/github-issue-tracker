import { useState, useEffect } from "react";
import IssueInput from "./components/IssueInput";
import Board from "./components/Board";
import "./App.css";

const STORAGE_KEY = "github-issue-board-data";

function App() {
  // Load issues from localStorage on initial render
  const [issues, setIssues] = useState(() => {
    try {
      const savedIssues = localStorage.getItem(STORAGE_KEY);
      return savedIssues ? JSON.parse(savedIssues) : [];
    } catch (error) {
      console.error("Failed to load issues from localStorage:", error);
      return [];
    }
  });

  // Save issues to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
    } catch (error) {
      console.error("Failed to save issues to localStorage:", error);
    }
  }, [issues]);

  const addIssue = (issue) => {
    setIssues([
      ...issues,
      { ...issue, id: Date.now().toString(), status: "To Start" },
    ]);
  };

  const moveIssue = (issueId, newStatus) => {
    setIssues(
      issues.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue,
      ),
    );
  };

  const clearAllIssues = () => {
    if (window.confirm("Are you sure you want to clear all issues?")) {
      setIssues([]);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Github Issue Tracker
          </h1>
          {issues.length > 0 && (
            <button
              onClick={clearAllIssues}
              className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'
            >
              Clear All Issues
            </button>
          )}
        </div>
        <IssueInput onAddIssue={addIssue} />
        <Board issues={issues} onMoveIssue={moveIssue} />
      </div>
    </div>
  );
}

export default App;
