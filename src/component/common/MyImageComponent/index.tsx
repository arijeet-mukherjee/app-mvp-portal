import Image from 'next/image';
import { FC } from 'react';
 
// Custom loader function
const customLoader = ({ src }: { src: string }) => {
  return src; // Directly return the source URL
};
 
interface MyImageComponentProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  className: string;
}
 
// Usage in a component
const MyImageComponent: FC<MyImageComponentProps> = ({ src, width, height, alt, className }) => (
  <Image
    loader={customLoader} // Use the custom loader
    src={src} // External image URL
    alt={alt}
    width={width}
    height={height}
    className={className}
    unoptimized // Since we're bypassing Next.js optimization, mark the image as unoptimized
  />
);
 
export default MyImageComponent;