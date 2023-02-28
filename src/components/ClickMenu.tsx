import React from 'react'

type ClickMenuProps = {
  show: boolean;
  coords: {
    x: number;
    y: number;
  };
  setShowClickMenu: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function ClickMenu({show, coords, setShowClickMenu}: ClickMenuProps) {
  if (show) {
    return (
      <div className={`bg-gray-900 fixed z-10 p-4`} style={{top: `${coords.y -100}px`, left: `${coords.x-50}px`}} onClick={() => setShowClickMenu(false)}>
        <div className="flex justify-between text-gray-50 w-48">
          <p className="text-gray-50">Who did you find?</p>
          <p>X</p>
        </div>
        <div className="text-gray-50"> 
          <p>Waldo</p>
          <p>Wizard</p>
        </div>
      </div>
    )
  } else {
    return null;
  }
}
