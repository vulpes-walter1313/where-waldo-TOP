import React, { useEffect, useState } from "react";
import ClickMenu from "./ClickMenu";
import { useQuery } from "@tanstack/react-query";

type GameboardPropsType = {
  gameSelected: "waldo-1" | "waldo-2";
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
  charactersFound: {
    waldo: boolean;
    wizard: boolean;
  };
  setCharactersFound: React.Dispatch<
    React.SetStateAction<{
      waldo: boolean;
      wizard: boolean;
    }>
  >;
};

function Gameboard({
  gameSelected,
  setGameEnded,
  charactersFound,
  setCharactersFound,
}: GameboardPropsType) {
  const imageCode = gameSelected === "waldo-2" ? 2 : 1;
  const imgQuery = useQuery({
    queryKey: ["gameimage", imageCode],
    queryFn: async () => {
      const rawRes = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_BE_PROD_ADDR
            : import.meta.env.VITE_BE_DEV_ADDR
        }/gameimage?imageCode=${imageCode}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const res = await rawRes.json();
      if (!res.success) {
        throw new Error("Error getting image for game");
      } else {
        return res.imageUrl;
      }
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const [showClickMenu, setShowClickMenu] = useState(false);
  // lastScreenClickCoords are the coords for the click on the entire screen
  // This helps position the clickMenu Component
  const [lastScreenClickCoords, setLastScreenClickCoords] = useState({
    x: 0,
    y: 0,
  });
  // lastRelClickCoords are the relative coordinates from the click
  // on the image itself. This is used to see if the click was on the correct character
  const [lastClickCoords, setLastClickCoords] = useState({
    xCoord: 0,
    yCoord: 0,
    imgWidthpx: 0,
    imgHeightpx: 0,
  });

  function handleImageClick(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    console.log("currentTarget Height", e.currentTarget.height);
    console.log("currentTarget Width", e.currentTarget.width);
    console.dir(e);
    console.dir(e.target);
    console.dir(e.currentTarget);
    // these coordinates are the actual coordinates from the document.
    // offset values provide the compensation for margin and padding around the image
    const x =
      e.pageX - (e.currentTarget.offsetParent as HTMLElement).offsetLeft;
    const y = e.pageY - (e.currentTarget.offsetParent as HTMLElement).offsetTop;
    console.log(`Click was on screenX: ${e.screenX} screenY: ${e.screenY}`);
    console.log("Click was on:");
    console.log({ x, y });
    console.log(
      `The size of this image is ${e.currentTarget.width} x ${e.currentTarget.height}`
    );
    const imgWidthpx = e.currentTarget.width;
    const imgHeightpx = e.currentTarget.height;
    // console.log(`The relative coords are X: ${xRel} and Y: ${yRel}`);
    setLastClickCoords({
      xCoord: x,
      yCoord: y,
      imgWidthpx: imgWidthpx,
      imgHeightpx: imgHeightpx,
    });
    setLastScreenClickCoords({ x: e.pageX, y: e.screenY });
    setShowClickMenu(true);
  }

  async function handleCharacterClick(character: "waldo" | "wizard") {
    if (character === "waldo" && !charactersFound.waldo) {
      // check if lastRelClickCoords match for Waldo Character
      const rawRes = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_BE_PROD_ADDR
            : import.meta.env.VITE_BE_DEV_ADDR
        }/verifyclick`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            character: character,
            xCoord: lastClickCoords.xCoord,
            yCoord: lastClickCoords.yCoord,
            widthpx: lastClickCoords.imgWidthpx,
            heightpx: lastClickCoords.imgHeightpx,
          }),
        }
      );
      const res = await rawRes.json();
      if (res.success) {
        if (res.clickIsCorrect) {
          setCharactersFound((state) => ({
            ...state,
            waldo: true,
          }));
        }
      }
    } else if (character === "wizard" && !charactersFound.wizard) {
      const rawRes = await fetch(
        `${
          import.meta.env.PROD
            ? import.meta.env.VITE_BE_PROD_ADDR
            : import.meta.env.VITE_BE_DEV_ADDR
        }/verifyclick`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            character: character,
            xCoord: lastClickCoords.xCoord,
            yCoord: lastClickCoords.yCoord,
            widthpx: lastClickCoords.imgWidthpx,
            heightpx: lastClickCoords.imgHeightpx,
          }),
        }
      );
      const res = await rawRes.json();
      if (res.success) {
        if (res.clickIsCorrect) {
          setCharactersFound((state) => ({
            ...state,
            wizard: true,
          }));
        }
      }
    }
  }

  // sets GameEnded when both characters are found
  useEffect(() => {
    if (charactersFound.waldo && charactersFound.wizard) {
      setGameEnded(true);
    }
  }, [charactersFound]);

  return (
    <div className="relative">
      {imgQuery.isLoading ? (
        <p className="mx-auto text-center text-lg text-slate-50">Loading...</p>
      ) : null}
      {imgQuery.isError ? (
        <p className="mx-auto text-center text-lg text-slate-50">
          There was an error in fetching the image
        </p>
      ) : null}
      {imgQuery.status === "success" && imgQuery.data ? (
        <img
          onClick={handleImageClick}
          src={imgQuery.data}
          alt="waldo image should be here"
        />
      ) : null}
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
