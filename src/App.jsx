import React, { useState } from 'react';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import { supabase } from './supabaseClient';

export default function App(){
    const [videos, setVideos] = useState([]);

    const handleUpload = (newVideo) => {
        setVideos([newVideo, ...videos]);
    };

    return (
        <div className="min-h-screen h-full flex flex-col">
            <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1 className="text-2xl">Video App</h1>
                <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="underline">
                    Made on ZAPT
                </a>
            </header>
            <main className="flex-1 p-4">
                <VideoUpload onUpload={handleUpload} />
                <VideoList videos={videos} />
            </main>
            <footer className="p-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Video App. All rights reserved.
            </footer>
        </div>
    )
}