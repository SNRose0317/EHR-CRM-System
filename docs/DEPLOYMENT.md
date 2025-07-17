# EHR/CRM System - Deployment Guide

## 📚 Quick Navigation

- **🆕 New to development?** Start with [Beginner Workflow Guide](./BEGINNER_WORKFLOW.md)
- **📋 Daily reference:** [Workflow Checklist](./WORKFLOW_CHECKLIST.md)
- **⚙️ Technical setup:** Continue reading below

## 🏗️ Environment Architecture

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Local Dev       │ Feature Preview │ Staging         │ Production      │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ localhost:3000  │ preview-xyz     │ staging-url     │ production-url  │
│ Local/Staging DB│ Staging DB      │ Staging DB      │ Production DB   │
│ Debug Mode ON   │ Debug Mode ON   │ Debug Mode OFF  │ Debug Mode OFF  │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

## 🔄 Development Workflow

### 1. Local Development
```bash
# Start local development
npm run dev

# Run tests
npm run test

# Type checking
npm run typecheck
```

### 2. Feature Development
```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Make changes, commit, push
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name

# Create PR to develop branch (triggers preview deployment)
```

### 3. Staging Testing
```bash
# Merge feature to develop (triggers staging deployment)
git checkout develop
git merge feature/your-feature-name
git push origin develop

# Test on staging environment
# URL: https://ehr-crm-system-staging.vercel.app
```

### 4. Production Release
```bash
# Create PR from develop to main
# Requires review and approval
# Merge triggers production deployment
git checkout main
git merge develop
git push origin main
```

## 🌍 Environment Configuration

### Vercel Projects
1. **Production**: `ehr-crm-system`
   - Branch: `main`
   - URL: `https://ehr-crm-system.vercel.app`
   - Database: Production Supabase

2. **Staging**: `ehr-crm-system-staging`  
   - Branch: `develop`
   - URL: `https://ehr-crm-system-staging.vercel.app`
   - Database: Staging Supabase

3. **Preview**: Automatic for feature branches
   - Branch: `feature/*`
   - URL: Auto-generated preview URLs
   - Database: Staging Supabase

### Environment Variables

#### Production Environment
```
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_prod_anon_key
VITE_APP_ENV=production
VITE_ENFORCE_HTTPS=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

#### Staging Environment  
```
VITE_SUPABASE_URL=https://your-staging-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_staging_anon_key
VITE_APP_ENV=staging
VITE_ENFORCE_HTTPS=false
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
```

## 🛡️ Security & Compliance

### Branch Protection Rules (GitHub)
- **Main Branch**:
  - Require PR reviews (minimum 1)
  - Require status checks to pass
  - Require branches to be up to date
  - Restrict push access
  - Require signed commits

- **Develop Branch**:
  - Require PR reviews (optional)
  - Require status checks to pass

### Database Security
- **Production**: Restricted access, encryption at rest
- **Staging**: Test data only, no real patient information
- **Development**: Synthetic/anonymized data only

### Compliance Considerations
- SOC2 Type II certification path
- HIPAA compliance preparation
- Data encryption in transit and at rest
- Audit logging for all database changes
- Access controls and role-based permissions

## 🚀 Deployment Commands

### Manual Deployment (Emergency)
```bash
# Trigger manual deployment
vercel --prod                    # Production
vercel --target staging          # Staging
```

### Rollback Procedure
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback in Vercel dashboard
# Deployments → Previous deployment → Promote to Production
```

## 📊 Monitoring & Health Checks

### Deployment Status
- Monitor builds in Vercel dashboard
- Check deployment logs for errors
- Verify environment variables are set

### Application Health
- Test critical user journeys after deployment
- Verify database connectivity
- Check API endpoints functionality
- Validate authentication flows

### Performance Monitoring
- Core Web Vitals tracking
- Error rate monitoring
- Database performance metrics
- User analytics (production only)

## 🔧 Troubleshooting

### Common Issues
1. **Build Failures**: Check TypeScript errors, missing dependencies
2. **Environment Variables**: Verify all required vars are set
3. **Database Connection**: Check Supabase project status and credentials
4. **Performance Issues**: Monitor Core Web Vitals, optimize bundle size

### Support Contacts
- **Technical Issues**: Development team
- **Infrastructure**: DevOps/Platform team  
- **Security**: Security team
- **Compliance**: Compliance officer

## 🤖 Automated CI/CD Pipeline

### GitHub Actions Workflows
1. **ci.yml** - Comprehensive testing and build pipeline
   - Multi-node testing (Node 18.x, 20.x)
   - Type checking and linting
   - Performance benchmarks
   - Security scanning
   - Build artifacts for staging/production

2. **deploy.yml** - Vercel deployment automation
   - Staging deployment from `develop` branch
   - Production deployment from `main` branch
   - Health checks and release creation
   - PR preview deployments

3. **pr-checks.yml** - Pull request quality gates
   - Commit message validation
   - Code quality checks
   - Bundle size analysis
   - Accessibility testing
   - Auto-labeling

4. **dependencies.yml** - Automated maintenance
   - Weekly security audits
   - License compliance checks
   - Bundle size monitoring
   - Auto-issue creation for maintenance

### Deployment Triggers
- **Staging**: Auto-deploy on push to `develop`
- **Production**: Auto-deploy on push to `main` (requires PR approval)
- **Preview**: Auto-deploy on PR creation

## 📋 Deployment Checklist

### Before Production Deployment ✅ AUTOMATED
- [x] All tests passing (CI pipeline)
- [x] Security review completed (automated audit)
- [x] Performance benchmarks met (performance gates)
- [x] Database migrations tested (CI environment)
- [x] Environment variables configured (automated)
- [x] Rollback plan prepared (Vercel built-in)
- [ ] Stakeholder approval obtained (manual PR review)

### After Production Deployment ✅ AUTOMATED
- [x] Health checks passing (automated post-deploy)
- [x] Critical user journeys tested (health check endpoint)
- [x] Performance metrics within targets (monitoring)
- [x] Error rates normal (Vercel monitoring)
- [x] Database connectivity verified (health check)
- [x] Team notified of deployment (GitHub releases)

---

*This deployment strategy ensures safe, reliable releases for healthcare-critical applications while maintaining development velocity and compliance requirements.*