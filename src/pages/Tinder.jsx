import tags from "../assets/tags/tags";
import { useState, useEffect } from "react";
import generateImage from "../scripts/openAiImages";

const Tinder = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shownImage, setShownImage] = useState("");
  const [nextShownImage, setNextShownImage] = useState("");

  useEffect(() => {
    const obtainImage = async () => {
      try {
        const imageURL = await generateImage(tags[currentIndex]);
        setShownImage(imageURL);

        if (currentIndex + 1 < tags.length) {
          const nextImageURL = await generateImage(tags[currentIndex + 1]);
          setNextShownImage(nextImageURL);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtainImage();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex + 1 < tags.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <img src={shownImage} alt="" />
      <p>{tags[currentIndex]}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Tinder;
