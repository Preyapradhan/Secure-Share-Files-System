import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    const filePath = `documents/${file.name}`;

    const { error } = await supabase.storage.from("documents").upload(filePath, file);

    setUploading(false);
    if (error) {
      setMessage("Upload failed: " + error.message);
    } else {
      setMessage("File uploaded successfully!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-xl font-bold text-center">Upload Document</h2>
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded mt-4" />
        <button
          onClick={uploadFile}
          className="w-full mt-2 bg-green-600 text-white p-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {message && <p className="text-center mt-2">{message}</p>}
      </div>
    </div>
  );
}
