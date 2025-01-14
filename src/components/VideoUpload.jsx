import React, { useState } from 'react';
import { uploadVideo } from '../services/videoService';
import * as Sentry from "@sentry/browser";

export default function VideoUpload({ onUpload }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const newVideo = await uploadVideo({ title, description, videoFile, thumbnailFile });
      onUpload(newVideo);
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      alert('Failed to upload video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <h2 className="text-xl font-semibold">Upload Video</h2>
      <input
        type="text"
        className="box-border p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="box-border p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnailFile(e.target.files[0])}
      />
      <button
        type="submit"
        className="cursor-pointer p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}