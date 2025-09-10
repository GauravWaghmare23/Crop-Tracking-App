# TODO: Fix All Code Errors in the Application

## Steps to Complete

- [x] 1. Remove cropId as required field from user model
- [x] 2. Fix Signup Page - Fix JSX errors and input handlers
- [x] 3. Fix Farmer Crop Add API - Remove cropId assignment to user
- [x] 4. Fix Farmer Dashboard - Generate UUID for cropId
- [x] 5. Verify Login API
- [x] 6. Verify Logout API
- [x] 7. Verify User Read API
- [x] 8. Verify Distributor Crop APIs
- [x] 9. Verify Retailer Crop APIs
- [x] 10. Verify QR Helper
- [x] 11. Verify AllData Page
- [x] 12. Verify Crops Data Get API
- [ ] 13. Test Signup Flow
- [ ] 14. Test Login Flow
- [ ] 15. Test Crop Addition Flow
- [ ] 16. Test Crop Fetch Flow
- [ ] 17. Test QR Code Generation
- [ ] 18. Test AllData QR Scanning

## Information Gathered

- User model has cropId as required, causing signup failures
- Signup page has potential JSX issues
- Farmer crop add API assigns cropId to user, which is incorrect
- Farmer dashboard needs UUID generation for cropId
- APIs for login, logout, read, distributor, retailer, QR helper need verification
- Testing required for all flows

## Plan

- Edit userModel.js to remove cropId requirement
- Edit signup page to fix any JSX/input handler issues
- Edit farmer add API to remove cropId assignment
- Edit farmer dashboard to generate UUID for cropId
- Verify all APIs are correct
- Test all flows to ensure no errors

## Dependent Files

- src/model/userModel.js
- src/app/signup/page.tsx
- src/app/api/crops/farmer/add/route.ts
- src/app/farmerDashboard/[username]/page.tsx
- src/app/api/users/login/route.ts
- src/app/api/users/logout/route.ts
- src/app/api/users/read/route.ts
- src/app/api/crops/distributor/add/route.ts
- src/app/api/crops/distributor/fetch/route.ts
- src/app/api/crops/retailer/add/route.ts
- src/app/api/crops/retailer/fetch/route.ts
- src/helpers/generateQR.ts
- src/app/allData/page.tsx
- src/app/api/crops/data/get/route.ts

## Followup Steps

- After fixes, test signup, login, crop addition, fetch, QR generation
- Ensure no runtime errors
- Verify all APIs work correctly
