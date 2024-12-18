import React from 'react';
import { motion } from 'framer-motion';

import SvgLetterToMotionPath from '../fun/SvgLetterToMotionPath';

export default function DrawText({ 
  text,
  stroke = "white",
  fill = "transparent",
  strokeWidth = 3,
  scale = 1,
  letterSpacing = 2,
  xOffset = 0,
  yOffset = -90,
  debug = false,
  letterDelay = 1,
  letterAnimationDuration = 7
}) {
  let delayList = [];
  for (let i = 0; i < text.length; i++) {
    delayList.push(i * letterDelay);
  }

  return (
    <motion.div
      style={{display: 'flex', flexDirection: 'row' }}
      aria-label={text}
    >
    {text.split('').map((letter, i) => (
        <SvgLetterToMotionPath 
          key={i}
          letter={letter}
          stroke={stroke}
          fill={fill}
          strokeWidth={strokeWidth}
          scale={scale}
          letterSpacing={letterSpacing}
          animationDuration={letterAnimationDuration}
          animationDelay={delayList[i]}
          xOffset={xOffset}
          yOffset={yOffset}
          debug={debug}
        />
    ))}
    </motion.div>
  );
}