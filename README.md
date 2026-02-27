# Scout — Building Retrofit Assessment

## How to Deploy This on Vercel (Step-by-Step)

### What You'll Need
- A **GitHub** account (free) → [github.com](https://github.com)
- A **Vercel** account (free) → [vercel.com](https://vercel.com)

### Step 1: Upload This Project to GitHub
1. Go to [github.com/new](https://github.com/new) to create a new repository
2. Name it `scout-app` (or whatever you like)
3. Keep it **Public** and click **Create repository**
4. On the next page, click **"uploading an existing file"**
5. Drag and drop ALL the files from this folder onto that page
6. Click **Commit changes**

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New" → "Project"**
3. Find `scout-app` in the list and click **Import**
4. **Before clicking Deploy** — expand **"Environment Variables"**
5. Add one variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (starts with `sk-ant-...`)
6. Click **Deploy**
7. Wait ~60 seconds — done! You'll get a live URL

### Where to get an Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys** and create a new key
4. Copy it — you'll paste it into Vercel in Step 2 above

### Step 3: You're Live!
Vercel gives you a URL like `scout-app.vercel.app`. That's your app on the internet.
