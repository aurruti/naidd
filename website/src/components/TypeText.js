import React, { useEffect, useState } from "react"
import { motion } from 'framer-motion';
import i18n from "i18next";

import { alphabet } from "../locales/alphabet";

const TypeLetter = ({ letter, letterTime, letterDelay }) => {
  const currentLocale = i18n.language;
  const currentAlphabet = alphabet[currentLocale];

  const [count, setCount] = useState(currentAlphabet[0]);

  useEffect(() => {
    let currentIndex = 0;

    const startTyping = () => {
      const interval = setInterval(() => {
        setCount(currentAlphabet[currentIndex]);
        if (currentAlphabet[currentIndex] === letter || currentIndex >= currentAlphabet.length) {
          clearInterval(interval);
        } else {
          currentIndex++;
        }
      }, letterTime);
    };

    const delayTimeout = setTimeout(startTyping, letterDelay * 1000);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [currentAlphabet, letter, letterTime, letterDelay]);

  return (
    <p style={{ display: "inline-block"}}>
      {count}
    </p>
  );
};

export default function TypeText({ 
  text,
  letterTime = 25,
  letterDelay = 1,
  font="sans-serif",
 }) {
  let delayList = [];
  for (let i = 0; i < text.length; i++) {
    delayList.push(i * letterDelay);
  }

  // const getTextWidth = (text, font) => {
  //   const canvas = document.createElement("canvas");
  //   const context = canvas.getContext("2d");
  //   context.font = font;
  //   return context.measureText(text).width;
  // };

  const element = document.createElement("span");
  element.style.fontFamily = font;
  document.body.appendChild(element);
  // const fontStyle = window.getComputedStyle(element).font;
  document.body.removeChild(element);
  // const textWidth = getTextWidth(text, fontStyle);
  return (
    <motion.pre 
      style={{ fontFamily:font, display: "flex", flexDirection: "row"}}
      >
      {text.split("").map((letter, index) => (
      <TypeLetter key={index} letter={letter} letterTime={letterTime} letterDelay={delayList[index]} />
      ))}
    </motion.pre>
  );
}