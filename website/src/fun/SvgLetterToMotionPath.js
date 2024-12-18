import { motion } from "framer-motion";
import SvgLetter from "./SvgLetter";

const getPathExtents = (path) => {
  const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathElement.setAttribute("d", path);
  const pathLength = pathElement.getTotalLength();
  let minX = Infinity, maxX = -Infinity;

  for (let i = 0; i <= pathLength; i++) {
    const point = pathElement.getPointAtLength(i);
    if (point.x < minX) minX = point.x;
    if (point.x > maxX) maxX = point.x;
  }

  return { minX, maxX };
};

  
export const SvgLetterToMotionPath = ({
    letter,
    stroke = "#fff",
    fill = "transparent",
    strokeWidth = 3,
    scale = 1,
    letterSpacing = 2,
    animationDuration = 7,
    animationDelay = 0,
    xOffset = 0,
    yOffset = -90,
    debug = false
  }) => {
  const letterPath = SvgLetter(letter);

  const { minX, maxX } = getPathExtents(letterPath);
  let width = (strokeWidth + maxX - minX) + letterSpacing;
  if (width <= 7+strokeWidth) { width = 7+strokeWidth; }
  const height = 100*scale;

  const viewBox = `${xOffset} ${yOffset} ${width*1.2} ${100}`;

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: () => {
      const delay = animationDelay ;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { 
            delay: delay, 
            type: "spring", 
            duration: animationDuration, 
            bounce: 0 
          },
          opacity: { 
            delay: delay, 
            duration: 0.1 
          }
        }
      };
    }
  };

  if (debug) {
    console.log(`letter: ${letter}, width: ${width}, height: ${height}, minX: ${minX}, maxX: ${maxX}`);
    return (
      <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      >
        <motion.path 
          d={'M 0 0 L 0 100 L 100 100 L 100 0 Z'} fill="black" stroke={stroke} strokeWidth={strokeWidth}
          initial="hidden"
          animate="visible"
        />
      </motion.svg>
    )
  }

  return (
  <motion.svg
    width={width*scale}
    height={height}
    viewBox={viewBox}
    //variants={draw}
    //initial="hidden"
    //animate="visible"
  >
    <motion.path
      d={letterPath}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      variants={draw}
      initial="hidden"
      animate="visible"
      transform={`scale(${scale}, ${scale})`}
    />
  </motion.svg> 
  );
};

export default SvgLetterToMotionPath;

