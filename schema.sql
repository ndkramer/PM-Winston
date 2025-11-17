-- Miro Webhook Events Table
-- This table stores all incoming webhook events from Miro

CREATE TABLE IF NOT EXISTS miro_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id TEXT,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying events by creation date (most recent first)
CREATE INDEX IF NOT EXISTS idx_miro_events_created ON miro_events(created_at DESC);

-- Index for querying events by board_id
CREATE INDEX IF NOT EXISTS idx_miro_events_board ON miro_events(board_id);

-- Index for querying events by event_type
CREATE INDEX IF NOT EXISTS idx_miro_events_type ON miro_events(event_type);

-- Optional: Add a comment to the table
COMMENT ON TABLE miro_events IS 'Stores webhook events received from Miro boards';
COMMENT ON COLUMN miro_events.id IS 'Unique identifier for the event';
COMMENT ON COLUMN miro_events.board_id IS 'The ID of the Miro board that triggered the event';
COMMENT ON COLUMN miro_events.event_type IS 'The type of event (e.g., item.created, item.updated)';
COMMENT ON COLUMN miro_events.payload IS 'Full JSON payload of the webhook event';
COMMENT ON COLUMN miro_events.created_at IS 'Timestamp when the event was received';

