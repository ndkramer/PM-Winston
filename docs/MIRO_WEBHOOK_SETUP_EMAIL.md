# Email to Miro Board Owner - Webhook Setup Instructions

---

**Subject:** Request: Setup Webhook Integration for Our Miro Board

---

Hi [Board Owner Name],

I hope this email finds you well! I've built an automated system that will capture and store all activity from our Miro board for analysis and record-keeping. To make this work, I need your help setting up a webhook connection (don't worry - I'll walk you through every step!).

## What is a Webhook?

A webhook is like a notification system - whenever someone adds, updates, or deletes something on our Miro board, Miro will automatically send that information to our application. This helps us track changes, collaborate better, and keep a history of our board activities.

## What You'll Need

- Access to the Miro Developer Portal (free, uses your regular Miro account)
- About 5-10 minutes
- Admin access to our Miro board

## Step-by-Step Instructions

### Step 1: Access the Miro Developer Portal

1. Open your web browser and go to: **https://developers.miro.com/**
2. Click the **"Sign in"** button in the top right corner
3. Sign in using your regular Miro account credentials (same as what you use for Miro boards)

### Step 2: Create a Miro App (if you don't have one already)

1. Once signed in, click **"My Apps"** in the top navigation menu
2. If you already have an app created, skip to Step 3. Otherwise, click the **"Create new app"** button
3. Fill in the app details:
   - **App Name:** `PM-Winston Integration` (or any name you prefer)
   - **Description:** `Webhook integration for board activity tracking`
   - **Team:** Select your team (if applicable)
4. Click **"Create app"**
5. You'll be taken to your new app's dashboard

### Step 3: Configure the Webhook

1. In your app dashboard, look for **"Webhooks"** in the left sidebar menu
2. Click on **"Webhooks"**
3. Click the **"Add webhook"** or **"Create webhook"** button
4. You'll see a form to fill out - here's what to enter:

#### Webhook Configuration Details:

**A. Webhook URL (Required):**
```
https://pm-winston-production.up.railway.app/webhooks/miro
```
Copy and paste this EXACTLY as shown above. This is the endpoint where Miro will send the data.

**B. Board Selection (Required):**
- Select **"Specific board"** from the dropdown
- Enter the Board ID: `uXjVJWWN1_Y=`
  
  **OR** use the board picker:
  - Click **"Select board"** or the board picker icon
  - Find and select our board from the list
  - The board URL is: `https://miro.com/app/board/uXjVJWWN1_Y=/`

**C. Events to Subscribe (Required):**

Please select ALL of the following events (check the boxes):
- ✅ `item:created` - Captures when new items are added to the board
- ✅ `item:updated` - Captures when items are modified
- ✅ `item:deleted` - Captures when items are removed
- ✅ `board:updated` - Captures when board settings change

*(Note: You can select additional events if you'd like to capture more activities)*

**D. Status:**
- Make sure the webhook is set to **"Active"** or **"Enabled"**

5. Click **"Save"** or **"Create webhook"** at the bottom of the form

### Step 4: Verify the Webhook is Working

Miro may automatically send a test webhook to verify the connection. Then:

1. Open our Miro board: https://miro.com/app/board/uXjVJWWN1_Y=/
2. **Create a simple test** - Add a sticky note with text like "Testing webhook integration"
3. Let me know once you've done this, and I'll verify that our system received the event

You should see a green checkmark or "Active" status next to the webhook in your Miro app dashboard if everything is working correctly.

## Troubleshooting

**If you see an error or the webhook fails:**

- Double-check the webhook URL is exactly: `https://pm-winston-production.up.railway.app/webhooks/miro`
- Make sure you selected the correct board: `uXjVJWWN1_Y=`
- Ensure the webhook status is set to "Active" or "Enabled"
- Try deleting and recreating the webhook if it still doesn't work

**If you get stuck at any step:**
- Take a screenshot of where you're stuck
- Forward this email back to me with the screenshot
- I'll help you troubleshoot!

## What Happens Next?

Once the webhook is set up:
- Every time someone creates, updates, or deletes something on our Miro board, that activity will automatically be captured
- The data is securely stored in our database
- We can analyze board activity, track changes over time, and maintain a complete history
- This all happens in the background - no impact on normal Miro usage

## Security & Privacy

- The webhook connection is secured with HTTPS (encrypted)
- Only activity from our specific board is captured
- The data is stored securely in our private database
- No personal information beyond what's already on the board is collected

## Need Help?

If you have any questions or run into any issues, please don't hesitate to reach out! I'm happy to hop on a quick call to walk through this together if that's easier.

Thank you so much for your help with this! Once it's set up, our board activity tracking will be fully automated.

Best regards,
[Your Name]

---

## Quick Reference Information

**Webhook URL:** `https://pm-winston-production.up.railway.app/webhooks/miro`

**Board ID:** `uXjVJWWN1_Y=`

**Board URL:** `https://miro.com/app/board/uXjVJWWN1_Y=/`

**Developer Portal:** `https://developers.miro.com/`

**Events to Subscribe:**
- item:created
- item:updated  
- item:deleted
- board:updated

---

*This email was generated on November 17, 2025*

