import React, { useEffect, useState } from 'react';
import * as Sentry from "@sentry/browser";

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        alert('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="p-4">Loading videos...</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map(video => (
        <div key={video.id} className="border rounded p-2 flex flex-col">
          {video.thumbnailUrl && (
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover mb-2" />
          )}
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <p className="flex-1">{video.description}</p>
          <video controls className="mt-2">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
      {videos.length === 0 && <div>No videos uploaded yet.</div>}
    </div>
  );
}