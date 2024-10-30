import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { SlideImage } from "yet-another-react-lightbox/dist/types";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  index: number;
}

export const ImageLightbox = ({ isOpen, onClose, images, index }: ImageLightboxProps) => {
  const slides: SlideImage[] = images.map(src => ({ src }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={index}
      styles={{
        container: { backgroundColor: "rgba(75, 85, 99, 0.8)" },
        root: { "--yarl__color_backdrop": "rgba(75, 85, 99, 0.8)" } as any // Using type assertion here as a workaround
      }}
    />
  );
};