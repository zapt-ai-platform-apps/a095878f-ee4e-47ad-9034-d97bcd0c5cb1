# reactjs-starter

## Overview
This app allows users to upload, view, and manage their videos seamlessly. With a clean interface and responsive design, users can easily handle their video content on any device.

## User Journeys
1. [Upload Video](docs/journeys/upload-video.md) - Add a new video with title, description, and thumbnail.
2. [View Videos](docs/journeys/view-videos.md) - Browse through a list of uploaded videos and play them.
3. [Manage Account](docs/journeys/manage-account.md) - Update user information and settings.

## External APIs
- **Supabase**: Used for authentication and storage of video files and thumbnails.
  - **Purpose**: Handles user authentication and stores video and thumbnail files.

## Environment Variables
Ensure the following environment variables are set in the `.env` file:
- `COCKROACH_DB_URL`
- `NPM_TOKEN`
- `VITE_PUBLIC_APP_ID`
- `VITE_PUBLIC_APP_ENV`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`

---
For detailed instructions on each user journey, refer to the [docs/journeys](docs/journeys/) directory.