<div align="center">

# AkuMalazz

**Portfolio gamer & streamer Indonesia.** Satu halaman: live streaming, gameplay, highlight, dan komunitas Discord dengan stats realtime YouTube & TikTok.

![TanStack Router](https://img.shields.io/badge/TanStack%20Router-1.x-000000?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## What you can do

- **Stats realtime:** jumlah subscribers, followers, dan likes diambil langsung dari YouTube & TikTok lewat function di `/api`, tanpa API key.
- **Tentang & konten:** cerita singkat, jenis konten (gameplay, live, series, shorts), dan komunitas Discord.
- **Dukungan:** link Saweria untuk donasi, plus semua kanal sosial dalam satu tempat.

## Built with

| Technology | What it does here |
| --- | --- |
| [TanStack Router](https://tanstack.com/router) + [TanStack Query](https://tanstack.com/query) | File-based routing, preloading, dan cache untuk polling stats. |
| [Vite](https://vite.dev) 7 | Build tool dan dev server. |
| [Tailwind CSS](https://tailwindcss.com) 4 | Utility styling dengan tema gelap minimal plus aksen oranye. |
| [ogl](https://github.com/oframe/ogl) | WebGL "Lightfall" shader sebagai dekorasi hero. |
| [GSAP](https://gsap.com) | Efek kartu hero (decay + parallax) ngikutin kursor. |
| [Vercel](https://vercel.com) | Hosting + serverless functions untuk scraping stats. |

## Screens

| Hero | Stats |
| --- | --- |
| Lightfall shader, kartu ilustrasi dengan efek decay, CTA utama | Kartu YouTube & TikTok dengan angka realtime |

## Getting started

### Prerequisites

- Node.js 20 atau lebih baru
- Paket manager: `npm` (atau `bun`)

### 1. Install

```bash
git clone https://github.com/RizkyPutraIchfiandra/AkuMalazzz.git
cd AkuMalazzz
npm install
```

### 2. Run

```bash
npm run dev
```

### 3. Build

```bash
npm run build
npm run preview   # pratinjau hasil build
```

## How the stats work

- `api/youtube.ts` dan `api/tiktok.ts` mengambil halaman profil publik dan mengekstrak angka langsung dari HTML (tanpa API key, tanpa biaya).
- Cache `public, max-age=60` di header respons; UI memuat ulang tiap 60 detik saat tab aktif, dan tetap fitur lengkap saat offline/fallback (angka terakhir disimpan di state).
- Angka didapat dari halaman profil, jadi kecil kemungkinannya akurat 100% — cukup untuk tampilan publik.

## Project structure

```
.
├── api/                         Serverless functions (scraping stats)
│   ├── youtube.ts
│   └── tiktok.ts
├── public/                      icon (favicon)
├── src/
│   ├── components/
│   │   ├── site/                Hero, header, ticker, lightfall, decay card, ...
│   │   └── BrandIcons.tsx       SVG logo YouTube, TikTok, Instagram, Saweria, Discord
│   ├── hooks/                   useReveal (scroll reveal)
│   ├── lib/                     site config, formatter, helper openExternal
│   └── routes/                  index (beranda), __root (shell + 404/error)
└── vercel.json                  Hosting + rewrites /api
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Jalankan dev server |
| `npm run build` | Build produksi |
| `npm run preview` | Pratinjau build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## License

Bebas digunakan. Dibuat untuk personal brand AkuMalazz.
