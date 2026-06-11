# AWS EC2 & Nginx Deployment Guide for Kohortconnect

This document provides a comprehensive, production-grade guide for deploying the **Kohortconnect** Study Abroad Counseling Platform to an **AWS EC2** instance, configuring **Nginx** as a reverse proxy, and setting up the required **MySQL Database**.

---

## 1. System Architecture

The following diagram illustrates the deployment topology on AWS:

```mermaid
graph TD
    Client[Client / Web Browser] -->|HTTP/HTTPS Ports: 80/443| Nginx[Nginx Reverse Proxy]
    
    subgraph "AWS EC2 Instance (Ubuntu)"
        Nginx -->|Reverse Proxy to Port 3000| PM2[PM2 Process Manager]
        PM2 -->|Runs Node App| Hono[Hono Node Server]
        Hono -->|Serves Static Files| Assets[React Frontend Assets dist/public]
        Hono -->|API Router| tRPC[tRPC API Endpoint]
    end

    subgraph "Database Layer"
        Hono -->|Drizzle ORM Port: 3306| MySQL[(MySQL Database)]
        style MySQL fill:#f9f,stroke:#333,stroke-width:2px
    end

    subgraph "External Integrations"
        Hono -->|OAuth / APIs| Kimi[Kimi Auth / Open Platform]
    end
```

### Why a Single Process?
The application is structured to serve the compiled React SPA static assets *and* the tRPC backend routes from a single Hono Node.js server. The production bundle runs on port `3000` (configurable), making it exceptionally clean to reverse-proxy via Nginx.

---

## 2. Database & Data Storage Specifications

### Recommended Database: **MySQL 8.0+**
* **Dialect Compatibility:** The application uses **Drizzle ORM** configured with the `mysql` dialect and the `mysql2` client driver.
* **Hosting Options:**
  1. **AWS RDS MySQL (Recommended for Production):** Provides managed backups, multi-AZ high availability, and auto-scaling, completely offloading database administration. (Minimum size: `db.t3.micro` or `db.t3.small`).
  2. **Local MySQL on EC2 (Recommended for MVP/Dev):** Running MySQL Server directly on the same EC2 instance. This saves cost but requires manual backups and maintenance.

### Detailed Entity-by-Entity Data Mapping
Below is the exact list of tables, columns, and data stored in the database, matching the schema definitions in [schema.ts](file:///Users/fahim/Downloads/Kimi_Agent_Kohortconnect%20Market%20Research/app/db/schema.ts):

#### 1. `users` (User Authentication Records)
Stores credentials and details of users logged in via Kimi OAuth.
* **Columns:**
  * `id` (`int unsigned`, Primary Key, Autoincrement)
  * `unionId` (`varchar(255)`, Not Null, Unique) — The unique identifier from the Kimi OAuth system.
  * `name` (`varchar(255)`) — Full name of the user.
  * `email` (`varchar(320)`) — User's email address.
  * `avatar` (`text`) — Profile avatar image URL.
  * `role` (`enum('user', 'admin')`, Default: `'user'`) — User privilege level.
  * `createdAt` / `updatedAt` / `lastSignInAt` (`timestamp`) — Audit timestamps.

#### 2. `leads` (Landing/Contact Page Inquiry Submissions)
Stores contact details and counseling request parameters submitted by prospective students.
* **Columns:**
  * `id` (`int unsigned`, Primary Key, Autoincrement)
  * `fullName` (`varchar(255)`, Not Null)
  * `email` (`varchar(255)`, Not Null)
  * `phone` (`varchar(20)`, Not Null)
  * `destination` (`enum('usa', 'canada', 'uk', 'australia', 'germany', 'ireland', 'new_zealand', 'other')`, Not Null)
  * `courseInterest` (`enum('undergraduate', 'postgraduate', 'phd', 'mba', 'diploma', 'other')`, Not Null)
  * `preferredIntake` (`enum('fall_2026', 'spring_2027', 'fall_2027', 'later')`, Not Null)
  * `city` (`varchar(100)`, Not Null)
  * `message` (`text`) — Custom student query notes.
  * `status` (`enum('new', 'contacted', 'qualified', 'converted', 'lost')`, Default: `'new'`) — Sales lead pipeline tracking stage.
  * `createdAt` / `updatedAt` (`timestamp`)

#### 3. `student_profiles` (Detailed Counseling Profile Data)
Maintains specific academic and financial parameters used to recommend universities and match paths.
* **Columns:**
  * `id` (`int unsigned`, Primary Key, Autoincrement)
  * `userId` (`int unsigned`, Foreign Key to `users`)
  * `fullName` (`varchar(255)`)
  * `phone` (`varchar(20)`)
  * `city` (`varchar(100)`)
  * `destination` (`enum` corresponding to options above)
  * `courseInterest` (`enum` corresponding to options above)
  * `preferredIntake` (`enum` corresponding to options above)
  * `gpa` (`varchar(20)`) — Student GPA/percentage.
  * `englishProficiency` (`varchar(50)`) — IELTS, TOEFL, or Duolingo scores.
  * `workExperience` (`varchar(50)`) — Candidate work experience (e.g. "2 years").
  * `budget` (`varchar(50)`) — Stated financial limit for education.
  * `bio` (`text`) — Personal statement / goals.
  * `createdAt` / `updatedAt` (`timestamp`)

#### 4. `applications` (University Application Tracker)
Allows students or administrators to log and track specific applications sent to overseas universities.
* **Columns:**
  * `id` (`int unsigned`, Primary Key, Autoincrement)
  * `userId` (`int unsigned`, Foreign Key to `users`)
  * `university` (`varchar(255)`, Not Null) — Targeted institution name.
  * `course` (`varchar(255)`, Not Null) — Program major name.
  * `destination` (`enum` of countries, Not Null)
  * `status` (`enum('researching', 'shortlisted', 'applied', 'documents_submitted', 'interview_scheduled', 'interview_completed', 'offer_received', 'rejected', 'accepted')`, Default: `'researching'`)
  * `deadline` (`varchar(50)`) — Application due date.
  * `notes` (`text`) — Specific guidelines or application details.
  * `createdAt` / `updatedAt` (`timestamp`)

#### 5. `country_data` (Decision Engine Reference Metrics)
Stores cost and score indicators for all study destinations. Fed by external APIs or manually seeded fallback data.
* **Columns:**
  * `id` (`int unsigned`, Primary Key, Autoincrement)
  * `country` (`varchar(100)`, Not Null, Unique)
  * `countryCode` (`varchar(10)`, Not Null) — ISO country code.
  * `livingCost` (`int`) — Estimated cost of living (in ₹ Lakhs/year).
  * `tuitionCost` (`int`) — Estimated tuition cost (in ₹ Lakhs/year).
  * `safetyScore` (`int`) — Safety score out of 100.
  * `visaEaseScore` (`int`) — Visa success/ease score out of 10.
  * `prScore` (`int`) — Permanent residency feasibility score out of 10.
  * `employmentScore` (`int`) — Post-study employment ease score out of 10.
  * `avgSalary` (`int`) — Average graduate salary (in ₹ Lakhs/year).
  * `dataSource` (`text`) — Tracked source metadata (e.g. Numbeo, QS).
  * `lastVerified` (`timestamp`) — Date of last fetch/update.
  * `nextRefresh` (`timestamp`) — Programmed time for the next 12-hour refresh.
  * `isLive` (`int`, Default: `1`) — `1` if loaded dynamically via API, `0` if using hardcoded fallback.
  * `createdAt` / `updatedAt` (`timestamp`)

#### 6. `decision_profiles` (Decision Engine Input & Cached Recommendations)
Stores inputs user selected in the recommendation wizard and caches the calculated country rankings.
* **Columns:**
  * `id` (`int unsigned`, Primary Key, Autoincrement)
  * `userId` (`int unsigned`, Not Null)
  * `major` (`varchar(50)`)
  * `level` (`enum('UG', 'PG', 'Diploma')`)
  * `budget` (`int`) — Selected budget limit.
  * `ielts` (`varchar(10)`) — English score input.
  * `prPriority` (`enum('High', 'Med', 'Low')`) — Weight of Permanent Residency in recommendation.
  * `academicScore` (`int`) — User's GPA/percentage value.
  * `workExp` (`enum('0', '0-1', '1-3', '3-5', '5+')`) — Range of work experience.
  * `courseType` (`varchar(50)`)
  * `lastResults` (`json`) — Cached recommendation output array containing ordered scores for destinations.
  * `lastComputedAt` (`timestamp`)
  * `createdAt` / `updatedAt` (`timestamp`)

#### 7. `premium_subscriptions` (Payment Gate & Feature Lock Status)
Tracks users who have unlocked premium guides and content.
* **Columns:**
  * `id` (`int unsigned`, Primary Key, Autoincrement)
  * `userId` (`int unsigned`, Not Null, Unique, Foreign Key to `users`)
  * `isActive` (`boolean`, Default: `false`) — Whether premium features are accessible.
  * `plan` (`enum('monthly', 'quarterly', 'yearly')`, Default: `'monthly'`)
  * `amount` (`int`) — Amount paid in paise (INR).
  * `currency` (`varchar(10)`, Default: `'INR'`)
  * `paymentId` (`varchar(255)`) — Transaction token from Razorpay/Stripe.
  * `paymentStatus` (`enum('pending', 'completed', 'failed', 'refunded')`, Default: `'pending'`)
  * `startedAt` / `expiresAt` (`timestamp`) — Active validity window.
  * `createdAt` / `updatedAt` (`timestamp`)

---

## 3. Environment Variables Configuration

Create a `.env` file in the EC2 instance deployment folder with the following variables.

> [!WARNING]
> Do not commit the `.env` file to git. It contains database secrets and OAuth keys.

```ini
# ── Server Mode ──
NODE_ENV=production
PORT=3000

# ── Database ──
# Format: mysql://<username>:<password>@<rds-endpoint-or-localhost>:3306/<db_name>
DATABASE_URL=mysql://db_admin:strong_password@database-1.czs0d6as8.us-east-1.rds.amazonaws.com:3306/kohortconnect

# ── Cryptography ──
APP_ID=kohortconnect_backend_prod
APP_SECRET=your_jwt_signing_secret_min_32_characters

# ── Frontend (exposed to Vite) ──
VITE_KIMI_AUTH_URL=https://auth.kimi.com
VITE_APP_ID=kimi_oauth_app_id

# ── Backend Auth ──
KIMI_AUTH_URL=https://auth.kimi.com
KIMI_OPEN_URL=https://open.kimi.com

# ── Admin Role ──
# Union ID of the first admin account to seed full panel control
OWNER_UNION_ID=u_xxxxxx
```

---

## 4. Step-by-Step EC2 and Nginx Deployment Guide

### Step 1: Provision your AWS EC2 Instance
1. Go to AWS Console → **EC2** → **Launch Instance**.
2. **AMI:** Choose **Ubuntu Server 24.04 LTS (HVM), SSD Volume Type**.
3. **Instance Type:** Choose `t3.small` (2 vCPUs, 2GB RAM) for general usage, or `t3.micro` if testing on AWS Free Tier.
4. **Key Pair:** Generate or upload your ssh `.pem` key.
5. **Network / Security Group Config:**
   * Create a security group allowing:
     * **SSH (Port 22):** Only from your IP.
     * **HTTP (Port 80):** From Anywhere (`0.0.0.0/0`).
     * **HTTPS (Port 443):** From Anywhere (`0.0.0.0/0`).
6. Launch the instance and retrieve its public IP.

---

### Step 2: Provision the MySQL Database

#### Option A: Using AWS RDS MySQL (Recommended)
1. Go to AWS Console → **RDS** → **Create Database**.
2. Select **Standard Create** → **MySQL** (version `8.0.x` or `8.4.x`).
3. Under Templates, choose **Production** (or **Free Tier** if testing).
4. Configure DB instance identifier, Master Username, and Master Password.
5. Under Connectivity, select **VPC** (must match EC2 VPC). Ensure **Public Access** is set to **No** (best security practice).
6. Under Security Group, select or create a security group that allows inbound traffic on **Port 3306** from your EC2 instance's security group *only*.
7. Create database named `kohortconnect`. Use the endpoint link inside your `DATABASE_URL` connection string.

#### Option B: Installing MySQL locally on EC2 (Cheaper alternative)
If you want to host the database on the same EC2 instance to minimize cost, log into EC2 and run:
```bash
sudo apt update
sudo apt install mysql-server -y

# Secure installation
sudo mysql_secure_installation

# Configure database and user
sudo mysql
```
Inside MySQL shell:
```sql
CREATE DATABASE kohortconnect;
CREATE USER 'db_admin'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON kohortconnect.* TO 'db_admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
Your `DATABASE_URL` will be: `mysql://db_admin:strong_password@localhost:3306/kohortconnect`

---

### Step 3: Install Node.js, PM2, and Nginx on EC2
SSH into your instance:
```bash
ssh -i /path/to/key.pem ubuntu@your-ec2-public-ip
```

Once logged in, install system packages:
```bash
# Update Apt repositories
sudo apt update && sudo apt upgrade -y

# Install git, curl, and build tools
sudo apt install -y git curl build-essential

# Install Node.js 20 LTS (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify versions
node -v
npm -v

# Install PM2 globally (Process Manager for node server persistence)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

---

### Step 4: Clone the Project and Build
1. Clone your git repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git /var/www/kohortconnect
   cd /var/www/kohortconnect/app
   ```
2. Create and configure your environment file:
   ```bash
   cp .env.example .env
   nano .env
   ```
   *(Paste your real values, then save and exit with `Ctrl+O`, `Enter`, `Ctrl+X`)*.

3. Install project dependencies:
   ```bash
   npm install
   ```

4. Clean up legacy backup files to ensure a lean project:
   ```bash
   rm -rf api-backup db-backup src-backup
   ```

5. Run migrations to create database tables:
   ```bash
   # Generates schema and pushes it directly to the database
   npm run db:push
   ```

6. Seed initial country metrics for the Decision Engine:
   ```bash
   # Seeds the base parameters for the 22 countries
   npx tsx db/seed-country-data.ts
   ```

7. Build the production package (Vite frontend and Hono backend bundle):
   ```bash
   npm run build
   ```
   *This compiles static assets into `dist/public` and backend server into `dist/boot.js`.*

---

### Step 5: Start Server with PM2
To ensure the backend Hono server stays alive, handles crashes, and restarts on system reboot, run it under PM2:

```bash
# Start the application using PM2 and name it "kohortconnect"
pm2 start dist/boot.js --name "kohortconnect"

# Make PM2 restart on system boot
pm2 startup systemd
```
*(Copy the generated command starting with `sudo env PATH=...` and run it to finalize the startup script)*

```bash
# Save current PM2 processes to backup list
pm2 save
```

Verify the app is running locally on port 3000:
```bash
curl http://localhost:3000
```
*(You should get a response serving index.html or API status)*

---

### Step 6: Configure Nginx as a Reverse Proxy
We will route external HTTP/HTTPS requests arriving at ports 80/443 to the Node.js application running on port 3000.

1. Remove default configuration:
   ```bash
   sudo rm /etc/nginx/sites-enabled/default
   ```

2. Create a new Nginx server configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/kohortconnect
   ```

3. Paste the following configuration block (replace `yourdomain.com` with your actual domain or EC2 public DNS):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       # Max body size (allows file uploads up to 50MB)
       client_max_body_size 50M;

       # Gzip Compression for fast delivery of React bundle
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;

       # Static Files Cache (React assets)
       location /assets/ {
           root /var/www/kohortconnect/app/dist/public;
           expires 30d;
           add_header Cache-Control "public, no-transform";
       }

       # Proxy all requests to local Hono application
       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           
           # Header mappings
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           
           # Pass real IP to server logs
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Error page config
       error_page 502 /502.html;
       location = /502.html {
           root /var/www/kohortconnect/app/dist/public;
       }
   }
   ```

4. Enable the server configuration by creating a symlink:
   ```bash
   sudo ln -s /etc/nginx/sites-available/kohortconnect /etc/nginx/sites-enabled/
   ```

5. Test the configuration for syntax errors and restart Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

### Step 7: Enable SSL/HTTPS with Let's Encrypt (Certbot)
1. Install Certbot and the Nginx plugin:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```
2. Request and install SSL certificates:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
   *(Follow the prompts. Certbot will automatically edit your Nginx configuration to support SSL and redirect all HTTP traffic to HTTPS).*
3. Verify auto-renewal is scheduled:
   ```bash
   sudo systemctl status certbot.timer
   ```

---

### Step 8: Configure Automated 12-Hour Data Refresh
The Decision Engine relies on dynamic country indicators. You can trigger a database refresh via the cron router endpoint by setting up a cron job on the EC2 instance.

1. Open your crontab manager:
   ```bash
   crontab -e
   ```
2. Add the following line to make a cURL request to the local server every 12 hours:
   ```cron
   0 */12 * * * curl -X POST -H "Content-Type: application/json" -d '{}' http://localhost:3000/api/trpc/cron.refresh > /dev/null 2>&1
   ```
   *(If you configured `CRON_SECRET` or equivalent, replace `-d '{}'` with your auth parameters: `-d '{"secret":"your_secret"}'`)*.

---

## 5. Maintenance, Monitoring & Backups

### 1. View Logs
* **Application logs (PM2):**
  ```bash
  pm2 logs kohortconnect
  ```
* **Nginx logs:**
  ```bash
  sudo tail -f /var/log/nginx/access.log
  sudo tail -f /var/log/nginx/error.log
  ```

### 2. Update the Application Code
To deploy code changes:
```bash
cd /var/www/kohortconnect/app
git pull origin main
npm install
npm run build
pm2 restart kohortconnect
```

### 3. Database Backup (mysqldump to S3)
To secure user leads and profile data, write a bash script to perform daily backups:

1. Create a script file `/usr/local/bin/backup-db.sh`:
   ```bash
   #!/bin/bash
   BACKUP_DIR="/opt/backups"
   DATE=$(date +%F)
   FILENAME="$BACKUP_DIR/kohortconnect_$DATE.sql.gz"
   
   mkdir -p $BACKUP_DIR
   
   # Export MySQL structure & data
   mysqldump -h RDS_ENDPOINT_OR_LOCALHOST -u db_admin -p'strong_password' kohortconnect | gzip > $FILENAME
   
   # Optionally copy backup to S3 (requires AWS CLI configuration)
   # aws s3 cp $FILENAME s3://your-backup-bucket/db/
   
   # Delete backups older than 14 days locally
   find $BACKUP_DIR -type f -mtime +14 -delete
   ```
2. Make it executable and add to crontab:
   ```bash
   sudo chmod +x /usr/local/bin/backup-db.sh
   sudo crontab -e
   ```
   Add to the bottom (runs daily at 2:00 AM):
   ```cron
   0 2 * * * /usr/local/bin/backup-db.sh
   ```
