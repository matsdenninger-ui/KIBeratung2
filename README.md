# Claude-Proxy — Einrichtung

Dieser Cloudflare Worker hält deinen Anthropic-API-Key. Die Website ruft nur
den Worker auf, nie Anthropic direkt. Damit ist der Key für Besucher
unsichtbar — auch im Quelltext, in den Entwicklertools und im Netzwerk-Tab.

Kosten: Cloudflare Workers sind bis 100.000 Anfragen/Tag kostenlos. Du zahlst
nur die Anthropic-Tokens.

## Einmalige Einrichtung (ca. 10 Minuten)

### 1. Cloudflare-Konto und CLI

Kostenloses Konto auf [dash.cloudflare.com](https://dash.cloudflare.com) anlegen, dann:

```bash
npm install -g wrangler
```

```bash
wrangler login
```

### 2. Speicher für das Rate-Limiting anlegen

```bash
wrangler kv namespace create RATE_LIMIT
```

Der Befehl gibt eine `id` aus. Diese in `wrangler.toml` bei
`HIER_DIE_KV_ID_EINTRAGEN` eintragen.

### 3. Erlaubte Domain eintragen

In `wrangler.toml` bei `ALLOWED_ORIGINS` deine echte Website-Domain eintragen,
zum Beispiel:

```
ALLOWED_ORIGINS = "https://mats-denninger.de,https://www.mats-denninger.de"
```

Nur diese Domains dürfen den Proxy aufrufen. Ohne diesen Eintrag könnte
jemand deine Demo auf seiner eigenen Seite einbinden.

### 4. API-Key als Secret hinterlegen

```bash
wrangler secret put ANTHROPIC_API_KEY
```

Der Key wird abgefragt und verschlüsselt bei Cloudflare gespeichert. Er steht
in keiner Datei und ist danach auch im Dashboard nicht mehr lesbar.

### 5. Veröffentlichen

```bash
wrangler deploy
```

Am Ende erscheint eine URL wie
`https://claude-demo-proxy.dein-name.workers.dev`.

### 6. URL in die Website eintragen

In `index.html` ganz oben im `<script>`-Block:

```js
const WORKER_URL = "https://claude-demo-proxy.dein-name.workers.dev";
```

Solange dort ein leerer String steht, zeigt die Demo automatisch die
vorbereitete Beispiel-Antwort — die Seite funktioniert also auch ohne Worker.

## Lokal testen

```bash
wrangler dev
```

## Eingebauter Schutz

| Schutz | Wirkung |
|---|---|
| Key als Secret | Verlässt den Server nie |
| Domain-Sperre | Nur deine Website darf den Proxy aufrufen |
| Prompt serverseitig | Besucher können den Prompt nicht austauschen |
| 800 Zeichen Limit | Keine langen, teuren Eingaben |
| 5 Anfragen/Stunde pro Besucher | Bremst einzelne Dauernutzer |
| 300 Anfragen/Tag insgesamt | Notbremse gegen Kostenexplosion |

Die Zahlen stehen oben in `src/index.js` und lassen sich dort anpassen.

## Kosten senken

In `wrangler.toml` `MODEL = "claude-sonnet-5"` setzen — deutlich günstiger und
für diese Demo völlig ausreichend. Danach erneut `wrangler deploy`.
