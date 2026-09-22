# Deploy portfolio + move Newspaper to /newspaper/

Server: `root@104.237.134.188`  
Web root: `/var/www/theartisonian`

## Target routes

| URL | App |
|-----|-----|
| `https://theartisonian.com/` | Portfolio (this repo) |
| `https://theartisonian.com/newspaper/` | LocalNewspaper frontend |
| `https://theartisonian.com/bookclub/` | Bookclub Eliminator (unchanged) |
| `https://oyster.theartisonian.com/` | Oyster (unchanged) |
| `/stories*`, `/ws`, `/uploads*`, … | Newspaper FastAPI on `:8080` |

## 1) Push from your Mac

```bash
# Portfolio
cd ~/Dev/web-apps/Portfolio
git add -A && git commit -m "Add portfolio landing page and Caddy deploy config"
git push origin main

# Newspaper (base path + production API env)
cd ~/Dev/web-apps/LocalNewspaper
git add frontend/vite.config.js frontend/.env.production
git commit -m "Serve SPA under /newspaper/ with root API"
git push origin main
```

## 2) On the server

```bash
ssh root@104.237.134.188
```

### Portfolio at web root

```bash
cd /var/www/theartisonian
git clone git@github.com:SonyaEick/Portfolio.git Portfolio
# or if it already exists:
cd /var/www/theartisonian/Portfolio && git pull origin main
```

### Rebuild Newspaper under /newspaper/

```bash
cd /var/www/theartisonian/LocalNewspaper
git pull origin main
cd frontend
npm install
npm run build
rm -rf /var/www/theartisonian/newspaper-build
cp -a dist /var/www/theartisonian/newspaper-build
```

### Update Caddy

1. Back up the live file: `cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak`
2. Merge `Portfolio/deploy/Caddyfile.theartisonian.com` into `/etc/caddy/Caddyfile`
3. **Keep** your existing `oyster.theartisonian.com { ... }` block
4. Validate and reload:

```bash
caddy fmt --overwrite /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
```

## 3) Verify

```bash
curl -sS https://theartisonian.com/ | head
curl -sS https://theartisonian.com/newspaper/ | head
curl -sS https://theartisonian.com/bookclub/ | head
curl -sS https://theartisonian.com/stories/visible | head
curl -sS https://theartisonian.com/health
```

Root HTML should say **Sonya Eick**. Newspaper should load assets under `/newspaper/assets/...`.
