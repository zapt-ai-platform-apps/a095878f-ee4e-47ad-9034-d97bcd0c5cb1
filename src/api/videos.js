import { videos } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js"
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);
    
    if (req.method === 'POST') {
      const { title, description, videoUrl, thumbnailUrl } = req.body;
      
      const newVideo = await db.insert(videos).values({
        title,
        description,
        videoUrl,
        thumbnailUrl,
        userId: user.id
      }).returning();
      
      res.status(201).json(newVideo);
    } else if (req.method === 'GET') {
      const userVideos = await db.select().from(videos).where(eq(videos.userId, user.id)).limit(10);
      res.status(200).json(userVideos);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}