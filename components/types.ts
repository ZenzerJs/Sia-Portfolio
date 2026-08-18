export interface ProcessDiskItem {
  id: number;
  title: string;
  description: string;
  gradient: string;
  conicDegree: number;
  initialY: number;
  zIndex: number;
}

export interface FloatingShapeConfig {
  id: string;
  name: string;
  label?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  scale?: number;
  duration?: number;
  imageSrc: string;
}
