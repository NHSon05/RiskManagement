import { forwardRef } from "react";

interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
    fallback?: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(({
    src,
    alt,
    className,
    // fallback: customeFallback = images.,
    ...props
}, ref) => {

    if (!src) {
        return null;
    }

    return (
        <img 
            src={src} 
            alt={alt} 
            className={className} 
            ref={ref}
            {...props} 
        />
    );
});

Image.displayName = 'Image';
export { Image };