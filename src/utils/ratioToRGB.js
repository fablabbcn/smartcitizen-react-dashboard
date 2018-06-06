function roundArray(r, g, b) {
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}

export function ratioToRGB(ratio) {
    const hue = (120 * ratio) / 360;  // limited from red to green
    const saturation = 0.5;           // try some
    const value = 1;                 // try some
    const i = Math.floor(hue * 6);
    const f = hue * 6 - i;
    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);
    switch (i % 6) {
        case 0: return roundArray(value, t, p);
        case 1: return roundArray(q, value, p);
        case 2: return roundArray(p, value, t);
        case 3: return roundArray(p, q, value);
        case 4: return roundArray(t, p, value);
        case 5: return roundArray(value, p, q);
    }
}
