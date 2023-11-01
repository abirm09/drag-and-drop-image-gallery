/* eslint-disable react/prop-types */
import { Checkbox } from "@material-tailwind/react";
import { useDrag, useDrop } from "react-dnd";

const Images = ({
  imageURL,
  index,
  moveImage,
  isSelected,
  handleImageClick,
}) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: draggedItem => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const imageStyle = {
    transform: isSelected ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.3s ease",
  };

  return (
    <div
      ref={node => ref(drop(node))}
      className="ring-1 ring-gray-500 aspect-square relative rounded-md overflow-hidden group transition-all"
    >
      <img
        src={`images/${imageURL}`}
        alt="Gallery"
        className="mx-auto absolute w-full h-full"
        aria-disabled
        style={imageStyle}
      />
      <div
        className={`absolute w-full h-full transition-all ${
          isSelected
            ? "opacity-100 bg-black/30"
            : "group-hover:opacity-100 opacity-0 bg-black/40"
        }`}
      >
        <Checkbox
          checked={isSelected}
          onChange={() => handleImageClick(imageURL)}
          color="blue"
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default Images;
