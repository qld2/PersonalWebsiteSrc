import { useState, useEffect } from 'react';
import Function from './Function';

export type Dimensions = {
  width: number,
  height: number,
};

export function getWindowDimensions(): Dimensions {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions(callback: Function<Dimensions, void>) {
  console.log('A');
  callback(getWindowDimensions());

  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //     console.log('B');
  //     callback(getWindowDimensions());
  //   }

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return getWindowDimensions();// windowDimensions;
}
