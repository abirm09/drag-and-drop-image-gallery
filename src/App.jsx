import { Button } from "@material-tailwind/react";
import imageData from "./images.json";
import { useState } from "react";
import { TiImage } from "react-icons/ti";
import Images from "./components/Image/Images";
const App = () => {
  const [images, setImages] = useState(imageData);
  const [selectedImages, setSelectedImages] = useState([]);
  const moveImage = (fromIndex, toIndex) => {
    const imagesCopy = [...images];
    const [movedImage] = imagesCopy.splice(fromIndex, 1);
    imagesCopy.splice(toIndex, 0, movedImage);
    setImages(imagesCopy);
  };

  const handleImageClick = imageURL => {
    if (selectedImages.includes(imageURL)) {
      setSelectedImages(selectedImages.filter(img => img !== imageURL));
    } else {
      setSelectedImages([...selectedImages, imageURL]);
    }
  };

  const handleDeleteImages = () => {
    const remainingImages = images.filter(img => !selectedImages.includes(img));
    setImages(remainingImages);
    setSelectedImages([]);
  };
  return (
    <div className="w-full min-h-screen h-full bg-gray-50 pt-3">
      <div className="max-w-7xl mx-auto px-2">
        <div className="bg-white shadow-md ring-1 ring-gray-200 rounded-md">
          <div className="flex justify-between items-center py-2 px-2 md:px-5">
            {selectedImages.length ? (
              <>
                <h2 className="font-sans font-bold">
                  {selectedImages.length} Files Selected
                </h2>
                <Button
                  variant="text"
                  className="!text-red-600 normal-case"
                  onClick={handleDeleteImages}
                >
                  Delete files
                </Button>
              </>
            ) : (
              <>
                <h2 className="font-sans font-bold py-2">Gallery</h2>
              </>
            )}
          </div>
          <hr className="border-b-[1px] border-b-gray-400" />
          <div className="mt-2 p-3 md:p-5 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gallery">
            {images.map((image, index) => (
              <Images
                key={image}
                imageURL={image}
                index={index}
                isSelected={selectedImages.includes(image)}
                moveImage={moveImage}
                handleImageClick={handleImageClick}
              />
            ))}
            <div className="border-dashed border-[3px] aspect-square relative rounded-md overflow-hidden group transition-all flex justify-center items-center flex-col cursor-pointer hover:scale-105">
              <TiImage />
              <h2 className="select-none">Add images</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
