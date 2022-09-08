import lerp, { Point, vectorAdd } from 'util/lerp';
import {
  MAX_WIDTH, MIN_WIDTH, MAX_HEIGHT, MIN_HEIGHT,
} from 'util/dimConstraints'; // ????

export type LayoutParams = { width: number, height: number };

export const scale = (p:LayoutParams) => {
  const maxScale = 1;
  const minScale = 0.6;

  const pf:Point = { x: maxScale, y: 0 };
  const p0:Point = { x: minScale, y: 0 };

  const tWidth = (p.width - MIN_WIDTH)
    / (MAX_WIDTH - MIN_WIDTH);
  const tHeight = (p.height - MIN_HEIGHT)
    / (MAX_HEIGHT - MIN_HEIGHT);

  return lerp(pf, p0, Math.min(tWidth, tHeight)).x;
};

// export const uniformOffset = (p:LayoutParams):Point => {
//   if (p.width <= MAX_WIDTH - p.menuWidth) return { x: 0, y: 0 };

//   return { x: (p.width - (MAX_WIDTH - p.menuWidth)) / 2, y: 0 };
// };

export const introductionPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 375, y: 144 };
  const p0:Point = { x: 231, y: 80 };

  const tWidth = (p.width - MIN_WIDTH)
    / (MAX_WIDTH - MIN_WIDTH);

  const tHeight = (p.height - MIN_HEIGHT)
    / (MAX_HEIGHT - MIN_HEIGHT);

  return lerp(pf, p0, Math.min(tWidth, tHeight));
};

export const professionalInterestsPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 562, y: 551 };
  const p0:Point = { x: 308, y: 333 };

  const tWidth = (p.width - MIN_WIDTH)
    / (MAX_WIDTH - MIN_WIDTH);

  const tHeight = (p.height - MIN_HEIGHT)
    / (MAX_HEIGHT - MIN_HEIGHT);

  return lerp(pf, p0, Math.min(tWidth, tHeight));
};

export const whoPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 1243, y: 170 };
  const p0:Point = { x: 736, y: 81 };

  const tWidth = (p.width - MIN_WIDTH)
    / (MAX_WIDTH - MIN_WIDTH);

  const tHeight = (p.height - MIN_HEIGHT)
    / (MAX_HEIGHT - MIN_HEIGHT);

  return lerp(pf, p0, Math.min(tWidth, tHeight));
};

export const interestsPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 1243, y: 390 };
  const p0:Point = { x: 736, y: 221 };

  const tWidth = (p.width - MIN_WIDTH)
    / (MAX_WIDTH - MIN_WIDTH);

  const tHeight = (p.height - MIN_HEIGHT)
    / (MAX_HEIGHT - MIN_HEIGHT);

  return lerp(pf, p0, Math.min(tWidth, tHeight));
};

export const interactivePosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 1243, y: 609 };
  const p0:Point = { x: 736, y: 221 };

  const tWidth = (p.width - MIN_WIDTH)
    / (MAX_WIDTH - MIN_WIDTH);

  const tHeight = (p.height - MIN_HEIGHT)
    / (MAX_HEIGHT - MIN_HEIGHT);

  return lerp(pf, p0, Math.min(tWidth, tHeight));
};

export const idPicPosition = (p:LayoutParams):Point => {
  const pf:Point = { x: 894, y: 113 };
  const p0:Point = { x: 530, y: 72 };

  const tWidth = (p.width - MIN_WIDTH)
    / (MAX_WIDTH - MIN_WIDTH);

  const tHeight = (p.height - MIN_HEIGHT)
    / (MAX_HEIGHT - MIN_HEIGHT);

  return lerp(pf, p0, Math.min(tWidth, tHeight));
};
