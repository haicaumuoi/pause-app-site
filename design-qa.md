# Landing section layout verification

final result: blocked

Source visual targets: generated product sequence exec-c6ca42a3-bddc-4b90-9b12-e197e9e60273.png and closing CTA exec-705133ea-9cd4-49d0-81ff-fa5c3ce5b1ae.png in /Users/HaiAnh/.codex/generated_images/01a1d01e-65e3-70c0-96a3-2eaf2339eb82/. User rejected the new hero and explicitly retained the existing hero.

Implementation: apps/landing/index.html.
Implementation screenshot: unavailable. Browser file URL request was rejected by security policy; no alternate-surface or localhost workaround attempted.
Viewport / pixel dimensions / density normalization: not captured.
State: source implementation complete; desktop/mobile visual validation pending.
Full-view and focused comparisons: blocked without a rendered screenshot. No visual fidelity or animation-feel claims made.

Intentional adaptations: native app selection and breathing captures replace generated UI; final 15-minute outcome uses explanatory text and the existing phone sticker because saved completion captures are blank. CTA retains the existing App Store destination rather than introducing an updates form. Existing hero, supporting runway, breathing section, theme picker and legal pages preserved.

Checks performed:
- Python HTMLParser: all local src/href assets and hash targets exist; image alt attributes present; IDs unique.
- Node --check: all inline JavaScript passes syntax validation.
- Node VM executes actual buildStops function across 48 mocked viewport/text-height cases (320/390/760/761/800/1440 wide, 375/568/844/900 high, 1x/2x section height): ordered, bounded, all product content reachable. This is not a browser layout test.
- Node VM: closing fade class stays applied after first entrance.
- Bundled font bytes equal native Caprasimo-Regular.ttf and Figtree-Variable.ttf.
- Our section edits preserved the original hero markup at the slice-2 check. Later concurrent edits changed hero/global motion; those edits were preserved, so final whole-file hero preservation check does not pass; closing cursor-trail canvas and script removed.

Pending: browser desktop/mobile comparison, zoom/keyboard interactions, actual screenshot crop fit, font rendering, reduced-motion playback and console check. No native build/test run: iOS source unchanged.

Static review found product copy could be skipped at landscape heights. Fixed with overlapping stops through the entire product section; the 48-case check passes on the latest concurrently edited file. Global cursor/hover/float motion added concurrently is outside this change and has not been visually verified.
