import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getRelativeCoords } from "../lib/utils";

type GameboardPropsType = {
  gameSelected: "waldo-1" | "waldo-2";
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setLastTimeScore: React.Dispatch<React.SetStateAction<number>>;
};

type CharacterCoordsType = {
  xRel: number;
  yRel: number;
  xVarience: number;
  yVarience: number;
}

function Gameboard({
  gameSelected,
  setGameEnded,
  setLastTimeScore,
}: GameboardPropsType) {
  const [imageSrc, setImageSrc] = useState("");
  const [waldoCoords, setWaldoCoords] = useState<CharacterCoordsType | null>();
  const [wizardCoords, setWizardCoords] = useState<CharacterCoordsType | null>();
  
  function handleImageClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    // console.log("currentTarget Height", e.currentTarget.height)
    console.dir(e);
    console.dir(e.target);
    console.dir(e.currentTarget);
    console.log("Click was on:");
    // these coordinates are the actual coordinates from the document.
    // offset values provide the compensation for margin and padding around the image
    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
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
              "gs://where-waldo-a6530.appspot.com/game-images/waldo-1-app.jpg"
            )
          );
          // console.log("url", url);
          setImageSrc(url);
        } catch (e) {
          console.error(e);
        }
      } else {
        const url = await getDownloadURL(
          ref(storage, "game-images/waldo-2-app.jpg")
        );
        // console.log(url);
        setImageSrc(url);
      }
    };
    // get coordinates and data
    async function getCharacterCoords() {
      const docRef = doc(firestore, "characterCoords" ,`${gameSelected}-image`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // calculate relative coordinates and variance
        const { imgHeight, imgWidth } = docSnap.data();
        const { x: waldoX, y: waldoY, xRange: waldoXRange, yRange: waldoYRange } = docSnap.data().waldo;
        const { x: wizardX, y: wizardY, xRange: wizardXRange, yRange: wizardYRange } = docSnap.data().wizard;
        console.log(`Img Height: ${imgHeight}, imgWidth: ${imgWidth}`);
        console.log(`waldo x: ${waldoX} y: ${waldoY} xRange: ${waldoXRange} yRange: ${waldoYRange}`);
        console.log(`wizard x: ${wizardX} y: ${wizardY} xRange: ${wizardXRange} yRange: ${wizardYRange}`);
        const waldoCoords = getRelativeCoords(imgHeight, imgWidth, waldoX, waldoY, waldoXRange, waldoYRange);
        const wizardCoords = getRelativeCoords(imgHeight, imgWidth, wizardX, wizardY, wizardXRange, wizardYRange);
        setWaldoCoords(waldoCoords);
        setWizardCoords(wizardCoords);
      } else {
        console.error("something went from with getting image and character data");
      }
    }
    getCharacterCoords();
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
