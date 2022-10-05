import React from 'react';
import Latex from 'react-latex';

import { Image } from 'antd';

import HypotrochoidPic from './Latex/Hypotrochoid.png';

export enum EquationLabel {
  Hypotrochoid,
  Cycloid,
  PaintBucket,
}

export type Equation = {
  label: EquationLabel,
  pic: (width: number) => JSX.Element,
  useEquation:
  (
    set: (x: (t:number) => number, y: (t:number) => number) => void,
    coefA: number,
    coefB: number,
    t0: number,
    tf: number
  ) => void,
};

const equations:Equation[] = [{
  label: EquationLabel.Hypotrochoid,
  pic: (width: number) => <Image src={HypotrochoidPic} width={width} alt="equation" />,
  useEquation: (set, a, b, t0, tf) => {
    const tAdjust = t0 + (tf - t0);
    set(
      (t: number) => (a + b) * Math.cos(2 * Math.PI * tAdjust * t)
        - b * Math.cos(((a / b) + 1) * 2 * Math.PI * tAdjust * t),
      (t: number) => (a + b) * Math.sin(2 * Math.PI * tAdjust * t)
        - b * Math.sin(((a / b) + 1) * 2 * Math.PI * tAdjust * t),
    );
  },
}];

export default equations;
