import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getRelativeCoords } from "../lib/utils";
import ClickMenu from "./ClickMenu";

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
};

function Gameboard({
  gameSelected,
  setGameEnded,
  setLastTimeScore,
}: GameboardPropsType) {
  const [imageSrc, setImageSrc] = useState("");
  const [timeKeeping, setTimeKeeping] = useState({ startTime: Date.now() });
  const [showClickMenu, setShowClickMenu] = useState(false);
  // lastScreemClickCoords are the coords for the click on the entire screen
  // This helps position the clickMenu Component
  const [lastScreenClickCoords, setLastScreenClickCoords] = useState({
    x: 0,
    y: 0,
  });
  // lastRelClickCoords are the relative coordinates from the click
  // on the image itself. This is used to see if the click was on the correct character
  const [lastRelClickCoords, setLastRelClickCoords] = useState({
    xRel: 0,
    yRel: 0,
  });
  const [waldoCoords, setWaldoCoords] = useState<CharacterCoordsType | null>();
  const [wizardCoords, setWizardCoords] =
    useState<CharacterCoordsType | null>();
  const [charactersFound, setCharactersFound] = useState({
    waldo: false,
    wizard: false,
  });

  function handleImageClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    // console.log("currentTarget Height", e.currentTarget.height)
    // console.log("currentTarget Width", e.currentTarget.width)
    // console.dir(e);
    // console.dir(e.target);
    // console.dir(e.currentTarget);
    // these coordinates are the actual coordinates from the document.
    // offset values provide the compensation for margin and padding around the image
    const x =
      e.pageX - (e.currentTarget.offsetParent as HTMLElement).offsetLeft;
    const y = e.pageY - (e.currentTarget.offsetParent as HTMLElement).offsetTop;
    // console.log(`Click was on screenX: ${e.screenX} screenY: ${e.screenY}`);
    // console.log("Click was on:");
    // console.log({ x, y });
    // console.log(
    //   `The size of this image is ${e.currentTarget.width} x ${e.currentTarget.height}`
    // );
    const xRel = x / e.currentTarget.width;
    const yRel = y / e.currentTarget.height;
    // console.log(`The relative coords are X: ${xRel} and Y: ${yRel}`);
    setLastRelClickCoords({ xRel: xRel, yRel: yRel });
    setLastScreenClickCoords({ x: e.pageX, y: e.screenY });
    setShowClickMenu(true);
  }

  function handleCharacterClick(character: "waldo" | "wizard") {
    if (character === "waldo" && !charactersFound.waldo) {
      // check if lastRelClickCoords match for Waldo Character
      const waldoXFound =
        Math.abs(lastRelClickCoords.xRel - waldoCoords?.xRel!) <
        waldoCoords?.xVarience!;
      const waldoYFound =
        Math.abs(lastRelClickCoords.yRel - waldoCoords?.yRel!) <
        waldoCoords?.yVarience!;
      setCharactersFound((state) => ({
        ...state,
        waldo: waldoXFound && waldoYFound,
      }));
    } else if (character === "wizard" && !charactersFound.wizard) {
      const wizardXFound =
        Math.abs(lastRelClickCoords.xRel - wizardCoords?.xRel!) <
        wizardCoords?.xVarience!;
      const wizardYFound =
        Math.abs(lastRelClickCoords.yRel - wizardCoords?.yRel!) <
        wizardCoords?.yVarience!;
      setCharactersFound((state) => ({
        ...state,
        wizard: wizardXFound && wizardYFound,
      }));
    }
  }
  // Gets image and character coords at mount
  useEffect(() => {
    const getWaldoImage = async (id: string) => {
      try {
        const url = await getDownloadURL(
          ref(
            storage,
            `gs://where-waldo-a6530.appspot.com/game-images/${id}-app.jpg`
          )
        );
        setImageSrc(url);
      } catch (e) {
        console.error(e);
      }
    };
    // get coordinates and data
    async function getCharacterCoords() {
      const docRef = doc(firestore, "characterCoords", `${gameSelected}-image`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // calculate relative coordinates and variance
        const { imgHeight, imgWidth } = docSnap.data();
        const {
          x: waldoX,
          y: waldoY,
          xRange: waldoXRange,
          yRange: waldoYRange,
        } = docSnap.data().waldo;
        const {
          x: wizardX,
          y: wizardY,
          xRange: wizardXRange,
          yRange: wizardYRange,
        } = docSnap.data().wizard;
        const waldoCoords = getRelativeCoords(
          imgHeight,
          imgWidth,
          waldoX,
          waldoY,
          waldoXRange,
          waldoYRange
        );
        const wizardCoords = getRelativeCoords(
          imgHeight,
          imgWidth,
          wizardX,
          wizardY,
          wizardXRange,
          wizardYRange
        );
        setWaldoCoords(waldoCoords);
        setWizardCoords(wizardCoords);
      } else {
        console.error(
          "something went from with getting image and character data"
        );
      }
    }
    getCharacterCoords();
    getWaldoImage(gameSelected);
  }, []);

  // sets GameEnded when both characters are found
  useEffect(() => {
    if (charactersFound.waldo && charactersFound.wizard) {
      const timeinSeconds = (Date.now() - timeKeeping.startTime) / 1000;
      setLastTimeScore(timeinSeconds);
      setGameEnded(true);
    }
  }, [charactersFound]);

  return (
    <div className="relative">
      {!imageSrc ? <p>Loading...</p> : null}
      <img
        onClick={handleImageClick}
        src={imageSrc}
        alt="waldo image should be here"
      />
      <ClickMenu
        show={showClickMenu}
        coords={lastScreenClickCoords}
        setShowClickMenu={setShowClickMenu}
        handleCharacterClick={handleCharacterClick}
      />
    </div>
  );
}

export default Gameboard;
