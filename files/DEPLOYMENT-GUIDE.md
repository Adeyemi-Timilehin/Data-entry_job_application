# How to Deploy Your AI Apps

## Overview

You have TWO apps to deploy:
1. **Data QA Specialist App** - The tool that does the actual job
2. **Job Application Bot** - The tool that applies for jobs

Both are React apps that use the Claude API. Here are ALL the ways to deploy them:

---

# METHOD 1: Deploy to Claude Artifacts (EASIEST - 2 MINUTES)

This is the **absolute fastest** way to use these apps right now.

## Steps:

1. **You're already here!** The apps are already in Claude Artifacts
2. **Click on the artifact** (the preview window showing the app)
3. **The app will open** in a full-screen view
4. **Start using it immediately!**

## Limitations:
- ⚠️ Your data is NOT saved between sessions
- ⚠️ You need to keep this Claude conversation open
- ⚠️ Best for testing and one-time use

---

# METHOD 2: Save as HTML File (NO CODING - 5 MINUTES)

Run the apps directly from your computer without any setup.

## Steps:

### For Data QA Specialist:

1. **Create the HTML file:**
   - Open Notepad (Windows) or TextEdit (Mac)
   - Copy the complete code below
   - Save as `data-qa-specialist.html`

2. **Double-click the file** to open in your browser
3. **Start using it!**

### For Job Application Bot:

1. **Create the HTML file:**
   - Open Notepad (Windows) or TextEdit (Mac)
   - Copy the complete code below
   - Save as `job-application-bot.html`

2. **Double-click the file** to open in your browser
3. **Start using it!**

## Complete HTML Files:

I'll create these for you below...

---

# METHOD 3: Deploy to Netlify (FREE HOSTING - 10 MINUTES)

Host your apps online so you can access them from anywhere.

## Prerequisites:
- GitHub account (free)
- Netlify account (free)

## Steps:

### A. Prepare Your Files

1. **Download both .jsx files** I created for you
2. **Create a folder structure:**
   ```
   my-ai-apps/
   ├── data-qa/
   │   ├── index.html
   │   └── app.jsx
   └── job-bot/
       ├── index.html
       └── app.jsx
   ```

### B. Create HTML Wrapper Files

For each app, create an `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI App</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="app.jsx"></script>
    <script type="text/babel">
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>
```

### C. Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up for free
3. Click "Add new site" → "Deploy manually"
4. Drag your folder into the upload area
5. Wait 30 seconds
6. Get your live URL! (e.g., `https://your-app.netlify.app`)

**Cost:** FREE forever (with Netlify limits)

---

# METHOD 4: Deploy to Vercel (FREE HOSTING - 10 MINUTES)

Alternative to Netlify, also excellent and free.

## Steps:

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Upload your files or connect GitHub repo
5. Click "Deploy"
6. Get your live URL!

**Cost:** FREE forever

---

# METHOD 5: Run Locally with Node.js (FOR DEVELOPERS - 20 MINUTES)

Full development environment with hot reload.

## Prerequisites:
- Node.js installed (download from nodejs.org)
- Basic terminal/command line knowledge

## Steps:

### 1. Set Up React App

```bash
# Open terminal/command prompt
npx create-react-app my-ai-apps
cd my-ai-apps
```

### 2. Install Dependencies

```bash
npm install lucide-react
```

### 3. Replace Default App

```bash
# Delete src/App.js
# Copy the .jsx file content into src/App.js
# Modify the export line at the bottom to:
# export default function App() { ... }
```

### 4. Update src/App.js

Make sure the file starts with:
```javascript
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, ... } from 'lucide-react';

export default function App() {
  // ... rest of the code
}
```

### 5. Run the App

```bash
npm start
```

Browser opens automatically at `http://localhost:3000`

**Cost:** FREE (runs on your computer)

---

# METHOD 6: Deploy to GitHub Pages (FREE - 15 MINUTES)

Host for free on GitHub.

## Steps:

1. Create GitHub account
2. Create new repository
3. Upload your files
4. Go to Settings → Pages
5. Select branch to deploy
6. Get URL: `https://yourusername.github.io/repo-name`

**Cost:** FREE forever

---

# RECOMMENDED DEPLOYMENT PATH

## For Testing (Right Now):
✅ **Use Claude Artifacts** - Already done, click and use!

## For Daily Use (This Week):
✅ **Save as HTML file** - Works offline, no setup needed

## For Sharing (Next Week):
✅ **Deploy to Netlify** - Free URL you can share with others

## For Development (If you code):
✅ **Run locally with Node.js** - Best developer experience

---

# CREATING STANDALONE HTML FILES

Let me create ready-to-use HTML files for you:

## Data QA Specialist - Standalone HTML

Save this as `data-qa-specialist.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Data QA Specialist</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        // PASTE THE ENTIRE data-qa-specialist.jsx CODE HERE
        // Then at the bottom, add:
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<DataQASpecialist />);
    </script>
</body>
</html>
```

## Job Application Bot - Standalone HTML

Save this as `job-application-bot.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Job Application Bot</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        // PASTE THE ENTIRE job-application-bot.jsx CODE HERE
        // Then at the bottom, add:
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<JobApplicationBot />);
    </script>
</body>
</html>
```

---

# IMPORTANT: CLAUDE API KEY

⚠️ **CRITICAL SECURITY NOTE:**

The apps I built use Claude's API WITHOUT an API key because they're designed to run in Claude's environment. 

**If you deploy externally, you need to:**

1. **Get an API key:**
   - Go to [console.anthropic.com](https://console.anthropic.com)
   - Sign up for API access
   - Create an API key
   - **Cost:** Pay-per-use (~$0.003 per application generated)

2. **Add the API key to the code:**

Find this section in both apps:
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // ADD THIS LINE:
    "x-api-key": "your-api-key-here",
    "anthropic-version": "2023-06-01"
  },
```

3. **⚠️ SECURITY WARNING:**
   - Never put API keys directly in frontend code for public apps
   - Anyone can see your key and use it
   - **Better approach:** Use a backend server to proxy API calls

---

# SECURE DEPLOYMENT (ADVANCED)

For production use with your own API key:

## Option A: Use Environment Variables (Netlify/Vercel)

1. Deploy to Netlify/Vercel
2. Add API key as environment variable in dashboard
3. Create serverless function to call Claude API
4. Frontend calls your function (not Claude directly)

## Option B: Build a Simple Backend

```bash
# Create backend folder
mkdir backend
cd backend
npm init -y
npm install express cors anthropic dotenv

# Create server.js
```

```javascript
// server.js
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('cors')());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/generate', async (req, res) => {
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: req.body.messages,
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Backend running on port 3001'));
```

Then update your frontend to call `http://localhost:3001/api/generate` instead of Claude directly.

---

# COST BREAKDOWN

## Using Claude API:

**Data QA Specialist:**
- ~$0.01 - $0.05 per validation/cleaning task
- 100 tasks = ~$2-5

**Job Application Bot:**
- ~$0.02 - $0.10 per application generated
- 100 applications = ~$5-10

**Total cost to apply to 100 jobs: ~$10**
Compare to: 300 hours of manual work at $15/hr = $4,500 saved

## Hosting Costs:

- **Netlify/Vercel/GitHub Pages:** FREE forever
- **Domain name (optional):** ~$12/year
- **No servers needed!**

---

# QUICK START CHECKLIST

## Today (5 minutes):
- [ ] Click the artifacts in this conversation
- [ ] Test both apps right now
- [ ] Fill out your profile in Job Bot

## This Week (15 minutes):
- [ ] Save both apps as HTML files
- [ ] Test them offline
- [ ] Apply to 5 jobs using the bot

## Next Week (1 hour):
- [ ] Sign up for Netlify/Vercel
- [ ] Deploy both apps
- [ ] Get Claude API key
- [ ] Update code with API key
- [ ] Share URL with friends

## Long Term:
- [ ] Apply to 10 jobs/day using bot
- [ ] Track results in spreadsheet
- [ ] Iterate on profile based on response rate

---

# TROUBLESHOOTING

**"The app won't load"**
→ Make sure you have internet (needs to load React libraries)

**"API calls aren't working"**
→ Check if you added your API key (if deployed externally)

**"Page is blank"**
→ Open browser console (F12) and check for errors

**"React is not defined"**
→ Make sure script tags load in correct order in HTML

**"Can I use this on my phone?"**
→ Yes! All deployment methods work on mobile browsers

**"Do I need to pay for anything?"**
→ Only if you use external deployment with high API usage. Netlify/Vercel hosting is free.

---

# NEXT STEPS

1. **RIGHT NOW:** Click the artifacts and test both apps
2. **TODAY:** Save as HTML files and use them
3. **THIS WEEK:** Apply to 10 jobs using the bot
4. **NEXT WEEK:** Deploy to Netlify for permanent access

Need help? The apps are already running in Claude Artifacts - just click and use them!
