# Railway.app Deployment Guide (100% Unified Setup)

This document guides you through deploying the **Kohortconnect** platform (React Frontend + Hono Backend + MySQL Database) on **Railway.app** for under **$5–$10 / month**.

---

## 1. How the Architecture Works on Railway

Railway will deploy **two services** in a single project:

1. **MySQL Database Service:** Provisions a MySQL 8.0 instance.
2. **App Service (Frontend + Backend):** Builds your `app/Dockerfile` to start the Node.js server. The server hosts both:
   * The React client SPA assets (from `dist/public`).
   * The Hono API endpoint routes (from `dist/boot.js`).

---

## 2. Step-by-Step Deployment Instructions

### Step 1: Push your cleaned project to GitHub
Create a private repository on GitHub and push the current project files:
```bash
git init
git add .
git commit -m "Initialize clean project for Railway"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

---

### Step 2: Sign Up & Create a Project on Railway
1. Go to **[Railway.app](https://railway.app)** and click **Login** (choose "Login with GitHub").
2. Once logged in, click the **+ New Project** button in the top right.
3. Select **Deploy from GitHub repo**.
4. Choose the repository you pushed in Step 1.
5. In the configuration popup, click **Deploy Now** (it might fail at first because we haven't added variables or the database yet; this is normal).

---

### Step 3: Set the Root Directory to `app`
Since your active application source code is located inside the subfolder `app`, we need to tell Railway to compile from there.

1. In the Railway project board, click on your **App Service** block.
2. Go to the **Settings** tab.
3. Scroll down to the **General** section.
4. Locate the **Root Directory** field and set it to: `/app` (or click browse and choose the `app` folder).
5. Railway will automatically save this setting.

---

### Step 4: Add the MySQL Database
1. Go back to your Railway project canvas dashboard.
2. Click the **+ Create** button (or **+ New** service button).
3. Select **Database** → **Add MySQL**.
4. Railway will create a MySQL database instance in the background. 
5. Under the hood, Railway generates a connection string environment variable named `DATABASE_URL` (looks like `mysql://root:pass@host:port/db`).

---

### Step 5: Link the Database and App
We need to inject the MySQL connection string into our Hono application:

1. Click on your **App Service** block.
2. Go to the **Variables** tab.
3. Click the **New Variable** button.
4. Click **Add Reference** (the small green link icon) and choose `MySQL` -> `DATABASE_URL`.
5. Name the variable: `DATABASE_URL`
6. Value will look like: `${{MySQL.DATABASE_URL}}`
7. Click **Save**.

---

### Step 6: Configure Environment Variables
Add the remaining environment variables in your App Service's **Variables** tab:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables compiled assets mode |
| `PORT` | `3000` | Tells Railway what port to map |
| `APP_ID` | `your_app_id` | Custom backend identifier |
| `APP_SECRET` | `your_long_secret_key` | JWT token signature secret |
| `VITE_KIMI_AUTH_URL` | `https://auth.kimi.com` | Kimi Auth Endpoint (Frontend) |
| `VITE_APP_ID` | `your_oauth_id` | OAuth client ID (Frontend) |
| `KIMI_AUTH_URL` | `https://auth.kimi.com` | Kimi Auth Endpoint (Backend) |
| `KIMI_OPEN_URL` | `https://open.kimi.com` | Kimi Open Endpoint (Backend) |
| `OWNER_UNION_ID` | `your_admin_id` | Seeds your account as administrator |

---

### Step 7: Trigger DB Push and Seed
To create your database tables and seed country indicators automatically upon deployment:

1. Click on your **App Service** block.
2. Go to the **Settings** tab.
3. Under **Deploy** -> **Build Command**, input:
   ```bash
   npm run build
   ```
4. Under **Deploy** -> **Start Command**, input:
   ```bash
   npx drizzle-kit push && npx tsx db/seed-country-data.ts && npm start
   ```
   *This makes sure the schema is created and countries are seeded before starting the server.*
5. Railway will automatically redeploy the service with these commands.

---

### Step 8: Expose Your Domain
1. In your **App Service** settings, go to the **Settings** tab.
2. Scroll to the **Environment** / **Networking** section.
3. Click **Generate Domain** (Railway will create a free `xxx.up.railway.app` HTTPS domain for you).
4. If you have a custom domain (e.g. `counseling.com`), click **Custom Domain** and map your DNS record to the Railway target.

---

## 3. Maintenance on Railway

* **Logs:** View active traffic and errors by clicking your App Service -> **Logs** tab.
* **Auto Deployments:** Any time you run `git push origin main`, Railway automatically pulls the new code, runs migrations, compiles the assets, and deploys it with zero downtime.
