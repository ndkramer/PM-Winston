# Miro Webhook Receiver

A lightweight Node.js application that receives Miro webhook events and stores them in Supabase for later processing.

## Features

- ✅ Express server with TypeScript
- ✅ Supabase integration for event storage
- ✅ Health check endpoint
- ✅ Webhook receiver endpoint
- ✅ Comprehensive error handling and logging
- ✅ Railway deployment ready

## Prerequisites

- Node.js 18.x or higher
- A Supabase account and project
- A Miro account with API access

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ndkramer/PM-Winston.git
cd PM-Winston
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once your project is ready, go to **Settings** → **API**
3. Copy your **Project URL** and **service_role key** (not the anon key!)
4. Go to the **SQL Editor** in Supabase
5. Run the SQL from `schema.sql` to create the required table and indexes

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-service-role-key-here
   PORT=3000
   ```

### 5. Run the Application

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check

```
GET /health
```

Returns the server status and current timestamp.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Webhook Receiver

```
POST /webhooks/miro
```

Receives Miro webhook events and stores them in the database.

**Request Body:** Any valid JSON payload from Miro

**Success Response:**
```json
{
  "received": true,
  "eventId": "uuid-of-stored-event"
}
```

**Error Response:**
```json
{
  "received": false,
  "error": "Error description",
  "details": "Detailed error message"
}
```

## Testing the Webhook Locally

You can test the webhook endpoint using curl:

```bash
curl -X POST http://localhost:3000/webhooks/miro \
  -H "Content-Type: application/json" \
  -d '{
    "boardId": "uXjVJWWN1_Y=",
    "type": "item.created",
    "userId": "12345",
    "item": {
      "id": "item-123",
      "type": "shape"
    }
  }'
```

## Deploying to Railway

### Option 1: Using Railway CLI

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize project:
   ```bash
   railway init
   ```

4. Add environment variables:
   ```bash
   railway variables set SUPABASE_URL=your-url
   railway variables set SUPABASE_KEY=your-key
   ```

5. Deploy:
   ```bash
   railway up
   ```

### Option 2: Using Railway Dashboard

1. Go to [Railway](https://railway.app) and create a new project
2. Connect your GitHub repository
3. Railway will auto-detect the `railway.json` configuration
4. Add environment variables in the **Variables** tab:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
5. Deploy!

Railway will automatically:
- Install dependencies
- Build the TypeScript code
- Start the server
- Provide you with a public URL

## Configuring Miro Webhooks

1. Go to your Miro app settings at [Miro Developers](https://developers.miro.com)
2. Navigate to your app's **Webhooks** section
3. Add a new webhook:
   - **URL**: Your deployed URL + `/webhooks/miro` (e.g., `https://your-app.railway.app/webhooks/miro`)
   - **Board**: Select the board `uXjVJWWN1_Y=` or use the board picker
   - **Events**: Select the events you want to receive (e.g., item.created, item.updated)
4. Save and test the webhook

## Database Schema

The application uses a single table `miro_events`:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier (auto-generated) |
| board_id | TEXT | Miro board ID |
| event_type | TEXT | Type of event (e.g., item.created) |
| payload | JSONB | Full webhook payload |
| created_at | TIMESTAMPTZ | Timestamp when event was received |

### Querying Events

You can query events in Supabase:

```sql
-- Get all events
SELECT * FROM miro_events ORDER BY created_at DESC;

-- Get events for a specific board
SELECT * FROM miro_events WHERE board_id = 'uXjVJWWN1_Y=' ORDER BY created_at DESC;

-- Get events by type
SELECT * FROM miro_events WHERE event_type = 'item.created' ORDER BY created_at DESC;

-- Search within payload
SELECT * FROM miro_events WHERE payload->>'userId' = '12345';
```

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── supabase.ts       # Supabase client configuration
│   └── index.ts              # Main Express server
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
├── railway.json              # Railway deployment config
├── schema.sql                # Database schema
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run typecheck` - Check TypeScript types without building

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| SUPABASE_URL | Yes | Your Supabase project URL |
| SUPABASE_KEY | Yes | Your Supabase service_role key |
| PORT | No | Server port (default: 3000) |

## Troubleshooting

### Database Connection Issues

If you see warnings about Supabase connection:
1. Verify your `SUPABASE_URL` and `SUPABASE_KEY` are correct
2. Make sure you're using the `service_role` key, not the `anon` key
3. Ensure the `miro_events` table exists (run `schema.sql`)
4. Check that your Supabase project is active

### Webhook Not Receiving Events

1. Verify the webhook is properly configured in Miro
2. Check that your deployed URL is accessible (test with `/health`)
3. Look at the server logs for error messages
4. Ensure the board ID matches `uXjVJWWN1_Y=`

### Build Errors

If TypeScript build fails:
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## Security Notes

- The `service_role` key has elevated permissions - keep it secret!
- Never commit `.env` file to version control
- Consider adding authentication to the webhook endpoint in production
- Use HTTPS in production (Railway provides this automatically)

## License

ISC

## Support

For issues or questions:
- Create an issue in the GitHub repository
- Check Miro's [webhook documentation](https://developers.miro.com/docs/webhooks)
- Review Supabase [documentation](https://supabase.com/docs)

