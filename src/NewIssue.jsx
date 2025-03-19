import { useState } from "react";

const NewIssue = ({ setCurrentPage }) => {
  const [issue, setIssue] = useState({ title: "", description: "", ward: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Issue Submitted:", issue);
    setCurrentPage("issues"); // Go back to issues after submitting
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Report a New Issue</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="text" placeholder="Issue Title" className="p-2 border rounded mb-2"
          value={issue.title} onChange={(e) => setIssue({ ...issue, title: e.target.value })} />
        <textarea placeholder="Describe the issue..." className="p-2 border rounded mb-2"
          value={issue.description} onChange={(e) => setIssue({ ...issue, description: e.target.value })}></textarea>
        <input type="text" placeholder="Ward Number" className="p-2 border rounded mb-2"
          value={issue.ward} onChange={(e) => setIssue({ ...issue, ward: e.target.value })} />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit Issue</button>
      </form>
    </div>
  );
};

export default NewIssue;
