const ReportedIssues = () => {
    const issues = [
      { id: 1, title: "Potholes in main street", ward: "Ward 3", status: "Pending" },
      { id: 2, title: "Overflowing garbage bins", ward: "Ward 5", status: "Resolved" },
    ];
  
    return (
      <div className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Reported Issues</h1>
        <div>
          {issues.map((issue) => (
            <div key={issue.id} className="p-3 border-b">
              <h3 className="font-bold">{issue.title}</h3>
              <p className="text-sm">Ward: {issue.ward}</p>
              <p className={`text-sm ${issue.status === "Resolved" ? "text-green-500" : "text-red-500"}`}>
                Status: {issue.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ReportedIssues;
  