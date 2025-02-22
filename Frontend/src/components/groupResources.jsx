import { useEffect, useState } from "react";
import { FiUpload, FiFileText } from "react-icons/fi";

export default function GroupResources() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchResources = async () => {
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        console.error("User ID not found in localStorage.");
        return;
      }
      console.log("Fetching resources for user ID:", id);
      const response = await fetch(`http://localhost:6471/api/notes/${id}`);
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleUpload = async () => {
    if (!title || !content) {
      alert("Please enter both title and content.");
      return;
    }

    const newNote = {
      userId: localStorage.getItem("userId"),
      title,
      content,
    };

    try {
      const response = await fetch("http://localhost:6471/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) throw new Error("Failed to upload note.");

      setTitle("");
      setContent("");

      alert("Note uploaded successfully!");

      // Fetch updated resources
      fetchResources();
    } catch (error) {
      console.error("Error uploading note:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Group Resources</h1>

      
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FiUpload className="text-blue-500" /> Upload New Note
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
          />
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full p-2 rounded bg-gray-700 border border-gray-600 text-white h-24"
          />
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>

      
      <div>
        <h2 className="text-lg font-semibold mb-3">Available Notes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <div key={resource._id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiFileText className="text-yellow-400 text-2xl" />
                  <div>
                    <p className="font-semibold">{resource.title}</p>
                    <p className="text-sm text-gray-400">{resource.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
