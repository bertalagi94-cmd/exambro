# Exambro Admin (Next.js) — Ready for Vercel

This project is a minimal, ready-to-deploy Next.js app with:

- Admin and Pengawas login (hardcoded credentials: admin/admin and Pengawas/TM81)
- Admin can add schedules with barcode image upload (Cloudinary)
- Pengawas can select class/date/subject and view barcode + token
- Storage via Vercel KV (lib/kv.js) — set VERCEL_KV_URL in Vercel env
- Cloudinary required for image uploads

## Environment variables (set in Vercel dashboard)
```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
VERCEL_KV_URL=...
NEXT_PUBLIC_BASE_URL=https://your-deploy-url.vercel.app
```

## Deploy
1. Push to a Git repository.
2. Connect the repo to Vercel.
3. Add environment variables in Vercel.
4. Deploy.

Login:
- Admin: username `admin` / password `admin`
- Pengawas: username `Pengawas` / password `TM81`