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
      styles={{
        container: { backgroundColor: "rgba(75, 85, 99, 0.8)" }, // 使用灰色半透明背景
        root: { "--yarl__color_backdrop": "rgba(75, 85, 99, 0.8)" } as React.CSSProperties,
      }}
    />
  );
};