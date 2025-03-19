import { useState, useRef, useEffect } from "react";
import { Home, Bell, User, FileText, PlusCircle, ArrowUp, X } from "lucide-react";
import NewIssue from "./NewIssue";
import ReportedIssues from "./ReportedIssues";

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
      <aside className="w-64 p-5 flex flex-col gap-4 bg-[#839281] shadow-lg">
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
      <main className="flex-1 p-6 bg-gray-100 relative">
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
  const [issues, setIssues] = useState([
    { id: 1, title: "Broken Road, please repair", upvotes: 32, ward: "Ward 5" },
    { id: 2, title: "Streetlights not working", upvotes: 12, ward: "Ward 8" },
    { id: 3, title: "Garbage collection delayed", upvotes: 18, ward: "Ward 3" },
  ]);

  const [hasUpvoted, setHasUpvoted] = useState({});

  const handleUpvote = (id) => {
    if (!hasUpvoted[id]) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
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
            <div key={issue.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
              <img src="https://via.placeholder.com/100" alt="Issue" className="w-24 h-24 rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{issue.title}</h3>
                <p className="text-sm text-gray-600">Ward: {issue.ward}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-white text-xs px-2 py-1 rounded ${severity.color}`}>{severity.level}</span>
                </div>
              </div>
              {/* Upvote Button */}
              <button
                onClick={() => handleUpvote(issue.id)}
                disabled={hasUpvoted[issue.id]}
                className={`px-3 py-1 text-sm rounded flex items-center gap-1 ${hasUpvoted[issue.id] ? "text-gray-400 cursor-not-allowed" : "text-blue-600"}`}
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
