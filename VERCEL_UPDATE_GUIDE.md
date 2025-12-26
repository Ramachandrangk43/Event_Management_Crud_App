# 🔧 Fix Vercel Frontend to Connect to Live Backend

## Problem
Your frontend on Vercel is trying to connect to localhost instead of your live Render backend.

## Solution: Update Vercel Environment Variable

### Step 1: Go to Vercel Dashboard
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project: `event-management-crud-app`

### Step 2: Update Environment Variable
1. Go to **Settings** → **Environment Variables**
2. Find `NEXT_PUBLIC_API_URL` or add it if missing
3. Set the value to: `https://event-management-crud-app.onrender.com/api`
4. Make sure it's set for **Production** environment

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **3 dots** on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Expected Result
- ✅ Frontend calls live backend: `https://event-management-crud-app.onrender.com/api`
- ✅ No more localhost connection errors
- ✅ Events load from your live database
- ✅ All CRUD operations work on live site

## Test Your Live App
Visit: https://event-management-crud-app.vercel.app

You should see:
- Events loading properly
- No connection errors in browser console
- Ability to create, edit, delete events
- Categories working correctly

## Local Development Still Works
When you run `npm run dev` locally:
- Uses `.env.local`: `http://localhost:8000/api`
- Connects to your local Django server
- No changes needed for local development