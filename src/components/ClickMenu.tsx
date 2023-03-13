import React from "react";

type ClickMenuProps = {
  show: boolean;
  coords: {
    x: number;
    y: number;
  };
  setShowClickMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleCharacterClick: (character: "waldo" | "wizard") => void;
};

export default function ClickMenu({
  show,
  coords,
  setShowClickMenu,
  handleCharacterClick,
}: ClickMenuProps) {
  if (show) {
    return (
      <div
        className={`bg-gray-900 fixed z-10 p-4`}
        style={{ top: `${coords.y - 100}px`, left: `${coords.x - 50}px` }}
      >
        <div className="flex justify-between text-gray-50 w-48">
          <p className="text-gray-50">Who did you find?</p>
          <p className="cursor-pointer" onClick={() => setShowClickMenu(false)}>
            X
          </p>
        </div>
        <div className="text-gray-50">
          <p
            className="cursor-pointer hover:bg-gray-700"
            onClick={() => {
              handleCharacterClick("waldo");
              setShowClickMenu(false);
            }}
          >
            Waldo
          </p>
          <p
            className="cursor-pointer hover:bg-gray-700"
            onClick={() => {
              handleCharacterClick("wizard");
              setShowClickMenu(false);
            }}
          >
            Wizard
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
