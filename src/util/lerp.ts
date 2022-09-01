export type Point = {
  x:number,
  y:number
};

export function vectorAdd(p1:Point, p2:Point) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}

export default function lerp(pf:Point, p0:Point, tf:number, t0:number, t:number):Point {
  if (t > tf) return pf;
  if (t < t0) return p0;

  const tReal = (t - t0) / (tf - t0);

  const x = p0.x + (pf.x - p0.x) * tReal;
  const y = p0.y + (pf.y - p0.y) * tReal;

  return { x, y };
}
