# DMG downloads

The `.dmg` installers are **gitignored** (they’re too large for the repo). Host them elsewhere and point the download page at those URLs via env vars.

## 1. Host the DMGs

Use **one** of these:

### Option A: GitHub Releases (simple, free)

1. Create a release in your repo (e.g. `v1.0.0`).
2. Attach `0studio-1.0.0-arm64.dmg` and `0studio-1.0.0.dmg` to the release.
3. Copy the “direct” asset URLs (right‑click → Copy link address on each file).

Example:
- `https://github.com/your-org/your-repo/releases/download/v1.0.0/0studio-1.0.0-arm64.dmg`
- `https://github.com/your-org/your-repo/releases/download/v1.0.0/0studio-1.0.0.dmg`

### Option B: S3 / R2 / similar

1. Upload both DMGs to a bucket.
2. Make them publicly readable (or use signed URLs if you prefer).
3. Use the public object URLs (e.g. `https://your-bucket.s3.region.amazonaws.com/0studio-1.0.0-arm64.dmg`).

### Option C: Vercel Blob

1. Install `@vercel/blob` and upload the DMGs via the dashboard or CLI.
2. Use the returned blob URLs.

## 2. Set Vercel env vars

In your Vercel project: **Settings → Environment Variables**, add:

| Name | Value |
|------|--------|
| `VITE_DOWNLOAD_ARM64_URL` | Full URL to `0studio-1.0.0-arm64.dmg` |
| `VITE_DOWNLOAD_INTEL_URL` | Full URL to `0studio-1.0.0.dmg` |

Redeploy after changing env vars so the build picks them up.

## 3. Local development

- **With external URLs:** Add the same variables to `frontend/.env.local` (and keep `.env.local` gitignored). The download page will use those URLs.
- **With local DMGs:** Put the DMGs in `frontend/public/` and *don’t* set the env vars. The app falls back to `/0studio-1.0.0-arm64.dmg` and `/0studio-1.0.0.dmg` (only works if the files are present).

## Summary

- DMGs → **gitignored**, hosted externally.
- Download page → uses `VITE_DOWNLOAD_ARM64_URL` and `VITE_DOWNLOAD_INTEL_URL` when set, else local paths.
- Vercel → set those env vars to your hosted URLs, then deploy.
