import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

type GameboardPropsType = {
  gameSelected: "waldo-1" | "waldo-2";
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setLastTimeScore: React.Dispatch<React.SetStateAction<number>>;
};

function Gameboard({
  gameSelected,
  setGameEnded,
  setLastTimeScore,
}: GameboardPropsType) {
  // console.log("gameSelected", gameSelected);
  const [imageSrc, setImageSrc] = useState("");
  const [characterCoords, setCharacterCoords] = useState({});
  // console.log("imageSrc: ", imageSrc);
  
  function handleImageClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    // console.log("currentTarget Height", e.currentTarget.height)
    // console.log(e);
    console.log(e.target);
    console.log(e.currentTarget);
    console.log(e.clientX);
    console.log(e.clientY);
    console.log("Click was on:");
    // these coordinates are the actual coordinates from the document.
    // offset values provide the compensation for margin and padding around the image
    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;
    console.log({x,y});
    console.log(`The size of this image is ${e.currentTarget.height} x ${e.currentTarget.width}`)
    const xRel = x / e.currentTarget.width;
    const yRel = y / e.currentTarget.height;
    console.log(`The relative coords are X: ${xRel} and Y: ${yRel}`);
    
  }
  useEffect(() => {
    const getWaldoImage = async (id: string) => {
      if (id === "waldo-1") {
        try {
          const url = await getDownloadURL(
            ref(
              storage,
              "gs://where-waldo-a6530.appspot.com/game-images/waldo-1.jpeg"
            )
          );
          // console.log("url", url);
          setImageSrc(url);
        } catch (e) {
          console.error(e);
        }
      } else {
        const url = await getDownloadURL(
          ref(storage, "game-images/waldo-2.jpeg")
        );
        // console.log(url);
        setImageSrc(url);
      }
    };
    getWaldoImage(gameSelected);
  }, []);

  return (
    <div>
      {!imageSrc ? <p>Loading...</p> : null}
      <img onClick={handleImageClick} src={imageSrc} alt="waldo image should be here"/>
    </div>
  );
}

export default Gameboard;
