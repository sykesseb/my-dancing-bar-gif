# Validation and support

## Checked environment

- Windows desktop
- Spotify 1.3.6.1921
- Spicetify 2.46.4
- Extension version 1.1.2

## Functional checks performed

The extension was exercised in a local Chromium fixture with a simulated Spicetify API and a native-style progress bar. The checks covered:

- No default character on a fresh installation.
- Loading a user-selected PNG and restoring it after reloading.
- Rejecting a malformed GIF while preserving the previous valid image.
- Clearing the image.
- Fixed-position slider and enabling/disabling progress tracking.
- Tracking the native rendered fill independently of the player's reported time, at 0%, 2%, 50%, 98% and 100%.
- All four custom bar styles and restoring the theme's bar.
- English and Spanish, including language persistence after reloading.

At the sampled progress positions, the image-center alignment error in the fixture was below 0.02 CSS pixels. This is a fixture result, not a guarantee for every Spotify layout or image. Transparent padding inside an image can make its visible contents appear off-center.

Manual checks in the Spotify desktop client confirmed the settings panel, language switching, top-bar button, and rainbow-with-stars bar overriding an installed Nyan Cat snippet. The early local version also displayed its animated image overlay in Spotify. File selection and persistence were exercised in the fixture.

For 1.1.1, tooltip regression checks used the real headless Tippy 6.3.7 library. Eight repeated hover/click/open/close cycles completed without a stuck tooltip or JavaScript errors. Mouse leave and keyboard focus/blur removed the popper. Computed tooltip typography was checked for regular weight (400), 14px size and softer text color. A manual check in Spotify confirmed that opening and closing the settings panel no longer leaves the tooltip visible. Exact hover styling in other themes has not been verified.

For 1.1.2, a header fixture reproduced the separate history/custom-app groups. The four buttons had equal 8px gaps and matching vertical centers after loading, resizing and reconstructing the custom-app group. The test also confirmed that the extension does not move nodes into Spotify's React-owned custom-app group. Manual checks in Spotify confirmed the aligned row and that the spacing survives navigation to Listening Stats.

## Automated repository checks

Run with Node.js 22 or later:

```text
node --check my-dancing-bar-gif.js
node tools/validate.mjs
```

GitHub Actions runs these syntax and packaging checks on pushes and pull requests. These checks do **not** replace runtime testing inside Spotify.

## Before reporting a problem

Include your OS, Spotify version, Spicetify version, steps to reproduce, and relevant themes/snippets. If an image appears displaced, test with a tightly cropped image and compare at the beginning and end of a track. For bar-style conflicts, compare the theme-bar option with one of the extension's custom styles.

macOS, Linux, detached mini-player, special fullscreen layouts, and other Spotify/Spicetify versions have not been verified. No continuous runtime test inside the actual Spotify app is currently configured.
