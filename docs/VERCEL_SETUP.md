# Vercel Environment Setup - Complete Configuration

## 📚 For Developers

- **🆕 New to the workflow?** Start with [Beginner Workflow Guide](./BEGINNER_WORKFLOW.md)
- **📋 Need daily reference?** Use [Workflow Checklist](./WORKFLOW_CHECKLIST.md)

## 🎯 Environment Architecture Created

I've set up your complete staging/production environment structure:

### ✅ Supabase Projects Created
1. **Production**: `wazdaloyxlsxnmuhgtms` (Med Sig builder) 
2. **Staging**: `ntqdoycuwbrfxtktnbrg` (EHR-CRM-Staging) - **$10/month**

## 🚀 Vercel Configuration Required

### 1. Production Deployment (Existing)
- **Project Name**: `ehr-crm-system`
- **Git Branch**: `main`
- **Build Command**: `cd packages/platform-core && pnpm run build`
- **Output Directory**: `packages/platform-core/dist`
- **Install Command**: `pnpm install`

**Environment Variables (Production):**
```
VITE_SUPABASE_URL=https://wazdaloyxlsxnmuhgtms.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhemRhbG95eGxzeG5tdWhndG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTEyNjksImV4cCI6MjA2MzM2NzI2OX0.xQrWpTwvh4VabtOoS78VjYVjjDz6zfCaKq-aJ9QsIlU
VITE_APP_ENV=production
VITE_ENFORCE_HTTPS=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

### 2. Staging Deployment (NEW - Need to Create)
- **Project Name**: `ehr-crm-system-staging`  
- **Git Branch**: `develop`
- **Build Command**: `cd packages/platform-core && pnpm run build`
- **Output Directory**: `packages/platform-core/dist` 
- **Install Command**: `pnpm install`

**Environment Variables (Staging):**
```
VITE_SUPABASE_URL=https://ntqdoycuwbrfxtktnbrg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cWRveWN1d2JyZnh0a3RuYnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3OTA5MDUsImV4cCI6MjA2ODM2NjkwNX0.ze3pi-XDYkPvtIxi1gToJm8vGuc08POFwTLTPTqTXTM
VITE_APP_ENV=staging
VITE_ENFORCE_HTTPS=false
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
```

## 📋 Step-by-Step Vercel Setup

### Step 1: Create Staging Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"** 
4. Choose: `SNRose0317/EHR-CRM-System`
5. Configure as:
   - **Project Name**: `ehr-crm-system-staging`
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave empty)
   - **Build and Output Settings**:
     - **Build Command**: `cd packages/platform-core && pnpm run build`
     - **Output Directory**: `packages/platform-core/dist`
     - **Install Command**: `pnpm install`

### Step 2: Configure Git Integration
1. In the new staging project → **Settings** → **Git**
2. **Production Branch**: Change from `main` to `develop`
3. **Enable** automatic deployments from `develop` branch

### Step 3: Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add each variable from the staging list above:
   - Variable: `VITE_SUPABASE_URL`
   - Value: `https://ntqdoycuwbrfxtktnbrg.supabase.co`
   - Environments: ✅ Production ✅ Preview ✅ Development
3. Repeat for all staging environment variables

### Step 4: Update Production Project
1. Go to your existing production project
2. **Settings** → **Environment Variables**
3. Update/add production environment variables listed above

## 🔒 GitHub Branch Protection

### Step 1: Protect Main Branch
1. Go to [GitHub Repository](https://github.com/SNRose0317/EHR-CRM-System)
2. **Settings** → **Branches**
3. **Add protection rule** for `main`:
   - Branch name pattern: `main`
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: 1
     - ✅ Require review from code owners
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
   - ✅ **Require conversation resolution before merging**
   - ✅ **Include administrators**

### Step 2: Configure Develop Branch (Optional)
1. **Add protection rule** for `develop`:
   - Branch name pattern: `develop`
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**

## 🔄 Complete Workflow Test

### Test the Pipeline:
1. **Create Feature Branch**:
   ```bash
   git checkout develop
   git checkout -b feature/test-deployment
   echo "# Test" > test.md
   git add test.md
   git commit -m "feat: test deployment pipeline"
   git push origin feature/test-deployment
   ```

2. **Create PR to Develop** → Should trigger staging deployment
3. **Create PR from Develop to Main** → Should trigger production deployment

## 🎯 Expected Results

After completing setup:
- ✅ **Staging URL**: `https://ehr-crm-system-staging.vercel.app` (develop branch)
- ✅ **Production URL**: `https://ehr-crm-system.vercel.app` (main branch)  
- ✅ **Feature Previews**: Auto-generated URLs for feature branches
- ✅ **Database Separation**: Staging and production have separate Supabase projects
- ✅ **Protected Deployments**: Main branch requires PR approval

## 🚨 Important Notes

1. **Staging Database Cost**: The new staging Supabase project costs **$10/month**
2. **Database Setup**: You'll need to run migrations on the staging database
3. **Environment Isolation**: Staging and production are completely separate
4. **Security**: Never use production data in staging environment

## 🎉 Verification Checklist

- [ ] Staging Vercel project created and deploying from `develop` branch
- [ ] Production Vercel project updated with proper environment variables
- [ ] GitHub branch protection rules applied to `main` branch
- [ ] Staging database accessible and configured
- [ ] Test deployment pipeline with feature branch
- [ ] Verify both environments work independently

---

*Once completed, you'll have a professional-grade deployment pipeline suitable for healthcare applications with proper environment separation and security controls.*