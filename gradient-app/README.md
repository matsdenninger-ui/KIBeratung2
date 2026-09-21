# gradient-app

Kleine React-Insel, die ausschließlich den animierten
[ShaderGradient](https://github.com/ruucm/shadergradient)-Hintergrund für
die Hero-Bereiche von `index.html` und `potenzialanalyse.html` baut. Der
Rest der Website bleibt komplett build-frei — nur dieser eine
Deko-Hintergrund braucht React + Three.js + einen Bundler.

## Funktionsweise

`src/main.jsx` sucht beim Laden nach jedem Element mit
`data-shader-gradient` im DOM und mountet dort `<HeroGradient />` (ein
`ShaderGradientCanvas` mit den Marken-Farben Gold/Wein/Anthrazit). Rein
dekorativ: `pointerEvents="none"`, Klicks und Tastaturfokus gehen
ungestört an den echten Seiteninhalt darüber.

## Build

```bash
cd gradient-app
npm install
npm run build
```

Der Build schreibt eine einzelne Datei nach `../assets/shader-gradient/shader-gradient.js`
(kein Hashing im Dateinamen, damit die `<script type="module" src="assets/shader-gradient/shader-gradient.js">`-Tags
in den HTML-Seiten nicht bei jedem Build angepasst werden müssen). Diese
gebaute Datei wird mit committet — die Website selbst lädt sie als
fertiges Skript, ganz ohne eigenen Build-Schritt beim Hosting.

**Nach jeder Änderung an `src/` also `npm run build` laufen lassen und
die neue `assets/shader-gradient/shader-gradient.js` mit committen.**

## Bekannte Kompromisse

- Das React/Three.js-Bundle wiegt ca. 1,3 MB (unminifiziert vor Gzip
  ~340 KB). Für eine reine Deko-Hintergrundanimation ist das happig —
  akzeptiert, weil die Website sonst keinerlei JS-Frameworks lädt.
- Der Shader animiert dauerhaft (auch nach dem Scrollen aus dem
  sichtbaren Bereich) und nutzt damit kontinuierlich GPU. Für Mobilgeräte
  mit wenig Akku ist das ein Kompromiss zugunsten der Optik.
- `envPreset`/`lightType="env"` wurde bewusst vermieden, da es eine
  externe HDR-Datei nachlädt — stattdessen `lightType="3d"` (keine
  externen Assets nötig).

## Lokal ansehen

```bash
npm run dev
```

öffnet unter `index.html` (in diesem Ordner) eine Vollbild-Vorschau des
Gradients, um schnell an Farben/Kamera zu tunen, ohne die ganze
Hauptseite laden zu müssen.
