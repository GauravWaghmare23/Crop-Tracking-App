# TODO: Fix Next.js Build Errors

## Overview
Fix ESLint errors causing build failure on Netlify. Errors include no-explicit-any, no-unused-vars, no-unescaped-entities, no-html-link-for-pages, no-sync-scripts, exhaustive-deps.

## Files to Fix

### src/app/allData/page.tsx
- [x] Change `interface CropData { [key: string]: any; }` to `[key: string]: unknown;`
- [x] Remove unused `file` state variable
- [x] Remove unused `err` in scanImage catch block
- [x] Change `catch (err: any)` to `catch (error: unknown)` and handle error properly
- [x] Remove synchronous `<script src="https://cdn.tailwindcss.com"></script>` tag

### API Routes (all similar)
- [x] src/app/api/crops/distributor/add/route.ts: Change `let user: any = null;` to `let user: User | null = null;` (import User type), `decodedToken as any` to `as { id: string }`, `catch (error: unknown)`
- [ ] src/app/api/crops/distributor/fetch/route.ts: Same as above
- [ ] src/app/api/crops/farmer/add/route.ts: Same
- [ ] src/app/api/crops/farmer/fetch/route.ts: Same
- [ ] src/app/api/crops/retailer/add/route.ts: Same
- [ ] src/app/api/crops/retailer/fetch/route.ts: Same

### Page Components
- [ ] src/app/distributorDashboard/[username]/page.tsx: Remove unused `AnimatePresence`, change any types, escape `'`
- [ ] src/app/farmerDashboard/[username]/page.tsx: Change any types, escape `'`
- [ ] src/app/login/page.tsx: Change any type, escape `'`
- [ ] src/app/page.tsx: Escape all `"` in JSX
- [ ] src/app/retailerDashboard/[username]/page.tsx: Remove unused `username`, add missing dependency to useEffect, change any types, escape `'`
- [ ] src/app/signup/page.tsx: Change any type

### Components
- [ ] src/components/navbar.tsx: Import `Link` from 'next/link', replace `<a href="/">` with `<Link href="/">`

### Models
- [ ] src/model/userModel.js: Remove unused `mongoose` and `type` imports

## Followup Steps
- [ ] Run `npm run build` to verify all errors are fixed
- [ ] Test the app locally if needed
