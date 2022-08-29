declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module "*.mp4";
declare module "*.jpeg";
declare module "*.png";
declare module "*.txt";
declare module "*.pdf";

declare module 'pdfjs-dist/build/pdf.worker.entry';