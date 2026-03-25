'use client';

import { useState, useEffect } from 'react';


const ToggleName = () => {
  
  const nameVariations = ["Lemuel", "Lem", "Lemuel\u00A0De\u00A0La\u00A0Cruz"];
  const comments = [
    "Back to my first name, \ngood luck pronouncing it... 😅",
    "Ahhh better... 😁\nThis is what my friends call me.\n It's easier to pronounce and remember!",
    "Now you know my full name!\nBut I prefer if you call me Lem 🙂‍↕️👍"
  ];


  const [idxCount, setIdxCount] = useState(0);
  const [displayedText, setDisplayedText] = useState(nameVariations[0]);
  const [comment, setComment] = useState("Try clicking on my name!");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const handleClick = () => {
    // Only trigger if we aren't already in the middle of an animation
    if (!isDeleting && !isWaiting) {
      setIsDeleting(true);
    }
  };
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const currentFullText = nameVariations[idxCount];
    const nextIdx = (idxCount + 1) % nameVariations.length;
    
    // Deleting the current text
    if (isDeleting && displayedText.length > 0) {
      setComment("");
      timer = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, 10); // Backspacing speed
    } 
    // Finished deleting, switch to next name
    else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setIdxCount(nextIdx);
      setIsWaiting(true); // Small pause before typing starts
    } 
    
    // Waiting before typing new name
    else if (isWaiting) {
      timer = setTimeout(() => setIsWaiting(false), 100);
    }
    // Typing the new text
    else if (!isDeleting && displayedText !== currentFullText) {
      timer = setTimeout(() => {
        setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
      }, 40 - currentFullText.length*2 > 15 ? 50 - currentFullText.length : 15); // Typing speed
      setComment(comments[nextIdx]);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [displayedText, isDeleting, isWaiting, idxCount, nameVariations]);
  
  return (
    <span className='group'>
      {"Hi, I'm\u00A0"}<span
        className="cursor-pointer text-blue-950 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors mr-3"
        onClick={handleClick}
        >
        {displayedText}
      </span>
      <span className='text-sm absolute opacity-0 group-hover:opacity-100 transition-opacity 
                      pointer-events-none group-hover:pointer-events-auto duration-500 justify-center
                      whitespace-pre-line text-zinc-50/15 tracking-normal font-medium leading-4'>
        {comment}
      </span>
    </span>
    
  );
};



export default ToggleName;