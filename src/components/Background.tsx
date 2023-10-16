import { useMemo } from 'react'

// in top left, top right, bottom right, bottom left order
import purple_squiggle from '../assets/shapes/purple_squiggle.png'
import purple_sphere from '../assets/shapes/purple_sphere.png'
import pink_pyramid from '../assets/shapes/pink_pyramid.png'
import blue_squiggle from '../assets/shapes/blue_squiggle.png'
import yellow_pyramid from '../assets/shapes/yellow_pyramid.png'
import blue_donut from '../assets/shapes/blue_donut.png'
import blue_sphere from '../assets/shapes/blue_sphere.png'
import pink_tube from '../assets/shapes/pink_tube.png'
import blue_pyramid from '../assets/shapes/blue_pyramid.png'
import yellow_cube from '../assets/shapes/yellow_cube.png'
import blue_sphere_large from '../assets/shapes/blue_sphere_large.png'

import yellow_x from '../assets/confetti/yellow_x.svg'
import navy_circle from '../assets/confetti/navy_circle.svg'
import plum_zag from '../assets/confetti/plum_zag.svg'
import yellow_zag from '../assets/confetti/yellow_zag.svg'
import purple_x from '../assets/confetti/purple_x.svg'
import pink_circle from '../assets/confetti/pink_circle.svg'
import yellow_x_alt from '../assets/confetti/yellow_x_alt.svg'
import pink_circle_alt from '../assets/confetti/pink_circle_alt.svg'
import navy_zag from '../assets/confetti/navy_zag.svg'
import plum_circle from '../assets/confetti/plum_circle.svg'
import pink_x from '../assets/confetti/pink_x.svg'
import blue_zag from '../assets/confetti/blue_zag.svg'

const shapeData = [
  { name: "purple squiggle",  src: purple_squiggle,   x: 70,    y: 310 },
  { name: "purple sphere",    src: purple_sphere,     x: 160,   y: 120 },
  { name: "pink pyramid",     src: pink_pyramid,      x: 458,   y: 0   },
  { name: "blue squiggle",    src: blue_squiggle,     x: 1230,  y: 0   },
  { name: "yellow pyramid",   src: yellow_pyramid,    x: 1400,  y: 470 },
  { name: "blue donut",       src: blue_donut,        x: 1330,  y: 830 },
  { name: "blue sphere",      src: blue_sphere,       x: 1170,  y: 760 },
  { name: "pink tube",        src: pink_tube,         x: 1220,  y: 960 },
  { name: "blue pyramid",     src: blue_pyramid,      x: 510,   y: 930 },
  { name: "yellow cube",      src: yellow_cube,       x: 190,   y: 970 },
  { name: "large blue sphere",src: blue_sphere_large, x: 20,    y: 830 },
]

const confettiData = [
  { name: "yellow x confetti", src: yellow_x, x: 134, y: 42 },
  { name: "navy circle confetti", src: navy_circle, x: 300, y: 280 },
  { name: "plum zag confetti", src: plum_zag, x: 574, y: 80 },
  { name: "yellow zag confetti", src: yellow_zag, x: 912, y: 54 },
  { name: "purple x confetti", src: purple_x, x: 1090, y: 350 },
  { name: "pink circle confetti", src: pink_circle, x: 1340, y: 220 },
  { name: "yellow x alt confetti", src: yellow_x_alt, x: 1330, y: 736 },
  { name: "pink circle alt confetti", src: pink_circle_alt, x: 1316, y: 914 },
  { name: "navy zag confetti", src: navy_zag, x: 1092, y: 868 },
  { name: "plum circle confetti", src: plum_circle, x: 304, y: 810 },
  { name: "pink x confetti", src: pink_x, x: 104, y: 772 },
  { name: "blue zag confetti", src: blue_zag, x: 120, y: 600 },
]

type WindowDimensions = { height: number, width: number }

export default function Background({winDims}: {winDims: WindowDimensions}) {
  const baseWidth = 1440
  const baseHeight = 1024
  
  const positionThing = (x: number, y: number) => {
    const newX = (x / baseWidth) * winDims.width
    const newY = (y / baseHeight) * winDims.height
    return { transform: `translate(-50%, -50%) translate(${newX}px, ${newY}px)`, }
  }
  
  const shapeStyles = useMemo(() => shapeData.map(shape => positionThing(shape.x, shape.y)), [winDims, shapeData]);

  const confettiStyles = useMemo(() => confettiData.map(confetti => positionThing(confetti.x, confetti.y)), [winDims, confettiData]);

  return (
    <div id="ShapeBackground" className="absolute h-screen w-screen overflow-hidden">
      <div className="absolute bottom-0 h-14 w-screen flex justify-center items-center bg-black">
          <a className="text-white hover:text-[#FFD464]" href="http://jakerandall.me">Made by your good friend Jake</a>
      </div>
      {shapeData.map((shape, index) => ( 
        <img key={shape.name} src={shape.src} className="absolute" alt={shape.name} style={shapeStyles[index]} /> 
      ))}
      {confettiData.map((confetti, index) => ( 
        <img key={confetti.name} src={confetti.src} className="absolute" alt={confetti.name} style={confettiStyles[index]} /> 
      ))}
    </div>
  )
}