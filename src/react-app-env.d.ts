/// <reference types="react-scripts" />

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.jfif" {
  const value: string;
  export default value;
}

declare module "*.JPG" {
  const value: string;
  export default value;
}

declare module "*.JPEG" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
