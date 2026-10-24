// Colour science helpers (linear Rec.709 / sRGB primaries).

/** sRGB (gamma-encoded, 0..1) → linear. */
export function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
export function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}
/** '#rrggbb' → linear RGB triple. */
export function hexToLinear(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
  return [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
}

/**
 * Normalised linear-RGB chromaticity of a Planckian black-body radiator at `kelvin`
 * (CIE 1931 2° observer via Kang et al. 2002 xy approximation → XYZ → linear Rec.709), max channel = 1.
 * Valid 1667 K – 25000 K. Use for lamp colours, sunlight white balance, muzzle-flash temperature.
 */
export function kelvinToLinear(kelvin: number): [number, number, number] {
  const T = Math.min(25000, Math.max(1667, kelvin));
  let x: number;
  if (T <= 4000) x = -0.2661239e9 / T ** 3 - 0.2343589e6 / T ** 2 + 0.8776956e3 / T + 0.17991;
  else x = -3.0258469e9 / T ** 3 + 2.1070379e6 / T ** 2 + 0.2226347e3 / T + 0.24039;
  let y: number;
  if (T <= 2222) y = -1.1063814 * x ** 3 - 1.3481102 * x ** 2 + 2.18555832 * x - 0.20219683;
  else if (T <= 4000) y = -0.9549476 * x ** 3 - 1.37418593 * x ** 2 + 2.09137015 * x - 0.16748867;
  else y = 3.081758 * x ** 3 - 5.8733867 * x ** 2 + 3.75112997 * x - 0.37001483;
  const Y = 1, X = (x / y) * Y, Z = ((1 - x - y) / y) * Y;
  let r = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
  let g = -0.969266 * X + 1.8760108 * Y + 0.041556 * Z;
  let b = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;
  r = Math.max(r, 0); g = Math.max(g, 0); b = Math.max(b, 0);
  const m = Math.max(r, g, b) || 1;
  return [r / m, g / m, b / m];
}

/** Luminance-normalised (Y = 1) version, so intensity stays photometrically correct. */
export function kelvinToLinearY1(kelvin: number): [number, number, number] {
  const c = kelvinToLinear(kelvin);
  const y = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return [c[0] / y, c[1] / y, c[2] / y];
}

/** Photographic exposure value at ISO 100 from camera settings. */
export function ev100FromCamera(aperture: number, shutterSeconds: number, iso: number): number {
  return Math.log2((aperture * aperture) / shutterSeconds * (100 / iso));
}
/** Linear exposure multiplier for an EV100 (Lagarde & de Rousiers, saturation-based with q = 0.65 lens transmittance). */
export function exposureFromEv100(ev100: number): number {
  return 1 / (1.2 * Math.pow(2, ev100));
}
/** Luminous intensity (cd) of an isotropic point light from luminous power (lm). */
export function lumensToCandela(lm: number): number { return lm / (4 * Math.PI); }
