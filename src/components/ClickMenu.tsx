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
        className={`fixed z-10 bg-gray-900 p-4`}
        style={{ top: `${coords.y - 110}px`, left: `${coords.x - 150}px` }}
      >
        <div className="flex w-48 justify-between text-gray-50">
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
