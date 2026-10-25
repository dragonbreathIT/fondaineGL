// Registers every renderer (fondaineGL) and audio (vorp) realism parameter with the tuning panel.

import type { Renderer } from '../gl';
import { AMBIENCE_PARAMS, HEARING_PARAMS, MASTER_PARAMS, REVERB_PARAMS, Vorp, ParamSpec, OP } from '@fondaine/vorp';
import { Tuning, MODULES } from './tuning';

export function registerRenderTuning(tuning: Tuning, r: Renderer) {
  const t = tuning.scope(MODULES.gl);
  const S = r.settings;
  const sky = r.sky.settings;
  t.number('Sky', sky, 'sunElevation', { label: 'Sun elevation', min: -10, max: 90, step: 0.1, unit: '°' })
    .number('Sky', sky, 'sunAzimuth', { label: 'Sun azimuth', min: 0, max: 360, step: 0.5, unit: '°' })
    .number('Sky', sky, 'sunIlluminance', { label: 'Solar illuminance (TOA)', min: 1000, max: 140000, step: 100, unit: 'lux', help: 'Extraterrestrial sun illuminance ≈ 128 000 lux. Everything else is derived from this.' })
    .number('Sky', sky, 'sunAngularDiameter', { label: 'Sun angular diameter', min: 0.1, max: 5, step: 0.01, unit: '°', help: 'Real sun: 0.53°. Sets penumbra width of all sun shadows (PCSS) and sun specular size.' })
    .number('Sky', sky, 'turbidity', { label: 'Aerosol (haze)', min: 0, max: 10, step: 0.05, help: 'Mie density. Hazy/humid days ≈ 2–4.' })
    .number('Sky', sky, 'rayleigh', { label: 'Rayleigh density', min: 0, max: 4, step: 0.01 })
    .number('Sky', sky, 'ozone', { label: 'Ozone', min: 0, max: 4, step: 0.01 })
    .number('Sky', sky, 'mieG', { label: 'Mie anisotropy', min: 0, max: 0.99, step: 0.01 })
    .number('Sky', sky, 'groundAlbedo', { label: 'Ground albedo (env)', min: 0, max: 1, step: 0.01 })
    .number('Sky', sky, 'multiScatter', { label: 'Multiple scattering', min: 0.5, max: 2.5, step: 0.01 })
    .number('Sky', S.ibl, 'intensity', { label: 'IBL intensity', min: 0, max: 3, step: 0.01, help: 'Keep at 1 for physical correctness.' })
    .number('Sky', S.ibl, 'specularOcclusion', { label: 'Specular occlusion', min: 0, max: 1, step: 0.01 })
    .number('Sky', S.ibl, 'occludedAmbient', { label: 'Bounce fill (occluded sky)', min: 0, max: 1, step: 0.01, help: 'Fraction of sky ambient still arriving from occluded sky directions. ≈0.1–0.2.' })
    .number('Sky', S.ibl, 'viewmodelFill', { label: 'Viewmodel ambient fill', min: 0.5, max: 3, step: 0.05, help: 'Ambient multiplier on the first-person weapon and hands only (1 = physical). Dark gear in roof shadow needs ≈1.5–2 to read like it does to an adapted eye.' })
    .number('Sky', S.ibl, 'groundBounce', { label: 'Sun ground bounce', min: 0, max: 2, step: 0.01, help: 'One-bounce sunlight (sun lux × ground albedo / π) received where the sky is blocked — lights pavilion/porch interiors. No real-time GI: ≈0.4–0.8 on sunny days.' });

  t.bool('Global illumination', S.gi, 'enabled', { label: 'Baked GI probes', help: 'Path-traced at load: sky occlusion + multi-bounce sun/sky light. Replaces the analytic fill inside the probe volume.' })
    .number('Global illumination', S.gi, 'intensity', { label: 'GI intensity', min: 0, max: 3, step: 0.01, help: 'Keep at 1 for physical correctness.' });

  const w = r.wind.settings;
  t.number('Wind', w, 'speed', { label: 'Wind speed', min: 0, max: 25, step: 0.1, unit: 'm/s', help: 'Mean surface wind. Drives foliage, smoke/dust drift, cloud drift (× wind aloft) and the ambience bed.' })
    .number('Wind', w, 'direction', { label: 'Direction (blowing to)', min: 0, max: 360, step: 1, unit: '°', help: '0 = north (−Z), 90 = east (+X); same compass as the sun azimuth.' })
    .number('Wind', w, 'gustiness', { label: 'Gustiness', min: 0, max: 1, step: 0.01, help: 'Gust peaks reach ≈ speed × (1 + 1.7 × gustiness).' })
    .number('Wind', w, 'gustFrequency', { label: 'Gust rate', min: 0.02, max: 0.6, step: 0.01, unit: 'Hz' })
    .number('Wind', w, 'turbulence', { label: 'Turbulence (flutter)', min: 0, max: 1, step: 0.01 })
    .number('Wind', w, 'foliageBend', { label: 'Foliage bend', min: 0, max: 0.2, step: 0.001, unit: 'm per m/s', help: 'Tip displacement of a 1 m blade per m/s of wind.' })
    .number('Wind', w, 'aloftFactor', { label: 'Wind aloft ×', min: 1, max: 6, step: 0.05, help: 'Cloud-level wind relative to the surface wind.' })
    .number('Wind', w, 'aloftVeer', { label: 'Veer aloft', min: -90, max: 90, step: 1, unit: '°' });

  const c = r.sky.clouds.settings;
  t.bool('Clouds', c, 'enabled', { label: 'Clouds' })
    .choice('Clouds', c, 'mode', ['volumetric', 'flat'], { label: 'Mode', help: 'volumetric = ray-marched 3D clouds; flat = cheap 2D deck. Individual clouds (sky.addCloud) can pick either.' })
    .choice('Clouds', c, 'quality', ['auto', 'low', 'medium', 'high'], { label: 'Quality', help: 'Dome resolution and march steps. auto = high on a GPU, low on software WebGPU (headless captures).' })
    .number('Clouds', c, 'coverage', { label: 'Coverage', min: 0, max: 1, step: 0.01, help: 'Fraction of sky covered (scattered ≈ 0.3–0.5, broken ≈ 0.6–0.85, overcast 1).' })
    .number('Clouds', c, 'type', { label: 'Cloud type', min: 0, max: 1, step: 0.01, help: '0 flat stratus / stratocumulus … 1 towering cumulus.' })
    .number('Clouds', c, 'density', { label: 'Extinction', min: 2, max: 120, step: 0.5, unit: '1/km', help: 'Optical density of a fully dense cloud. Cumulus ≈ 20–80.' })
    .number('Clouds', c, 'altitude', { label: 'Base altitude', min: 300, max: 6000, step: 10, unit: 'm', help: 'Cumulus base ≈ 1–2 km.' })
    .number('Clouds', c, 'thickness', { label: 'Layer thickness', min: 200, max: 5000, step: 10, unit: 'm' })
    .number('Clouds', c, 'featureScale', { label: 'System size', min: 1000, max: 20000, step: 100, unit: 'm', help: 'Size of cloud systems and the gaps between them.' })
    .number('Clouds', c, 'shapeScale', { label: 'Shape scale', min: 1000, max: 15000, step: 100, unit: 'm' })
    .number('Clouds', c, 'detailScale', { label: 'Detail scale', min: 100, max: 2000, step: 10, unit: 'm' })
    .number('Clouds', c, 'windFactor', { label: 'Drift (× wind aloft)', min: 0, max: 6, step: 0.05, help: 'Cloud drift speed relative to the Wind system\'s wind aloft.' })
    .number('Clouds', c, 'shadowStrength', { label: 'Cloud shadows', min: 0, max: 1, step: 0.01, help: 'How much a thick cloud dims direct sunlight on the ground (1 = physical).' })
    .number('Clouds', c, 'ambient', { label: 'Ambient light', min: 0, max: 3, step: 0.01, help: 'Sky/ground light scattered by the clouds (1 ≈ physical).' })
    .number('Clouds', c, 'multiScatter', { label: 'Multiple scattering', min: 0.2, max: 4, step: 0.01, help: 'Sunlight energy boost standing in for higher scattering orders.' })
    .number('Clouds', c, 'albedo', { label: 'Droplet albedo', min: 0.5, max: 1, step: 0.005 });

  t.choice('Exposure', S.exposure, 'mode', ['auto', 'manual', 'camera'], { label: 'Mode', help: 'auto = eye/camera metering; manual = EV100; camera = aperture/shutter/ISO of the Camera.' })
    .number('Exposure', S.exposure, 'ev100', { label: 'Manual EV100', min: -6, max: 20, step: 0.1, help: 'Sunny 16 ≈ 15, overcast ≈ 12, indoor ≈ 7, night ≈ 0.' })
    .number('Exposure', S.exposure, 'compensation', { label: 'Compensation', min: -5, max: 5, step: 0.05, unit: 'EV' })
    .number('Exposure', S.exposure, 'minEv100', { label: 'Min EV100', min: -10, max: 20, step: 0.1 })
    .number('Exposure', S.exposure, 'maxEv100', { label: 'Max EV100', min: -10, max: 22, step: 0.1 })
    .number('Exposure', S.exposure, 'speedUp', { label: 'Adapt to bright', min: 0.05, max: 20, step: 0.05, unit: 'EV/s' })
    .number('Exposure', S.exposure, 'speedDown', { label: 'Adapt to dark', min: 0.05, max: 20, step: 0.05, unit: 'EV/s' })
    .number('Exposure', S.exposure, 'lowPercent', { label: 'Metering low %', min: 0, max: 0.99, step: 0.01 })
    .number('Exposure', S.exposure, 'highPercent', { label: 'Metering high %', min: 0.01, max: 1, step: 0.01 })
    .number('Exposure', S.exposure, 'centerWeight', { label: 'Centre weighting', min: 0, max: 1, step: 0.01 });

  t.choice('Tone & colour', S.grade, 'tonemapper', ['agx', 'aces', 'neutral', 'none'], { label: 'Tonemapper' })
    .number('Tone & colour', S.grade, 'exposureBias', { label: 'Exposure bias', min: -4, max: 4, step: 0.05, unit: 'EV' })
    .number('Tone & colour', S.grade, 'contrast', { label: 'Contrast', min: 0.5, max: 1.6, step: 0.01 })
    .number('Tone & colour', S.grade, 'saturation', { label: 'Saturation', min: 0, max: 2, step: 0.01 })
    .number('Tone & colour', S.grade, 'temperature', { label: 'White balance temp', min: -1, max: 1, step: 0.01 })
    .number('Tone & colour', S.grade, 'tint', { label: 'White balance tint', min: -1, max: 1, step: 0.01 })
    .number('Tone & colour', S.grade, 'lift', { label: 'Lift', min: -0.2, max: 0.2, step: 0.001 })
    .number('Tone & colour', S.grade, 'gamma', { label: 'Gamma', min: 0.5, max: 2, step: 0.01 })
    .number('Tone & colour', S.grade, 'gain', { label: 'Gain', min: 0.5, max: 2, step: 0.01 })
    .number('Tone & colour', S.grade, 'dither', { label: 'Dither', min: 0, max: 2, step: 0.01 });

  t.number('Lens & sensor', S.lens, 'distortion', { label: 'Barrel distortion k1', min: -0.6, max: 0.6, step: 0.005, help: 'Negative = barrel (wide/bodycam lenses), positive = pincushion.' })
    .number('Lens & sensor', S.lens, 'distortion2', { label: 'Distortion k2', min: -0.5, max: 0.5, step: 0.005 })
    .number('Lens & sensor', S.lens, 'fillZoom', { label: 'Distortion fill zoom', min: 0.5, max: 2, step: 0.005 })
    .number('Lens & sensor', S.lens, 'chromaticAberration', { label: 'Chromatic aberration', min: 0, max: 3, step: 0.01 })
    .number('Lens & sensor', S.lens, 'naturalVignette', { label: 'Natural vignetting (cos⁴)', min: 0, max: 1, step: 0.01 })
    .number('Lens & sensor', S.lens, 'vignette', { label: 'Artistic vignette', min: 0, max: 1, step: 0.01 })
    .number('Lens & sensor', S.lens, 'vignetteRoundness', { label: 'Vignette roundness', min: 0, max: 1, step: 0.01 })
    .number('Lens & sensor', S.lens, 'sharpen', { label: 'Sharpening', min: 0, max: 1, step: 0.01 })
    .bool('Lens & sensor', S.sensor, 'enabled', { label: 'Sensor noise' })
    .number('Lens & sensor', S.sensor, 'readNoise', { label: 'Read noise', min: 0, max: 0.05, step: 0.0001 })
    .number('Lens & sensor', S.sensor, 'shotNoise', { label: 'Photon shot noise', min: 0, max: 0.05, step: 0.0001 })
    .number('Lens & sensor', S.sensor, 'gain', { label: 'Sensor gain', min: 0, max: 8, step: 0.01 })
    .bool('Lens & sensor', S.sensor, 'isoCoupled', { label: 'Noise follows camera ISO' })
    .bool('Lens & sensor', S.motionBlur, 'enabled', { label: 'Motion blur' })
    .number('Lens & sensor', S.motionBlur, 'shutterAngle', { label: 'Shutter angle', min: 0, max: 360, step: 1, unit: '°', help: '180° = film look; bodycams shoot ~ 90–180°.' })
    .number('Lens & sensor', S.motionBlur, 'maxPixels', { label: 'Max blur', min: 4, max: 128, step: 1, unit: 'px' })
    .number('Lens & sensor', S.motionBlur, 'samples', { label: 'Blur samples', min: 4, max: 32, step: 1 })
    .bool('Lens & sensor', S.dof, 'enabled', { label: 'Depth of field' })
    .number('Lens & sensor', S.dof, 'apertureMm', { label: 'Aperture / pupil', min: 0, max: 30, step: 0.1, unit: 'mm', help: 'Human pupil ≈ 3 mm in daylight (iron sights: target goes soft), 6–7 mm at night. Camera: focal length ÷ f-number. Bodycams ≈ 1 mm (everything sharp).' })
    .bool('Lens & sensor', S.dof, 'autoFocus', { label: 'Auto focus (accommodation)' })
    .number('Lens & sensor', S.dof, 'focusDistance', { label: 'Manual focus', min: 0.1, max: 500, step: 0.1, unit: 'm' })
    .number('Lens & sensor', S.dof, 'focusSpeed', { label: 'Refocus speed', min: 0.5, max: 30, step: 0.1, unit: '1/s', help: 'Eye accommodation ≈ 4–8/s.' })
    .number('Lens & sensor', S.dof, 'maxBlurPx', { label: 'Max blur radius', min: 2, max: 40, step: 1, unit: 'px@1080p' })
    .number('Lens & sensor', S.dof, 'quality', { label: 'DOF quality', min: 0.25, max: 3, step: 0.05 })
    .bool('Lens & sensor', S.bloom, 'enabled', { label: 'Bloom (lens scatter)' })
    .number('Lens & sensor', S.bloom, 'intensity', { label: 'Bloom amount', min: 0, max: 0.3, step: 0.001, help: 'Fraction of light scattered by the lens (physical ≈ 0.02–0.05).' })
    .number('Lens & sensor', S.bloom, 'radius', { label: 'Bloom radius', min: 0.5, max: 3, step: 0.01 });

  const sh = S.shadows;
  t.bool('Shadows', sh, 'enabled', { label: 'Sun shadows' })
    .number('Shadows', sh, 'cascades', { label: 'Cascades', min: 1, max: 4, step: 1 })
    .number('Shadows', sh, 'resolution', { label: 'Resolution', min: 512, max: 8192, step: 512, unit: 'px' })
    .number('Shadows', sh, 'distance', { label: 'Distance', min: 10, max: 600, step: 1, unit: 'm' })
    .number('Shadows', sh, 'splitLambda', { label: 'Split lambda', min: 0, max: 1, step: 0.01 })
    .number('Shadows', sh, 'constantBias', { label: 'Depth bias', min: 0, max: 0.002, step: 0.00001 })
    .number('Shadows', sh, 'slopeBias', { label: 'Slope bias', min: 0, max: 8, step: 0.05 })
    .number('Shadows', sh, 'normalBias', { label: 'Normal bias', min: 0, max: 6, step: 0.05, unit: 'texels' })
    .number('Shadows', sh, 'maxPenumbraTexels', { label: 'Max penumbra', min: 1, max: 48, step: 1, unit: 'texels' })
    .number('Shadows', sh, 'blockerSamples', { label: 'PCSS blocker taps', min: 1, max: 16, step: 1 })
    .number('Shadows', sh, 'pcfSamples', { label: 'PCF taps', min: 1, max: 32, step: 1 })
    .number('Shadows', sh, 'blendFraction', { label: 'Cascade blend', min: 0, max: 0.5, step: 0.01 });

  t.bool('AO & AA', S.gtao, 'enabled', { label: 'GTAO' })
    .number('AO & AA', S.gtao, 'radius', { label: 'AO radius', min: 0.05, max: 4, step: 0.01, unit: 'm' })
    .number('AO & AA', S.gtao, 'falloff', { label: 'AO falloff', min: 0.05, max: 1, step: 0.01 })
    .number('AO & AA', S.gtao, 'power', { label: 'AO power', min: 0.5, max: 4, step: 0.01 })
    .number('AO & AA', S.gtao, 'strength', { label: 'AO strength', min: 0, max: 1, step: 0.01 })
    .number('AO & AA', S.gtao, 'slices', { label: 'AO slices', min: 1, max: 8, step: 1 })
    .number('AO & AA', S.gtao, 'steps', { label: 'AO steps', min: 2, max: 16, step: 1 })
    .bool('AO & AA', S.taa, 'enabled', { label: 'TAA' })
    .number('AO & AA', S.taa, 'feedbackMin', { label: 'TAA feedback (moving)', min: 0, max: 0.99, step: 0.005 })
    .number('AO & AA', S.taa, 'feedbackMax', { label: 'TAA feedback (still)', min: 0, max: 0.99, step: 0.005 })
    .number('AO & AA', S, 'renderScale', { label: 'Render scale', min: 0.25, max: 1.5, step: 0.05 })
    .number('AO & AA', S, 'debugView', { label: 'Debug view', min: 0, max: 9, step: 1, help: '1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance (cd/m² false colour), 6 HDR, 7 sky visibility, 8 ambient diffuse, 9 direct only' });

  t.number('Atmosphere', S.fog, 'density', { label: 'Fog density', min: 0, max: 0.02, step: 0.00001, unit: '1/m' })
    .number('Atmosphere', S.fog, 'heightFalloff', { label: 'Height falloff', min: 0.001, max: 1, step: 0.001, unit: '1/m' })
    .number('Atmosphere', S.fog, 'baseHeight', { label: 'Base height', min: -50, max: 200, step: 0.5, unit: 'm' })
    .number('Atmosphere', S.fog, 'startDistance', { label: 'Start distance', min: 0, max: 200, step: 0.5, unit: 'm' })
    .number('Atmosphere', S.fog, 'inscatter', { label: 'Inscatter', min: 0, max: 4, step: 0.01 })
    .number('Atmosphere', S.fog, 'mieG', { label: 'Sun glow anisotropy', min: 0, max: 0.99, step: 0.01 });
}

export function registerAudioTuning(tuning: Tuning, v: Vorp) {
  const t = tuning.scope(MODULES.vorp);
  const group = (name: string, schema: ParamSpec[], arr: Float32Array, op: number) => {
    schema.forEach((s, i) => t.arrayValue(name, arr, i, { key: s.key, label: s.label, min: s.min, max: s.max, step: s.step, unit: s.unit, help: s.help, onChange: () => v.cmd(op, arr) }));
  };
  group('Hearing', HEARING_PARAMS, v.params.hearing, OP.HEARING);
  group('Master', MASTER_PARAMS, v.params.master, OP.MASTER);
  group('Reverb', REVERB_PARAMS, v.params.reverb, OP.REVERB);
  group('Ambience', AMBIENCE_PARAMS, v.params.ambience, OP.AMBIENCE);
  const W = v.shotWet;
  t.number('Gunshot wet', W, 'recordedSendCutDb', { label: 'Recorded shot reverb cut', min: 0, max: 30, step: 0.5, unit: 'dB', help: 'Field recordings carry their own reverb; this much less send for them' })
    .number('Gunshot wet', W, 'tailDb', { label: 'Recorded tail layer', min: -40, max: 0, step: 0.5, unit: 'dB', help: 'Level of the distant tail recording under the report (presets can override)' })
    .number('Gunshot wet', W, 'burstWindowS', { label: 'Burst window', min: 0, max: 1, step: 0.01, unit: 's', help: 'Shots closer than this count as one burst' })
    .number('Gunshot wet', W, 'burstDuckDb', { label: 'Duck per burst shot', min: 0, max: 12, step: 0.5, unit: 'dB' })
    .number('Gunshot wet', W, 'burstDuckMaxDb', { label: 'Max burst duck', min: 0, max: 30, step: 0.5, unit: 'dB' })
    .number('Gunshot wet', W, 'burstChokeMs', { label: 'Burst echo choke', min: 0, max: 2000, step: 10, unit: 'ms', help: 'In a burst, the previous round\'s recorded echo fades out over this long (0 = let every tail ring)' });
}
