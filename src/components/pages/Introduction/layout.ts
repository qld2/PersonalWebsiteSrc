import lerp, { Point, vectorAdd } from 'util/lerp';
import { MAX_WIDTH, MIN_WIDTH } from 'util/dimConstraints'; // ????

export type LayoutParams = { width: number, height: number, menuWidth: number };

export const scale = (p:LayoutParams) => {
  const maxScale = 1;
  const minScale = 0.5;

  const pf:Point = { x: maxScale, y: 0 };
  const p0:Point = { x: minScale, y: 0 };

  return lerp(pf, p0, MAX_WIDTH - p.menuWidth, MIN_WIDTH - p.menuWidth, p.width).x;
};

export const uniformOffset = (p:LayoutParams):Point => {
  if (p.width <= MAX_WIDTH - p.menuWidth) return { x: 0, y: 0 };

  return { x: (p.width - (MAX_WIDTH - p.menuWidth)) / 2, y: 0 };
};

export const introductionPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 65, y: 48 };
  const p0:Point = { x: 45, y: 114 };

  return lerp(pf, p0, MAX_WIDTH - p.menuWidth, MIN_WIDTH - p.menuWidth, p.width);
};

export const professionalInterestsPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 156, y: 432 };
  const p0:Point = { x: 91, y: 331 };

  return lerp(pf, p0, MAX_WIDTH - p.menuWidth, MIN_WIDTH - p.menuWidth, p.width);
};

export const shellThreePosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 156, y: 432 };
  const p0:Point = { x: 91, y: 331 };

  return lerp(pf, p0, MAX_WIDTH - p.menuWidth, MIN_WIDTH - p.menuWidth, p.width);
};

export const idPicPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 543, y: 25 };
  const p0:Point = { x: 313, y: 105 };

  return lerp(pf, p0, MAX_WIDTH - p.menuWidth, MIN_WIDTH - p.menuWidth, p.width);
};
