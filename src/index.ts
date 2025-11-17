import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { supabase, testConnection } from './config/supabase';

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());

/**
 * Request logging middleware
 */
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * Health check endpoint
 * GET /health
 * Returns server status and current timestamp
 */
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Miro webhook endpoint
 * POST /webhooks/miro
 * Receives Miro webhook events and stores them in Supabase
 */
app.post('/webhooks/miro', async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    
    // Log received payload
    console.log('📥 Received Miro webhook:', JSON.stringify(payload, null, 2));
    
    // Extract event information
    const boardId = payload.boardId || payload.board_id || null;
    const eventType = payload.type || payload.event_type || 'unknown';
    
    // Store event in Supabase
    const { data, error } = await supabase
      .from('miro_events')
      .insert({
        board_id: boardId,
        event_type: eventType,
        payload: payload,
      })
      .select();
    
    if (error) {
      console.error('❌ Database error:', error.message);
      res.status(500).json({
        received: false,
        error: 'Failed to store webhook event',
        details: error.message,
      });
      return;
    }
    
    console.log('✅ Event stored successfully:', data?.[0]?.id);
    
    res.status(200).json({
      received: true,
      eventId: data?.[0]?.id,
    });
    
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    res.status(500).json({
      received: false,
      error: 'Internal server error',
      details: errorMessage,
    });
  }
});

/**
 * 404 handler for unknown routes
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

/**
 * Global error handler
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: err.message,
  });
});

/**
 * Start the server
 */
async function startServer() {
  try {
    // Start server first
    const server = app.listen(PORT, '0.0.0.0', () => {
      const address = server.address();
      console.log('');
      console.log('🚀 Miro Webhook Receiver started successfully!');
      console.log(`📡 Server listening on port ${PORT} on all interfaces (0.0.0.0)`);
      console.log(`🔧 Server address:`, address);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
      console.log(`📨 Webhook endpoint: http://localhost:${PORT}/webhooks/miro`);
      console.log('');
      console.log('Ready to receive Miro webhooks...');
      
      // Test database connection after server is running (non-blocking)
      console.log('');
      console.log('🔍 Testing Supabase connection...');
      testConnection()
        .then((isConnected) => {
          if (isConnected) {
            console.log('✅ Supabase connection verified');
          } else {
            console.warn('⚠️  Warning: Could not establish Supabase connection');
            console.warn('⚠️  Database operations may fail');
          }
        })
        .catch((err) => {
          console.warn('⚠️  Supabase connection test error:', err.message);
          console.warn('⚠️  Database operations may fail');
        });
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

