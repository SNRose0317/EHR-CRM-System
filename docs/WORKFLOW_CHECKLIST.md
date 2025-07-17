# 📋 Daily Development Workflow Checklist

*Print this out or bookmark it for daily reference*

## ✅ Before Starting Work

- [ ] `git checkout develop`
- [ ] `git pull origin develop`  
- [ ] `git checkout -b feature/descriptive-name`
- [ ] `npm run dev` (start local server)
- [ ] Check `http://localhost:3000` loads correctly

## ✅ While Working

- [ ] Save files frequently (Ctrl+S / Cmd+S)
- [ ] Test changes in browser regularly
- [ ] Commit small, logical changes often
- [ ] Use good commit messages: `feat:`, `fix:`, `docs:`

## ✅ Before Committing

- [ ] `git status` (check what files changed)
- [ ] **CRITICAL:** Verify no `.env.local` or secrets in staged files
- [ ] Test the feature works correctly
- [ ] `npm run typecheck` (check for TypeScript errors)
- [ ] `npm run lint` (check code style)

## ✅ Creating a Pull Request

- [ ] `git push origin feature/branch-name`
- [ ] Go to GitHub and create pull request
- [ ] Write clear title and description
- [ ] Wait for automated checks to pass (green checkmarks)
- [ ] Request review from teammate
- [ ] Test the preview URL when available

## ✅ After PR is Merged

- [ ] Test your feature on staging: `https://ehr-crm-system-staging.vercel.app`
- [ ] Switch back to develop: `git checkout develop`
- [ ] Pull latest changes: `git pull origin develop`
- [ ] Delete your feature branch: `git branch -d feature/branch-name`

## 🚨 Emergency Checklist

**If something breaks:**

- [ ] Don't panic - this is normal!
- [ ] Check if it's only broken locally or everywhere
- [ ] Look at error messages carefully
- [ ] Ask for help in team chat
- [ ] If production is broken, notify team immediately

**If you think you committed a secret:**

- [ ] STOP - don't push to GitHub
- [ ] Check with `git status` 
- [ ] Remove the secret from code
- [ ] Commit the fix
- [ ] If already pushed, get help immediately

## 📞 When to Ask for Help

✅ **Always ask for help with:**
- Anything involving production environment
- Security-related questions
- If automated checks fail and you don't understand why
- If you're stuck for more than 30 minutes
- If you accidentally committed secrets

❌ **Try these first:**
- Read error messages carefully
- Check the [Beginner Workflow Guide](./BEGINNER_WORKFLOW.md)
- Google the exact error message
- Check if your local server is running

## 🎯 Success Metrics

**You're doing great if:**
- [ ] Your pull requests get approved quickly
- [ ] Automated checks pass consistently
- [ ] You catch and fix issues before they reach staging
- [ ] You're committing multiple times per day
- [ ] You're using descriptive commit messages

---

*Keep this checklist handy until the workflow becomes second nature!*