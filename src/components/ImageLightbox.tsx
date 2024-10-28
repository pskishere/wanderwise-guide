import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  index: number;
}

export const ImageLightbox = ({ isOpen, onClose, images, index }: ImageLightboxProps) => {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={images.map(src => ({ src }))}
      index={index}
    />
  );
};