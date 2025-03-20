import { useState, useRef, useEffect } from "react";
import { Home, Bell, User, FileText, PlusCircle, ArrowUp, X } from "lucide-react";
import NewIssue from "./NewIssue";
import ReportedIssues from "./ReportedIssues";
import axios from "axios"; // Import axios directly

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("issues");
  const [showNotifications, setShowNotifications] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 p-5 flex flex-col gap-4 bg-[#97AC8F] shadow-lg">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setCurrentPage("issues")}
            className={`flex items-center gap-2 p-2 rounded-lg ${currentPage === "issues" ? "bg-[#447b4f]" : ""}`}
          >
            <Home size={20} /> Home
          </button>
          <button
            onClick={() => setCurrentPage("new-issue")}
            className={`flex items-center gap-2 p-2 rounded-lg ${currentPage === "new-issue" ? "bg-[#447b4f]" : ""}`}
          >
            <PlusCircle size={20} /> New Issue
          </button>
          <button
            onClick={() => setCurrentPage("reported-issues")}
            className={`flex items-center gap-2 p-2 rounded-lg ${currentPage === "reported-issues" ? "bg-[#447b4f]" : ""}`}
          >
            <FileText size={20} /> Reported Issues
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#D9D9D9] relative">
        {/* Top Bar */}
        <div className="flex justify-end items-center mb-4 space-x-4">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-full bg-white shadow-md">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
          </button>

          <button className="p-2 rounded-full bg-white shadow-md">
            <User size={20} />
          </button>
        </div>

        {/* Notifications Popup */}
        {showNotifications && (
          <div ref={popupRef} className="absolute top-14 right-6 w-64 bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold">Notifications</h2>
              <button onClick={() => setShowNotifications(false)}>
                <X size={16} />
              </button>
            </div>
            <ul className="text-sm">
              <li className="p-2 border-b">New issue reported in Ward 5</li>
              <li className="p-2 border-b">Streetlights fixed in Ward 8</li>
              <li className="p-2">Garbage collection delayed in Ward 3</li>
            </ul>
          </div>
        )}

        {/* Page Content */}
        {currentPage === "issues" && <Issues />}
        {currentPage === "new-issue" && <NewIssue setCurrentPage={setCurrentPage} />}
        {currentPage === "reported-issues" && <ReportedIssues />}
      </main>
    </div>
  );
};

// Issues Component with Improved Upvote System
const Issues = () => {
  const [issues, setIssues] = useState([]); // State to hold the issues data from MongoDB
  const [hasUpvoted, setHasUpvoted] = useState({}); // To track upvoted issues

  useEffect(() => {
    // Fetch the issues from the backend when the component mounts
    const fetchIssues = async () => {
      try {
        // Make a GET request to your backend API to fetch issues
        const response = await axios.get("http://localhost:5000/api/issues", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add JWT token to headers
          },
        });
        setIssues(response.data); // Set the fetched issues to state
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues(); // Call the function to fetch issues
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleUpvote = (id) => {
    if (!hasUpvoted[id]) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
        )
      );
      setHasUpvoted((prev) => ({ ...prev, [id]: true }));
    }
  };

  const getSeverity = (upvotes) => {
    if (upvotes >= 30) return { level: "Critical", color: "bg-red-500" };
    if (upvotes >= 15) return { level: "Moderate", color: "bg-yellow-500" };
    return { level: "Low", color: "bg-green-500" };
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Ward Issues</h2>
      <div className="flex flex-col gap-4">
        {issues.map((issue) => {
          const severity = getSeverity(issue.upvotes);
          return (
            <div key={issue._id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Issue"
                className="w-24 h-24 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{issue.title}</h3>
                <p className="text-sm text-gray-600">Ward: {issue.ward}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-white text-xs px-2 py-1 rounded ${severity.color}`}
                  >
                    {severity.level}
                  </span>
                </div>
              </div>
              {/* Upvote Button */}
              <button
                onClick={() => handleUpvote(issue._id)}
                disabled={hasUpvoted[issue._id]}
                className={`px-3 py-1 text-sm rounded flex items-center gap-1 ${hasUpvoted[issue._id] ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
              >
                <ArrowUp size={20} />
                <span className="text-lg font-bold">{issue.upvotes}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
