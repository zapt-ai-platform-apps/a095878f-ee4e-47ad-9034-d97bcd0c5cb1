import { supabase } from '../supabaseClient';

export async function uploadVideo({ title, description, videoFile, thumbnailFile }) {
  // Upload video file
  const { data: videoData, error: videoError } = await supabase.storage
    .from('videos')
    .upload(`public/${videoFile.name}`, videoFile);

  if (videoError) throw videoError;

  // Upload thumbnail file if provided
  let thumbnailUrl = '';
  if (thumbnailFile) {
    const { data: thumbData, error: thumbError } = await supabase.storage
      .from('thumbnails')
      .upload(`public/${thumbnailFile.name}`, thumbnailFile);
    if (thumbError) throw thumbError;
    thumbnailUrl = supabase.storage.from('thumbnails').getPublicUrl(thumbData.path).data.publicUrl;
  }

  // Get video URL
  const videoUrl = supabase.storage.from('videos').getPublicUrl(videoData.path).data.publicUrl;

  // Post video data to API
  const response = await fetch('/api/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, videoUrl, thumbnailUrl }),
  });

  if (!response.ok) throw new Error('Failed to upload video');

  const newVideo = await response.json();
  return newVideo;
}