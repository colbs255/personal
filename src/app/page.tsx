"use client";

import React, { useState, useEffect } from "react";

const name = "/Colby/Chance";
const joke = "/Colby/Cheese";
const common = "/Colby/Ch"

// 1) Type the joke
// 2) Backspace the joke to the common prefix
// 3) Type name correctly
const State = {
  FORWARD_JOKE: 0,
  BACKWARD_JOKE: 1,
  FORWARD_NAME: 2,
  DONE: 3,
}

export default function Home() {
  // Initialize to "/" so the element doesn't pop in
  const [displayedText, setDisplayedText] = useState("/");
  const [state, setState] = useState(State.FORWARD_JOKE);
  useEffect(() => {
    setTimeout(() => {
      switch (state) {
        case State.FORWARD_JOKE: {
          if (displayedText === joke) {
            setState(State.BACKWARD_JOKE);
          } else {
            setDisplayedText((prev) => joke.slice(0, prev.length + 1));
          }
          break;
        }
        case State.BACKWARD_JOKE: {
          if (displayedText === common) {
            setState(State.FORWARD_NAME);
          } else {
            setDisplayedText((prev) => joke.slice(0, prev.length - 1));
          }
          break;
        }
        case State.FORWARD_NAME: {
          if (displayedText === name) {
            setState(State.DONE);
          } else {
            setDisplayedText((prev) => name.slice(0, prev.length + 1));
          }
          break;
        }
        case State.DONE: {
          // do nothing
          break;
        }
        default: {
          throw new Error(`Unhandled state`);
        }
      }
    }, 100);
  }, [displayedText, state]);

  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {displayedText}
      </h1>
       <p className="mb-4">
        {`Hi! This is my personal site where I host my writings and talks.`}
      </p>
    </div>
  );
}
