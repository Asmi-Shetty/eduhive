import { FiUpload, FiFileText, FiDownload } from "react-icons/fi";

export default function GroupResources() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center">GroupName and its resources</h1>

      {/* Upload Section */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FiUpload className="text-blue-500" /> Upload New Resource
        </h2>
        <div className="flex gap-2">
          <input type="file" className="block w-full p-2 rounded bg-gray-700 border border-gray-600" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload
          </button>
        </div>
      </div>

      {/* Resources List */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Available Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Example Resource Card */}
          <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiFileText className="text-yellow-400 text-2xl" />
              <div>
                <p className="font-semibold">DSA Notes</p>
                <p className="text-sm text-gray-400">Uploaded by: Alice</p>
              </div>
            </div>
            <a href="#" className="text-blue-400 hover:text-blue-500 flex items-center gap-1">
              <FiDownload /> Download
            </a>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiFileText className="text-green-400 text-2xl" />
              <div>
                <p className="font-semibold">React Guide</p>
                <p className="text-sm text-gray-400">Uploaded by: Bob</p>
              </div>
            </div>
            <a href="#" className="text-blue-400 hover:text-blue-500 flex items-center gap-1">
              <FiDownload /> Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
