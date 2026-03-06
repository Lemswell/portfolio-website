'use client';

import { useState } from 'react';

const ToggleName = () => {
  const [idxCount, setIdxCount] = useState(0);
  const nameVariations = ["Lemuel", "Lem", "Lemuel\u00A0De\u00A0La\u00A0Cruz"];
  const currentName = nameVariations[idxCount];
  const [displayedText, setDisplayedText] = useState(currentName);
  
  const handleClick = () => {
    setIdxCount(i => (i + 1) % nameVariations.length);

    const initialDeleteInterval = setInterval(() => 
      {
        setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        clearInterval(initialDeleteInterval);
      },
      100
    );

    const deleteInterval = setInterval(() => 
      displayedText.length != 0 
        ? setDisplayedText(displayedText.substring(0, displayedText.length - 1))
        : clearInterval(deleteInterval), 
      20
    ); 
    const typeInterval = setInterval(() =>
      displayedText.length != currentName.length
        ? setDisplayedText(currentName.substring(0, displayedText.length + 1))
        : clearInterval(typeInterval),
      100
    );
  }

  return (
    <span 
      className="inline-flex items-center cursor-pointer font-bold text-zinc-800 dark:text-zinc-100"
      onClick={handleClick}
    >
      {displayedText}
    </span>
  );
}

export default ToggleName;