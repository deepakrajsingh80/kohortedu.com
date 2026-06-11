# Kohortconnect Deployment Analysis & Architecture Guide

## 1. PROJECT OVERVIEW

**Project Type:** Full-stack student counseling platform (study abroad destination decision engine)

**Tech Stack:**
- **Frontend:** React 19 + TypeScript + Tailwind CSS + Vite
- **Backend:** Hono.js (lightweight Node.js framework) + tRPC
- **Database:** MySQL 
- **Runtime:** Node.js 20
- **State Management:** React Query + TanStack Query
- **UI Components:** 40+ shadcn/ui components (Radix UI based)
- **Containerization:** Docker (multi-stage build)

---

## 2. DATABASE & DATA ARCHITECTURE

### What Data Is Stored?

The system stores 8 main data entities:

1. **Leads** - Student inquiry form submissions
   - Name, email, phone, destination preference, course interest, budget
   - Lead scoring/tracking (new → contacted → qualified → converted)

2. **Users** - Authentication records
   - Union ID (from Kimi Auth), email, avatar, role (user/admin)
   - Created via OAuth with Kimi platform

3. **Student Profiles** - Detailed student information
   - GPA, English proficiency, work experience, budget, preferences
   - Updated by users on their dashboard

4. **Applications** - University application tracker
   - University, course, status (researching → offer → accepted)
   - Deadline tracking and notes

5. **Country Data** - Decision engine reference data
   - Cost of living, tuition, safety score, visa ease, PR score
   - Employment opportunities, average salaries
   - Data sources tracked with refresh timestamps (12-hour intervals)
   - **Important:** Can be live (from API) or fallback (cached)

6. **Decision Profiles** - Cached AI engine results
   - User inputs: major, budget, IELTS score, PR priority
   - Cached rankings for performance

7. **Premium Subscriptions** - Payment tracking
   - Plans: monthly, quarterly, yearly
   - Payment status integration (ready for Razorpay/Stripe)

8. **Country-specific Premium Content** - Gated content
   - Life in country, student opportunities, salaries by stream, PR steps
   - Available 12 destinations (USA, Canada, UK, Australia, Germany, Ireland, Dubai, Singapore, France, Portugal, Spain, New Zealand)

### Database Size Estimate:
- **Current:** ~10,000-50,000 records (depending on lead volume)
- **Scalability:** MySQL can handle 1M+ records at this schema level

---

## 3. DEPLOYMENT REQUIREMENTS

### Prerequisites:
```
✅ Node.js 20+
✅ MySQL 8.0+ server
✅ npm or yarn
✅ Docker (optional, for containerization)
```

### Environment Variables Required:
```
# Backend
DATABASE_URL=mysql://user:password@host:port/kohortconnect_db
APP_ID=your_app_id
APP_SECRET=your_jwt_secret

# Frontend
VITE_KIMI_AUTH_URL=https://auth.kimi.com
VITE_APP_ID=your_oauth_app_id

# Backend Auth
KIMI_AUTH_URL=https://auth.kimi.com
KIMI_OPEN_URL=https://open.kimi.com

# Admin
OWNER_UNION_ID=your_admin_id
```

### Build Process:
```bash
npm run build
# Creates: dist/public (React assets) + dist/boot.js (Node server)
```

---

## 4. DEPLOYMENT OPTIONS & RECOMMENDATIONS

### Option 1: ⭐ RECOMMENDED - Vercel (Best for Most Users)
**Why:** Zero-config, automatic scaling, built-in database integrations

**Pros:**
- ✅ Free tier available ($0-$25/month)
- ✅ Built-in MySQL (PlanetScale) integration
- ✅ Automatic SSL/HTTPS
- ✅ CI/CD included (GitHub/GitLab auto-deploy)
- ✅ Performance: Global CDN
- ✅ Easy environment variable management

**Cons:**
- ❌ Vendor lock-in
- ❌ Function limits (serverless model)

**Cost:** $0-50/month
**Database:** PlanetScale MySQL ($9-200/month based on scale)

**Setup:**
```bash
1. Push code to GitHub
2. Import repo to Vercel
3. Add DATABASE_URL in Vercel dashboard
4. Deploy (automatic on git push)
```

---

### Option 2: 🔥 BEST FOR CONTROL - Railway.app
**Why:** Docker-friendly, manual control, affordable

**Pros:**
- ✅ Simple Docker deployment
- ✅ $5 credits/month free
- ✅ MySQL database included
- ✅ Full server control
- ✅ Great for learning/small projects

**Cons:**
- ❌ Manual scaling required
- ❌ No global CDN

**Cost:** $5-20/month (includes DB)
**Time to deploy:** 5 minutes

**Setup:**
```bash
1. Connect GitHub repo
2. Railway auto-detects Dockerfile
3. Add environment variables
4. Deploy
```

---

### Option 3: AWS (Full Enterprise Control)
**Why:** Scaling, multi-region, advanced features

**Services Needed:**
- **Compute:** EC2 (t3.micro $7-15/month) OR ECS Fargate (serverless)
- **Database:** RDS MySQL (db.t3.micro $30-60/month)
- **Storage:** S3 for media ($0.023/GB)
- **CDN:** CloudFront ($0.085/GB)

**Pros:**
- ✅ Ultimate scalability
- ✅ Multi-region support
- ✅ Advanced security features
- ✅ 1-year free tier

**Cons:**
- ❌ Complex setup (1-2 days learning curve)
- ❌ Overkill for MVP

**Cost:** $50-200/month (minimum)
**Time to deploy:** 1-2 hours

---

### Option 4: Docker Compose (Local/VPS)
**Why:** Maximum control, cheapest if you have a server

**Pros:**
- ✅ Works on any Linux server ($3-10/month VPS)
- ✅ Full control over everything
- ✅ Cheap

**Cons:**
- ❌ Requires Linux/DevOps knowledge
- ❌ No auto-scaling
- ❌ You manage updates, backups, security

**Cost:** $3-10/month VPS + your time
**Time to deploy:** 30 minutes

---

## 5. RECOMMENDED DEPLOYMENT PATH

### **Phase 1: Development/Testing (Right Now)**
```
Deployment: Railway.app (free tier)
Database: Railway PostgreSQL/MySQL
Cost: $0/month
Purpose: Testing before production
```

### **Phase 2: Production (Current)**
```
Deployment: Vercel or Railway
Database: PlanetScale MySQL
Cost: $10-30/month total
Supports: 1-10K active users
```

### **Phase 3: Scale (When needed)**
```
Deployment: AWS or Railway
Database: RDS MySQL
Cost: $100-500/month
Supports: 100K+ active users
```

---

## 6. CODE QUALITY ASSESSMENT

### 📊 Overall: **7/10 - GOOD (Well-organized, but needs refinement)**

### Strengths ✅:
1. **Clear separation of concerns**
   - `src/` (React UI), `api/` (Hono backend), `db/` (Drizzle ORM)
   
2. **TypeScript throughout** - Zero JavaScript
   - Type safety in all layers
   
3. **Proper database ORM** - Drizzle ORM
   - Migrations tracked, type-safe queries
   
4. **Modern UI framework** - shadcn/ui components
   - Consistent design system
   
5. **API standardization** - tRPC
   - End-to-end type safety (backend ↔ frontend)
   
6. **Docker ready** - Multi-stage production builds
   
7. **Comprehensive data model** - 8 well-designed tables

### Weaknesses ⚠️:
1. **Backup folders** (api-backup, db-backup, src-backup)
   - ❌ Should not be in production
   - Should use Git history instead
   
2. **No clear versioning**
   - ❌ No semantic versioning (1.0.0, 1.1.0, etc.)
   - No CHANGELOG.md
   
3. **Kimi platform dependency**
   - ⚠️ Tightly coupled OAuth (vendor lock-in)
   - Hard to migrate to other auth systems
   
4. **Missing observability**
   - ❌ No logging framework (Winston, Pino)
   - No monitoring/alerting setup
   - No error tracking (Sentry)
   
5. **Limited testing**
   - ⚠️ Vitest configured but few tests
   - No integration tests
   
6. **No API documentation**
   - ❌ No Swagger/OpenAPI docs
   - tRPC introspection should be added
   
7. **Hardcoded values**
   - Some country/course data might be hard-coded
   - Should use database/config files

### Recommendation:
**Before production deployment, fix:**
1. Remove backup folders (`git rm --cached api-backup db-backup src-backup`)
2. Add logging (Winston or Pino)
3. Add error tracking (Sentry free tier)
4. Create `.env.production` template
5. Add health check endpoint (`GET /health`)
6. Document API endpoints

---

## 7. ABOUT v2, v3 STRUCTURE

**These are NOT version branches** - they're historical backups:

```
app/
├── api/          ← Current/Active
├── api-backup/   ← Old version (don't touch)
├── db/           ← Current schema
├── db-backup/    ← Old schema
├── src/          ← Current frontend
├── src-backup/   ← Old frontend
```

**Action:** Remove these backups after production deployment:
```bash
cd app
git rm -r api-backup db-backup src-backup
git commit -m "Remove backup folders"
git push
```

---

## 8. QUICK START TO DEPLOYMENT

### Step 1: Test Locally ✅
```bash
cd app
npm install
npm run build
npm start
# Visit http://localhost:3000
```

### Step 2: Choose Platform
- **Fastest:** Railway.app (recommended for first-time)
- **Scalable:** Vercel
- **Enterprise:** AWS

### Step 3: Prepare for Production
```bash
# Create .env.production with actual values
cp .env.example .env.production

# Update with real database URL
# Update with real OAuth credentials
# Update OWNER_UNION_ID with admin ID
```

### Step 4: Deploy
**For Railway:**
```bash
1. Go to railway.app
2. Create new project
3. Connect GitHub repo
4. Add environment variables
5. Deploy (automatic)
```

---

## 9. ESTIMATED COSTS (Monthly)

| Component | Railway | Vercel | AWS |
|-----------|---------|--------|-----|
| Compute | $5-20 | $0-50 | $20-100 |
| Database | Included | $9-200 | $30-200 |
| Storage | Included | $0 | $0.10 |
| CDN | None | Included | $50 |
| **Total** | **$5-20** | **$10-250** | **$100-350** |

---

## 10. DATABASE BACKUP STRATEGY

**Before production, implement backups:**

```bash
# Daily automatic backups (Railway/AWS handle this)
# Weekly manual export
mysqldump -u user -p database_name > backup_$(date +%Y%m%d).sql

# Store in S3 or Google Drive
```

---

## NEXT STEPS

1. **Fix code quality issues** (15 min)
   - Remove backup folders
   - Add logging

2. **Set up production database** (30 min)
   - Create MySQL instance on Railway/AWS
   - Run migrations: `npm run db:migrate`

3. **Deploy to staging** (30 min)
   - Test on Railway.app free tier
   - Verify all APIs work

4. **Go to production** (15 min)
   - Deploy to final platform
   - Monitor for errors

**Total time:** ~1.5-2 hours ⏱️

---

Would you like help with any specific step? I can assist with:
- Setting up Railway/Vercel
- Fixing code quality issues
- Running the project locally
- Creating production environment config
