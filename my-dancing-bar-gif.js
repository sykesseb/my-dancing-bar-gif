// My Dancing Bar GIF v1.1.2 — by sykesseb — MIT
// Local images only. No analytics, uploads, audio capture, or playback mutations.
(async function myDancingBarGif() {
  "use strict";
  const NAME = "My Dancing Bar GIF";
  const KEY = "my-dancing-bar-gif:settings:v1";
  if (window.__myDancingBarGif) return;
  window.__myDancingBarGif = true;
  const clamp = (v, lo, hi, fallback) => Number.isFinite(Number(v)) ? Math.max(lo, Math.min(hi, Number(v))) : fallback;
  const defaults = { enabled: true, size: 48, gap: 4, position: 75, follow: false, sway: false, onlyPlaying: false, language: navigator.language?.startsWith("es") ? "es" : "en", barStyle: "native", color: "#ef8450", trackColor: "#263047", thickness: 8 };
  let settings;
  try {
    const saved = localStorage.getItem(KEY);
    const legacy = JSON.parse(localStorage.getItem("monito-personalizable:settings:v1") || "null");
    settings = { ...defaults, ...(saved ? JSON.parse(saved) : legacy ? { ...legacy, position: ({ left: 0, center: 50, right: 100, progress: 50 })[legacy.position] ?? 75, follow: legacy.position === "progress" } : {}) };
  } catch { settings = { ...defaults }; }
  settings.size = clamp(settings.size, 24, 120, 48);
  settings.gap = clamp(settings.gap, 0, 80, 4);
  settings.position = clamp(settings.position, 0, 100, 75);
  settings.thickness = clamp(settings.thickness, 4, 16, 8);
  settings.language = settings.language === "es" ? "es" : "en";
  if (!["native", "solid", "rainbow", "space", "neon"].includes(settings.barStyle)) settings.barStyle = "native";
  for (const key of ["color", "trackColor"]) if (!/^#[0-9a-f]{6}$/i.test(settings[key])) settings[key] = defaults[key];
  for (const key of ["enabled", "follow", "sway", "onlyPlaying"]) settings[key] = !!settings[key];
  const messages = {
    en: {
      language: "Language", intro: "Your GIF, your progress bar.", character: "Your image", upload: "Choose image", remove: "Clear image", empty: "No image selected", preview: "Image preview", file: "Character image file",
      help: "Which image should I choose?", help1: "For a character that already dances, choose an animated GIF or animated WebP. This extension keeps the file's animation; it does not create new animation or detect the musical beat.", help2: "A transparent background is recommended, so only the character appears. Images with a background are also accepted, but their rectangle stays visible. The extension does not remove backgrounds.", help3: "PNG and JPG work too, but a still image stays still. Turn on “Sway image” for a simple extra movement. GIF, PNG, WebP and JPG: up to 8 MB and 4096 × 4096 px. Files stay on this computer.",
      placement: "Placement", enabled: "Show image", size: "Image size", position: "Position on the bar", start: "Start", end: "End", follow: "Follow song progress", followHelp: "The image's center follows the actual end of the played bar. Turn this off to choose a fixed position.", gap: "Space above the bar", sway: "Sway image", onlyPlaying: "Show image only while playing", bar: "Progress bar", style: "Bar style", native: "Current Spotify / theme", solid: "Custom color", rainbow: "Rainbow", space: "Rainbow + stars", neon: "Laser glow", color: "Played color / glow", trackColor: "Track background", thickness: "Bar thickness", restore: "Restore theme bar", done: "Done", saved: "Changes are saved automatically on this computer.", saving: "Saving image…", imageSaved: "Image saved.", cleared: "Image cleared. The bar style is kept.", saveError: "Could not save. Your previous image is kept.", loadError: "Could not read your saved image. Please choose it again.", invalid: "Choose a GIF, PNG, WebP or JPG image.", tooLarge: "Use an image up to 8 MB.", emptyFile: "This file is empty.", decodeError: "Could not open this image. Try another file.", dimensions: "Use an image up to 4096 × 4096 pixels.", noBar: "Open Spotify's main player to see the character.", credits: "Created by sykesseb · Built with Spicetify", nativeNote: "This option keeps the styles applied by your theme or other snippets. Choosing a style here takes over this progress bar only.", alignmentNote: "Tip: if the character still looks off-center, trim empty padding from the image itself."
    },
    es: {
      language: "Idioma", intro: "Tu GIF y tu barra de progreso, a tu gusto.", character: "Tu imagen", upload: "Elegir imagen", remove: "Quitar imagen", empty: "Ninguna imagen seleccionada", preview: "Vista previa de la imagen", file: "Archivo del personaje",
      help: "¿Qué imagen conviene elegir?", help1: "Para un personaje que ya baile, elige un GIF animado o un WebP animado. La extensión conserva la animación del archivo; no crea animaciones nuevas ni detecta el ritmo de la música.", help2: "Se recomienda fondo transparente para que solo se vea el personaje. También se aceptan imágenes con fondo, pero su rectángulo seguirá visible. La extensión no elimina fondos.", help3: "PNG y JPG también funcionan, pero una imagen estática seguirá quieta. Activa «Balancear imagen» para añadirle un movimiento sencillo. GIF, PNG, WebP y JPG: hasta 8 MB y 4096 × 4096 px. Los archivos se guardan en esta computadora.",
      placement: "Ubicación", enabled: "Mostrar imagen", size: "Tamaño de la imagen", position: "Posición en la barra", start: "Inicio", end: "Final", follow: "Seguir el progreso de la canción", followHelp: "El centro de la imagen sigue el extremo real de la barra reproducida. Desactívalo para elegir una posición fija.", gap: "Separación sobre la barra", sway: "Balancear imagen", onlyPlaying: "Mostrar imagen solo al reproducir", bar: "Barra de progreso", style: "Estilo de la barra", native: "Spotify / tema actual", solid: "Color personalizado", rainbow: "Arcoíris", space: "Arcoíris + estrellas", neon: "Brillo láser", color: "Color reproducido / brillo", trackColor: "Fondo de la barra", thickness: "Grosor de la barra", restore: "Restaurar barra del tema", done: "Listo", saved: "Los cambios se guardan automáticamente en esta computadora.", saving: "Guardando imagen…", imageSaved: "Imagen guardada.", cleared: "Imagen quitada. Se conserva el estilo de la barra.", saveError: "No se pudo guardar. Se conserva tu imagen anterior.", loadError: "No pude leer tu imagen guardada. Vuelve a elegirla.", invalid: "Elige una imagen GIF, PNG, WebP o JPG.", tooLarge: "Usa una imagen de hasta 8 MB.", emptyFile: "El archivo está vacío.", decodeError: "No pude abrir esa imagen. Prueba otro archivo.", dimensions: "Usa una imagen de hasta 4096 × 4096 píxeles.", noBar: "Abre el reproductor principal de Spotify para ver el personaje.", credits: "Creado por sykesseb · Hecho con Spicetify", nativeNote: "Esta opción conserva los estilos de tu tema u otros snippets. Al elegir un estilo aquí, se personaliza únicamente esta barra de reproducción.", alignmentNote: "Consejo: si el personaje aún parece descentrado, recorta el espacio vacío que tenga la propia imagen."
    }
  };
  const t = key => messages[settings.language][key] || key;
  for (let n = 0; !window.Spicetify?.Player?.addEventListener || !window.Spicetify?.Menu?.Item || !window.Spicetify?.Topbar?.Button || !window.Spicetify?.PopupModal; n++) {
    if (n > 120) { window.__myDancingBarGif = false; return; }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  const S = window.Spicetify;
  const notify = key => S.showNotification?.(t(key), true);
  const style = document.createElement("style");
  style.id = "mdbg-styles";
  style.textContent = `
    #mdbg-image,#mdbg-rail { position:fixed; pointer-events:none; }
    #mdbg-image { z-index:80; line-height:0; }
    #mdbg-image[hidden],#mdbg-rail[hidden] { display:none!important; }
    #mdbg-image img { width:100%;height:100%;object-fit:contain;border-radius:0!important; }
    #mdbg-image.sway img { transform-origin:50% 100%;animation:mdbg-sway .65s ease-in-out infinite alternate; }
    #mdbg-image.paused img { animation-play-state:paused; }
    @keyframes mdbg-sway { from {transform:rotate(-8deg)} to {transform:rotate(8deg) translateY(-4px)} }
    #mdbg-rail { z-index:60;border-radius:12px; background:var(--mdbg-track); }
    #mdbg-rail .mdbg-fill { position:absolute;inset:0 auto 0 0;background:var(--mdbg-color);border-radius:inherit; }
    #mdbg-rail .mdbg-dot { position:absolute;top:50%;width:10px;height:10px;border-radius:50%;background:var(--mdbg-color);transform:translate(-50%,-50%); }
    #mdbg-rail[data-mode=rainbow] .mdbg-fill,#mdbg-rail[data-mode=space] .mdbg-fill { background:linear-gradient(to bottom,#ff4d6d 0% 16.667%,#ffa62b 16.667% 33.333%,#fff16b 33.333% 50%,#6de38a 50% 66.667%,#58c6ff 66.667% 83.333%,#b58aff 83.333% 100%); }
    #mdbg-rail[data-mode=space] { background-color:var(--mdbg-track);background-image:radial-gradient(circle at 4px 2px,#ffffffdd 0 .7px,transparent 1px),radial-gradient(circle at 17px 6px,#ffffff77 0 .6px,transparent 1px);background-size:31px 11px,47px 13px; }
    #mdbg-rail[data-mode=neon] .mdbg-fill { background:linear-gradient(to bottom,var(--mdbg-color),#fff 32% 68%,var(--mdbg-color));box-shadow:0 0 5px var(--mdbg-color),0 0 12px var(--mdbg-color); }
    #mdbg-rail[data-mode=neon]::before { content:'';position:absolute;z-index:2;left:-20px;top:50%;transform:translateY(-50%);width:25px;height:11px;border-radius:3px;background:repeating-linear-gradient(90deg,#747b86 0 3px,#dce2eb 3px 5px,#454b55 5px 6px);border:1px solid #aab1ba; }
    #mdbg-rail[data-mode=neon] .mdbg-dot { background:white;box-shadow:0 0 5px var(--mdbg-color);width:6px;height:6px; }
    html body .playback-progressbar[data-mdbg-image]::before { content:none!important; }
    html body .playback-progressbar[data-mdbg-bar] :is(.x-progressBar-fillColor,.x-progressBar-progressBarBg,.x-progressBar-progressFillColor,.progress-bar__slider,[data-testid=saber-hilt-button],[data-testid=progress-bar-saber-overlay],[data-testid=easter-egg-handle]) { opacity:0!important; }
    .spicetify-topbar-button[data-mdbg] { display:flex;align-items:center;justify-content:center;flex-shrink:0; }
    .spicetify-topbar-button[data-mdbg] button { display:flex!important;align-items:center!important;justify-content:center!important;width:var(--mdbg-button-size,40px)!important;height:var(--mdbg-button-size,40px)!important;min-width:var(--mdbg-button-size,40px)!important;padding:0!important;border:0!important;border-radius:50%!important;background:var(--mdbg-button-bg,#00000042)!important;color:var(--mdbg-button-fg,#b3b3b3)!important;cursor:pointer;transition:background-color .15s,color .15s,transform .15s; }
    .spicetify-topbar-button[data-mdbg] button:hover { background:var(--mdbg-button-hover,#ffffff18)!important;color:#fff!important;transform:scale(1.04); }
    .spicetify-topbar-button[data-mdbg] button:focus-visible { outline:2px solid #fff;outline-offset:3px; }
    .spicetify-topbar-button[data-mdbg] button svg { width:var(--mdbg-icon-size,24px)!important;height:var(--mdbg-icon-size,24px)!important; }
    .mdbg-tooltip { color:#e6e6e6;background:#282828;border-radius:4px;padding:6px 8px;font-family:inherit;font-size:14px;font-weight:400;line-height:20px;box-shadow:0 4px 12px #0008; }
    .mdbg-editor { display:grid;gap:14px;color:var(--spice-text,#fff);font-size:14px;line-height:1.45;max-height:68vh;overflow:auto;padding:2px 8px 2px 2px; }
    .mdbg-editor p,.mdbg-editor h3 {margin:0}.mdbg-editor h3 {font-size:16px;font-weight:700}
    .mdbg-editor .mdbg-language {display:flex;justify-content:space-between;align-items:center;gap:12px}
    .mdbg-editor section {display:grid;gap:12px;border:1px solid #80808044;border-radius:10px;padding:14px;}
    .mdbg-editor .mdbg-preview {min-height:90px;display:flex;align-items:center;gap:18px;background:var(--spice-main,#181818);border-radius:8px;padding:12px;}
    .mdbg-editor .mdbg-preview img {width:72px;height:72px;object-fit:contain;border-radius:0!important;}
    .mdbg-editor .mdbg-preview img[hidden] {display:none!important}
    .mdbg-editor .mdbg-name {overflow-wrap:anywhere}
    .mdbg-editor .mdbg-actions {display:flex;flex-wrap:wrap;gap:8px}
    .mdbg-editor button {font:inherit;cursor:pointer;color:inherit;background:transparent;border:1px solid #80808077;border-radius:22px;padding:9px 15px}
    .mdbg-editor button.primary {background:var(--spice-button,#1db954);color:var(--spice-sidebar,#111);border:0;font-weight:700}
    .mdbg-editor button:hover {filter:brightness(1.1)}.mdbg-editor button:disabled {opacity:.45;cursor:default}
    .mdbg-editor label.mdbg-row {display:flex;justify-content:space-between;align-items:center;gap:12px;}
    .mdbg-editor .mdbg-slider-label {display:flex;justify-content:space-between;align-items:center;gap:12px}
    .mdbg-editor .mdbg-slider {display:grid;gap:5px}
    .mdbg-editor input[type=range] {width:100%;accent-color:var(--spice-button,#1db954);cursor:pointer}
    .mdbg-editor input:disabled {opacity:.4;cursor:default}
    .mdbg-editor input[type=checkbox] {width:18px;height:18px;accent-color:var(--spice-button,#1db954);flex-shrink:0}
    .mdbg-editor input[type=color] {width:46px;height:30px;border:1px solid #80808077;background:transparent;border-radius:5px;padding:2px;cursor:pointer}
    .mdbg-editor select {font:inherit;max-width:65%;padding:7px;color:inherit;background:var(--spice-main,#181818);border:1px solid #80808077;border-radius:6px}
    .mdbg-editor .mdbg-muted,.mdbg-editor details {font-size:12px;color:var(--spice-subtext,#aaa)}
    .mdbg-editor summary {cursor:pointer;font-weight:600}.mdbg-editor details p {margin-top:8px}
    .mdbg-editor .mdbg-endpoints {display:flex;justify-content:space-between;font-size:11px;color:var(--spice-subtext,#aaa)}
    .mdbg-editor [data-custom-controls] {display:grid;gap:12px}.mdbg-editor [data-custom-controls][hidden] {display:none}
    .mdbg-editor a {color:inherit;text-decoration:underline}.mdbg-editor .mdbg-footer {display:flex;justify-content:space-between;align-items:center;gap:14px}
    @media(prefers-reduced-motion:reduce){#mdbg-image.sway img{animation:none}.spicetify-topbar-button[data-mdbg] button{transition:none}}
  `;
  document.head.append(style);
  const overlay = document.createElement("div");
  overlay.id = "mdbg-image";
  overlay.hidden = true;
  overlay.setAttribute("aria-hidden", "true");
  const image = document.createElement("img"); image.alt = ""; image.draggable = false; overlay.append(image);
  const rail = document.createElement("div"); rail.id = "mdbg-rail"; rail.hidden = true; rail.setAttribute("aria-hidden", "true");
  rail.innerHTML = '<div class="mdbg-fill"></div><div class="mdbg-dot"></div>';
  const fill = rail.firstElementChild, dot = rail.lastElementChild;
  document.body.append(rail, overlay);
  let imageUrl = "", imageName = "", bar = null, track = null, foreground = null, modal = null;
  let frame = 0, lastFrame = 0, retryTimer = null, dbPromise, busy = false;
  const playing = () => { try { return !!S.Player.isPlaying(); } catch { return false; } };
  const visibleRect = el => { const r = el?.getBoundingClientRect(); return r?.width > 0 && r?.height > 0 ? r : null; };

  function findBar() {
    const next = document.querySelector('[data-testid="player-controls"] .playback-progressbar, .player-controls .playback-progressbar, [data-testid="playback-progressbar"], .playback-bar .playback-progressbar');
    if (next !== bar) {
      if (bar) { delete bar.dataset.mdbgBar; delete bar.dataset.mdbgImage; }
      observer.disconnect();
      bar = next;
      if (bar) { observer.observe(bar); if (bar.parentElement) observer.observe(bar.parentElement); }
    }
    track = bar?.querySelector('.x-progressBar-progressBarBg, [data-testid="progress-bar-background"]') || bar;
    foreground = bar?.querySelector('.x-progressBar-fillColor') || null;
  }
  function progressPoint(rect) {
    // Native fill includes Spotify's seek/drag state and CSS interpolation. It remains measurable when transparent.
    const actual = foreground?.getBoundingClientRect();
    if (actual?.width > 0) return Math.max(rect.left, Math.min(rect.right, actual.right));
    let fraction = 0;
    try { fraction = clamp(S.Player.getProgressPercent(), 0, 1, 0); } catch {}
    return rect.left + rect.width * fraction;
  }
  function draw() {
    if (!bar?.isConnected) findBar();
    const rect = visibleRect(track);
    const visible = rect && !document.hidden;
    if (!visible) { overlay.hidden = rail.hidden = true; return; }
    const point = progressPoint(rect);
    const custom = settings.barStyle !== "native";
    if (custom) bar.dataset.mdbgBar = settings.barStyle; else delete bar.dataset.mdbgBar;
    const showImage = settings.enabled && !!imageUrl && (!settings.onlyPlaying || playing());
    if (showImage) bar.dataset.mdbgImage = "true"; else delete bar.dataset.mdbgImage;
    overlay.hidden = !showImage;
    rail.hidden = !custom;
    if (showImage) {
      const x = settings.follow ? point : rect.left + rect.width * settings.position / 100;
      const size = settings.size;
      // Center the full image on the progress point, including at 0% and 100%.
      overlay.style.left = `${Math.max(0, Math.min(innerWidth - size, x - size / 2))}px`;
      const top = rect.top + rect.height / 2 - (custom ? settings.thickness / 2 : rect.height / 2);
      overlay.style.top = `${Math.max(0, top - size - settings.gap)}px`;
      overlay.style.width = overlay.style.height = `${size}px`;
      overlay.classList.toggle("sway", settings.sway);
      overlay.classList.toggle("paused", !playing());
    }
    if (custom) {
      rail.dataset.mode = settings.barStyle;
      rail.style.left = `${rect.left}px`; rail.style.top = `${rect.top + (rect.height - settings.thickness) / 2}px`;
      rail.style.width = `${rect.width}px`; rail.style.height = `${settings.thickness}px`;
      rail.style.setProperty("--mdbg-color", settings.color); rail.style.setProperty("--mdbg-track", settings.trackColor);
      const playedWidth = point - rect.left;
      fill.style.width = `${playedWidth}px`; dot.style.left = `${playedWidth}px`;
      dot.hidden = playedWidth === 0;
    }
  }
  // Only follow the native geometry while it is moving; capped at 30 Hz and stopped when hidden/paused.
  function animate(time) {
    frame = 0;
    if (time - lastFrame >= 32) { draw(); lastFrame = time; }
    if (!document.hidden && playing() && (settings.barStyle !== "native" || (settings.enabled && imageUrl && settings.follow))) frame = requestAnimationFrame(animate);
  }
  function sync() {
    findBar(); draw();
    if (frame) cancelAnimationFrame(frame); frame = 0;
    if (!document.hidden && playing() && (settings.barStyle !== "native" || (settings.enabled && imageUrl && settings.follow))) frame = requestAnimationFrame(animate);
    if (retryTimer) clearTimeout(retryTimer);
    retryTimer = !bar && !document.hidden ? setTimeout(sync, 1500) : null;
  }
  const observer = new ResizeObserver(draw);
  function change(patch) {
    const next = { ...settings, ...patch };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { notify("saveError"); return false; }
    settings = next; sync(); return true;
  }
  for (const name of ["songchange", "onplaypause", "onprogress"]) S.Player.addEventListener(name, sync);
  window.addEventListener("resize", sync); document.addEventListener("visibilitychange", sync);
  // Dragging and keyboard seeking keep the image on the actual native bar, even when playback is paused.
  document.addEventListener("pointermove", event => { if (event.buttons && bar?.contains(event.target)) draw(); }, { passive: true });
  document.addEventListener("pointerup", () => requestAnimationFrame(draw), { passive: true });
  document.addEventListener("keyup", event => { if (bar?.contains(event.target)) requestAnimationFrame(draw); });

  function openDb() {
    // Keep the previous local database so upgrading does not discard the user's uploaded image.
    if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("monito-personalizable", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("assets");
      request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
    }).catch(error => { dbPromise = null; throw error; });
    return dbPromise;
  }
  async function readAsset() {
    const db = await openDb();
    return new Promise((resolve, reject) => { const r = db.transaction("assets").objectStore("assets").get("current"); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
  }
  async function storeAsset(asset) {
    const db = await openDb();
    await new Promise((resolve, reject) => { const tx = db.transaction("assets", "readwrite"); tx.objectStore("assets").put(asset, "current"); tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error || Error(t("saveError"))); });
  }
  function useAsset(asset) {
    const previous = imageUrl;
    imageUrl = asset?.blob ? URL.createObjectURL(asset.blob) : ""; imageName = asset?.blob ? String(asset.name) : "";
    if (imageUrl) image.src = imageUrl; else image.removeAttribute("src");
    if (previous.startsWith("blob:")) URL.revokeObjectURL(previous);
    refreshPreview(); sync();
  }
  function refreshPreview() {
    if (!modal?.isConnected) return;
    const preview = modal.querySelector(".mdbg-preview img");
    preview.hidden = !imageUrl;
    if (imageUrl) preview.src = imageUrl; else preview.removeAttribute("src");
    modal.querySelector(".mdbg-name").textContent = imageName || t("empty");
    modal.querySelector('[data-action="remove"]').disabled = busy || !imageUrl;
  }
  async function validate(file) {
    if (!["image/gif", "image/png", "image/webp", "image/jpeg"].includes(file.type)) throw Error(t("invalid"));
    if (file.size > 8 * 1024 * 1024) throw Error(t("tooLarge"));
    if (!file.size) throw Error(t("emptyFile"));
    const url = URL.createObjectURL(file);
    try {
      const probe = new Image();
      await new Promise((resolve, reject) => { probe.onload = resolve; probe.onerror = () => reject(Error(t("decodeError"))); probe.src = url; });
      if (probe.naturalWidth > 4096 || probe.naturalHeight > 4096) throw Error(t("dimensions"));
    } finally { URL.revokeObjectURL(url); }
  }
  function openSettings() {
    // Close before opening the modal; a retained focus or pending hover must not pin the tooltip.
    topbar.tippy?.hide();
    actualButton.blur();
    const root = document.createElement("div"); root.className = "mdbg-editor"; root.lang = settings.language;
    root.innerHTML = `
      <label class="mdbg-language">${t("language")}<select data-language aria-label="Language / Idioma"><option value="en">English</option><option value="es">Español</option></select></label>
      <p>${t("intro")}</p>
      <section><h3>${t("character")}</h3>
        <div class="mdbg-preview"><img alt="${t("preview")}" hidden><span class="mdbg-name"></span></div>
        <div class="mdbg-actions"><button class="primary" data-action="upload">${t("upload")}</button><button data-action="remove">${t("remove")}</button></div>
        <input type="file" accept="image/gif,image/png,image/webp,image/jpeg" hidden aria-label="${t("file")}">
        <details><summary>${t("help")}</summary><p>${t("help1")}</p><p>${t("help2")}</p><p>${t("help3")}</p></details>
      </section>
      <section><h3>${t("placement")}</h3>
        <label class="mdbg-row">${t("enabled")}<input type="checkbox" data-setting="enabled"></label>
        ${slider("size", 24, 120, 2, "px")}
        ${slider("position", 0, 100, 1, "%")}
        <div class="mdbg-endpoints"><span>${t("start")}</span><span>${t("end")}</span></div>
        <label class="mdbg-row">${t("follow")}<input type="checkbox" data-setting="follow"></label>
        <p class="mdbg-muted">${t("followHelp")}</p>
        ${slider("gap", 0, 80, 1, "px")}
        <label class="mdbg-row">${t("sway")}<input type="checkbox" data-setting="sway"></label>
        <label class="mdbg-row">${t("onlyPlaying")}<input type="checkbox" data-setting="onlyPlaying"></label>
        <p class="mdbg-muted">${t("alignmentNote")}</p>
      </section>
      <section><h3>${t("bar")}</h3>
        <label class="mdbg-row">${t("style")}<select data-setting="barStyle" aria-label="${t("style")}">${["native", "solid", "rainbow", "space", "neon"].map(key => `<option value="${key}">${t(key)}</option>`).join("")}</select></label>
        <p class="mdbg-muted">${t("nativeNote")}</p>
        <div data-custom-controls><label class="mdbg-row">${t("color")}<input type="color" data-setting="color" aria-label="${t("color")}"></label><label class="mdbg-row">${t("trackColor")}<input type="color" data-setting="trackColor" aria-label="${t("trackColor")}"></label>${slider("thickness", 4, 16, 1, "px")}</div>
        <div class="mdbg-actions"><button data-action="restore">${t("restore")}</button></div>
      </section>
      <p class="mdbg-muted" role="status">${t("saved")}</p>
      <div class="mdbg-footer"><a class="mdbg-muted" href="https://github.com/sykesseb" target="_blank" rel="noopener noreferrer">${t("credits")}</a><button class="primary" data-action="done">${t("done")}</button></div>`;
    function slider(key, min, max, step, unit) { return `<label class="mdbg-slider"><span class="mdbg-slider-label">${t(key)}<output data-output="${key}"></output></span><input type="range" min="${min}" max="${max}" step="${step}" data-setting="${key}" data-unit="${unit}" aria-label="${t(key)}"></label>`; }
    modal = root;
    const language = root.querySelector("[data-language]"); language.value = settings.language;
    language.onchange = () => { if (change({ language: language.value })) openSettings(); };
    function refreshControls() {
      root.querySelector('[data-setting="position"]').disabled = settings.follow;
      root.querySelector("[data-custom-controls]").hidden = settings.barStyle === "native";
      root.querySelector('[data-action="restore"]').disabled = settings.barStyle === "native";
      root.querySelector('[data-setting="color"]').disabled = ["rainbow", "space"].includes(settings.barStyle);
    }
    for (const control of root.querySelectorAll("[data-setting]")) {
      const key = control.dataset.setting;
      if (control.type === "checkbox") control.checked = settings[key]; else control.value = settings[key];
      const output = root.querySelector(`[data-output="${key}"]`);
      if (output) output.textContent = `${settings[key]} ${control.dataset.unit}`;
      control.addEventListener(["range", "color"].includes(control.type) ? "input" : "change", () => {
        const value = control.type === "checkbox" ? control.checked : control.type === "range" ? Number(control.value) : control.value;
        if (change({ [key]: value })) { if (output) output.textContent = `${value} ${control.dataset.unit}`; refreshControls(); }
      });
    }
    refreshControls();
    const picker = root.querySelector('input[type="file"]'), status = root.querySelector('[role="status"]');
    const upload = root.querySelector('[data-action="upload"]'), remove = root.querySelector('[data-action="remove"]');
    upload.disabled = busy;
    root.querySelector('[data-action="done"]').onclick = () => S.PopupModal.hide();
    root.querySelector('[data-action="restore"]').onclick = () => { if (change({ barStyle: "native" })) { root.querySelector('[data-setting="barStyle"]').value = "native"; refreshControls(); } };
    upload.onclick = () => picker.click();
    async function saveAsset(asset) {
      if (busy) return;
      busy = true; upload.disabled = remove.disabled = true; status.textContent = t("saving");
      try {
        if (asset?.blob) await validate(asset.blob);
        await storeAsset(asset); useAsset(asset);
        if (asset?.blob) change({ enabled: true });
        root.querySelector('[data-setting="enabled"]').checked = settings.enabled;
        status.textContent = t(asset?.blob ? "imageSaved" : "cleared");
      } catch (error) { status.textContent = error.message || t("saveError"); }
      finally { busy = false; upload.disabled = false; picker.value = ""; refreshPreview(); if (modal !== root && modal?.isConnected) modal.querySelector('[data-action="upload"]').disabled = false; }
    }
    picker.onchange = () => { if (picker.files[0]) void saveAsset({ blob: picker.files[0], name: picker.files[0].name }); };
    remove.onclick = () => void saveAsset({ blob: null, name: "" });
    S.PopupModal.display({ title: NAME, content: root, isLarge: false });
    refreshPreview();
  }

  const icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="4.5" r="2" fill="currentColor"/><path d="m5.5 8 6.5 3 6.5-3M12 11v4.5m0 0-4.5 5m4.5-5 4.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  new S.Menu.Item(NAME, false, openSettings, icon).register();
  const topbar = new S.Topbar.Button(NAME, icon, openSettings);
  topbar.element.dataset.mdbg = "true";
  const actualButton = topbar.element.querySelector("button") || topbar.element;
  actualButton.setAttribute("aria-label", NAME);
  let observedHeader = null, placementFrame = 0;
  const placementObserver = new MutationObserver(() => {
    if (!placementFrame) placementFrame = requestAnimationFrame(() => {
      placementFrame = 0;
      matchMarketplace();
    });
  });
  // Match the user's installed Marketplace control rather than inheriting the small back-arrow styling.
  function matchMarketplace() {
    const reference = document.querySelector('button[aria-label="Marketplace"]');
    if (!reference || reference === actualButton) {
      topbar.element.style.removeProperty("margin-inline-end");
      return;
    }
    // Keep the button in the Topbar API's React-owned location. Moving it into custom-app
    // children can break Spotify reconciliation. Adjust only our trailing margin instead.
    const appGroup = reference.closest('.custom-navlinks-scrollable_container div[role="presentation"]');
    // Recalculate after Spotify reconstructs the navigation controls.
    const header = reference.closest('#global-nav-bar');
    if (header !== observedHeader) {
      placementObserver.disconnect();
      observedHeader = header;
      if (header) placementObserver.observe(header, { childList: true, subtree: true });
    }
    const computed = getComputedStyle(reference), bounds = reference.getBoundingClientRect();
    if (bounds.height > 20 && bounds.height < 70) topbar.element.style.setProperty("--mdbg-button-size", `${bounds.height}px`);
    if (computed.backgroundColor !== "rgba(0, 0, 0, 0)") topbar.element.style.setProperty("--mdbg-button-bg", computed.backgroundColor);
    topbar.element.style.setProperty("--mdbg-button-fg", computed.color);
    const svg = reference.querySelector("svg"); if (svg) topbar.element.style.setProperty("--mdbg-icon-size", `${svg.getBoundingClientRect().width || 24}px`);
    if (appGroup && !appGroup.contains(topbar.element) && computed.direction !== "rtl") {
      const appButtons = [...appGroup.querySelectorAll('button.custom-navlink, button[aria-label="Listening Stats"], button[aria-label="Marketplace"], button[aria-label="Visualizer"]')];
      const first = appButtons[0]?.getBoundingClientRect(), second = appButtons[1]?.getBoundingClientRect();
      const own = actualButton.getBoundingClientRect();
      if (first?.width > 0 && own.width > 0 && first.left >= own.left) {
        const nativeGap = second ? second.left - first.right : 8;
        const targetGap = nativeGap >= 0 && nativeGap <= 24 ? nativeGap : 8;
        const currentMargin = parseFloat(getComputedStyle(topbar.element).marginInlineEnd) || 0;
        const nextMargin = currentMargin + targetGap - (first.left - own.right);
        if (nextMargin >= -64 && nextMargin <= 24) topbar.element.style.marginInlineEnd = `${nextMargin}px`;
      }
    } else topbar.element.style.removeProperty("margin-inline-end");
  }
  // Tippy creates its renderer at construction: replacing render via setProps leaves the old popper.
  if (S.Tippy) {
    topbar.tippy?.destroy();
    topbar.tippy = S.Tippy(topbar.element, {
    content: NAME, delay: [200, 0], animation: false, duration: [0, 0],
    placement: "bottom", trigger: "mouseenter focusin", hideOnClick: true, interactive: false,
    appendTo: () => document.body,
    render(instance) {
      const popper = document.createElement("div"), content = document.createElement("div");
      popper.setAttribute("role", "tooltip");
      content.className = "mdbg-tooltip"; content.textContent = NAME; popper.append(content);
      return { popper, onUpdate(_, props) { content.textContent = props.content; } };
    },
    // Headless Tippy unmounts automatically with animation:false. Calling unmount in onHide
    // re-enters hide while state.isVisible is still true, causing recursion and a stuck popper.
    onShow() { return !modal?.isConnected; }
    });
  }
  actualButton.removeAttribute("title");
  if (!topbar.tippy) actualButton.title = NAME;
  matchMarketplace();
  for (const delay of [500, 2000]) setTimeout(matchMarketplace, delay);
  S.Platform?.History?.listen?.(() => setTimeout(matchMarketplace, 300));
  window.addEventListener("resize", matchMarketplace);
  sync();
  try { const asset = await readAsset(); if (asset) useAsset(asset); } catch { notify("loadError"); }
})();
