# mipit-mock-pix-ui

> Panel de control del mock PIX + frontend de simulación. Parte del PoC MiPIT
> ([overview en mipit-docs](https://github.com/MIPIT-PoC/mipit-docs)).

## Propósito

Frontend Next.js 14 dedicado al riel **PIX (Brasil 🇧🇷)** que cumple 3 roles:

1. **Panel admin del mock** — controla el behavior del mock PIX (rate de rechazo, latencia
   simulada, forzar `reject-next` / `timeout-next`, ver estadísticas en vivo).
2. **Simulación local** — endpoint `/api/simulate/pix` en el mock-server que devuelve
   pass/fail aleatorio sin pasar por el pipeline ISO 20022.
3. **Simulación internacional (cross-border)** — POST al core (`/payments`) con JWT, el
   pago pasa por el pipeline pacs.008-derivado completo.

> ⚠️ **Honestidad académica (Audit 4 §14.1)**: el modo **Local** NO pasa por el pipeline
> ISO 20022 — es un atajo de demo. El flujo real cross-border vive en la pestaña
> **Internacional** (POST al core, JWT, canónico pacs.008, routing, RabbitMQ, adapter, ack).

## Puerto

| Entorno | URL |
|---|---|
| Docker compose | `http://localhost:3001` |
| Dev local | `npm run dev` → `http://localhost:3001` |
| Container interno | `:3000` (Next.js standalone default) |

El puerto host `3001` lo libera `mipit-ui` (UI principal) — ver Audit 4 §14.

## Endpoints que consume

| Endpoint | Quién lo expone | Auth |
|---|---|---|
| `GET /admin/stats` | mock-server (`:9001`) | No |
| `GET /admin/config` | mock-server (`:9001`) | No |
| `POST /admin/config` | mock-server (`:9001`) | No |
| `POST /admin/reject-next` | mock-server (`:9001`) | No |
| `POST /admin/timeout-next` | mock-server (`:9001`) | No |
| `POST /admin/reset` | mock-server (`:9001`) | No |
| `POST /api/simulate/pix` | mock-server (`:9001`) | No (modo Local) |
| `POST /auth/token` | core (`:8080`) | No |
| `POST /payments` | core (`:8080`) | **Bearer JWT** |
| `GET /payments/:id` | core (`:8080`) | **Bearer JWT** |

## Build args (Next.js bakea NEXT_PUBLIC_* en build time)

Pasar como `--build-arg` o desde `docker-compose.yml`:

```yaml
build:
  args:
    NEXT_PUBLIC_API_BASE_URL: http://localhost:8080
    NEXT_PUBLIC_ADAPTER_URL: http://localhost:9001
```

| Var | Default | Qué significa |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080` | URL del core (auth + payments) |
| `NEXT_PUBLIC_ADAPTER_URL` | `http://localhost:9001` | URL del mock-server PIX (admin + simulate) |

## Stack

| Componente | Versión |
|---|---|
| Next.js | 14.2 |
| React | 18.3 |
| TypeScript | 5+ |
| Tailwind | 4.x |
| sonner (toasts) | 1.3 |
| react-hook-form + zod | 7.51 + 3.22 |
| lucide-react | 0.344 |

## Desarrollo local

```bash
npm install
npm run dev          # http://localhost:3001
npm run lint
npm run type-check
npm run build && npm start   # production mode
```

## Estructura

```
src/app/
├── globals.css      # Tailwind tokens
├── layout.tsx       # Toaster mount
└── page.tsx         # Single-page app con 3 tabs (Local / Intl / Simulator)
```

## Riesgo de demo

> Audit 4 D5-001/002 — al usar este panel en demo:
> 1. **Decir antes** que el modo Local es atajo, no pipeline real.
> 2. Mock-server bind a `127.0.0.1` (Audit 4 Y6) impide que un panelista en la LAN
>    dispare `/admin/reject-next` durante la demo desde otro dispositivo.

## Cross-ref

- Plan maestro: `mipit-docs/audits/AUDITORIA-4-2026-05-20.md`
- Demo script: `mipit-docs/demo-runbook/defense-script-10min.md`
- Limitaciones: `mipit-docs/LIMITATIONS.md` §14
