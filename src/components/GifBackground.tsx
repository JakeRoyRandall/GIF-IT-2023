import { useState, useMemo } from 'react'

// in top left, top right, bottom right, bottom left order
import waiting_1 from '../assets/gifs/waiting/waiting_1.webp'
import waiting_2 from '../assets/gifs/waiting/waiting_2.webp'
import waiting_3 from '../assets/gifs/waiting/waiting_3.webp'
import waiting_4 from '../assets/gifs/waiting/waiting_4.webp'
import waiting_5 from '../assets/gifs/waiting/waiting_5.webp'
import waiting_6 from '../assets/gifs/waiting/waiting_6.webp'
import waiting_7 from '../assets/gifs/waiting/waiting_7.webp'
import waiting_8 from '../assets/gifs/waiting/waiting_8.webp'
import waiting_9 from '../assets/gifs/waiting/waiting_9.webp'
import waiting_10 from '../assets/gifs/waiting/waiting_10.webp'

import waiting_1_frame from '../assets/gifs/waiting/waiting_1_frame.webp'
import waiting_2_frame from '../assets/gifs/waiting/waiting_2_frame.webp'
import waiting_3_frame from '../assets/gifs/waiting/waiting_3_frame.webp'
import waiting_4_frame from '../assets/gifs/waiting/waiting_4_frame.webp'
import waiting_5_frame from '../assets/gifs/waiting/waiting_5_frame.webp'
import waiting_6_frame from '../assets/gifs/waiting/waiting_6_frame.webp'
import waiting_7_frame from '../assets/gifs/waiting/waiting_7_frame.webp'
import waiting_8_frame from '../assets/gifs/waiting/waiting_8_frame.webp'
import waiting_9_frame from '../assets/gifs/waiting/waiting_9_frame.webp'
import waiting_10_frame from '../assets/gifs/waiting/waiting_10_frame.webp'

import pointing_1 from '../assets/gifs/pointing/pointing_1.webp'
import pointing_2 from '../assets/gifs/pointing/pointing_2.webp'
import pointing_3 from '../assets/gifs/pointing/pointing_3.webp'
import pointing_4 from '../assets/gifs/pointing/pointing_4.webp'
import pointing_5 from '../assets/gifs/pointing/pointing_5.webp'
import pointing_6 from '../assets/gifs/pointing/pointing_6.webp'
import pointing_7 from '../assets/gifs/pointing/pointing_7.webp'
import pointing_8 from '../assets/gifs/pointing/pointing_8.webp'
import pointing_9 from '../assets/gifs/pointing/pointing_9.webp'

import pointing_1_frame from '../assets/gifs/pointing/pointing_1_frame.webp'
import pointing_2_frame from '../assets/gifs/pointing/pointing_2_frame.webp'
import pointing_3_frame from '../assets/gifs/pointing/pointing_3_frame.webp'
import pointing_4_frame from '../assets/gifs/pointing/pointing_4_frame.webp'
import pointing_5_frame from '../assets/gifs/pointing/pointing_5_frame.webp'
import pointing_6_frame from '../assets/gifs/pointing/pointing_6_frame.webp'
import pointing_7_frame from '../assets/gifs/pointing/pointing_7_frame.webp'
import pointing_8_frame from '../assets/gifs/pointing/pointing_8_frame.webp'
import pointing_9_frame from '../assets/gifs/pointing/pointing_9_frame.webp'

import thinking_1 from '../assets/gifs/thinking/thinking_1.webp'
import thinking_2 from '../assets/gifs/thinking/thinking_2.webp'
import thinking_3 from '../assets/gifs/thinking/thinking_3.webp'
import thinking_4 from '../assets/gifs/thinking/thinking_4.webp'
import thinking_5 from '../assets/gifs/thinking/thinking_5.webp'
import thinking_6 from '../assets/gifs/thinking/thinking_6.webp'
import thinking_7 from '../assets/gifs/thinking/thinking_7.webp'
import thinking_8 from '../assets/gifs/thinking/thinking_8.webp'
import thinking_9 from '../assets/gifs/thinking/thinking_9.webp'
import thinking_10 from '../assets/gifs/thinking/thinking_10.webp'

import thinking_1_frame from '../assets/gifs/thinking/thinking_1_frame.webp'
import thinking_2_frame from '../assets/gifs/thinking/thinking_2_frame.webp'
import thinking_3_frame from '../assets/gifs/thinking/thinking_3_frame.webp'
import thinking_4_frame from '../assets/gifs/thinking/thinking_4_frame.webp'
import thinking_5_frame from '../assets/gifs/thinking/thinking_5_frame.webp'
import thinking_6_frame from '../assets/gifs/thinking/thinking_6_frame.webp'
import thinking_7_frame from '../assets/gifs/thinking/thinking_7_frame.webp'
import thinking_8_frame from '../assets/gifs/thinking/thinking_8_frame.webp'
import thinking_9_frame from '../assets/gifs/thinking/thinking_9_frame.webp'
import thinking_10_frame from '../assets/gifs/thinking/thinking_10_frame.webp'

import clapping_1 from '../assets/gifs/clapping/clapping_1.webp'
import clapping_2 from '../assets/gifs/clapping/clapping_2.webp'
import clapping_3 from '../assets/gifs/clapping/clapping_3.webp'
import clapping_4 from '../assets/gifs/clapping/clapping_4.webp'
import clapping_5 from '../assets/gifs/clapping/clapping_5.webp'
import clapping_6 from '../assets/gifs/clapping/clapping_6.webp'
import clapping_7 from '../assets/gifs/clapping/clapping_7.webp'
import clapping_8 from '../assets/gifs/clapping/clapping_8.webp'
import clapping_9 from '../assets/gifs/clapping/clapping_9.webp'
import clapping_10 from '../assets/gifs/clapping/clapping_10.webp'

import clapping_1_frame from '../assets/gifs/clapping/clapping_1_frame.webp'
import clapping_2_frame from '../assets/gifs/clapping/clapping_2_frame.webp'
import clapping_3_frame from '../assets/gifs/clapping/clapping_3_frame.webp'
import clapping_4_frame from '../assets/gifs/clapping/clapping_4_frame.webp'
import clapping_5_frame from '../assets/gifs/clapping/clapping_5_frame.webp'
import clapping_6_frame from '../assets/gifs/clapping/clapping_6_frame.webp'
import clapping_7_frame from '../assets/gifs/clapping/clapping_7_frame.webp'
import clapping_8_frame from '../assets/gifs/clapping/clapping_8_frame.webp'
import clapping_9_frame from '../assets/gifs/clapping/clapping_9_frame.webp'
import clapping_10_frame from '../assets/gifs/clapping/clapping_10_frame.webp'

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"
type WindowDimensions = { height: number, width: number }
type GifBackgroundProps = { appState: AppState, winDims: WindowDimensions }
type Gif = { name: string, frame: string, src: string, w: number, h: number, x: number, y: number, rotation: number }

export default function GifBackground({appState, winDims}: GifBackgroundProps) {
  // not in top left, top right, bottom right, bottom left order
  const waitingGifsData = [
    { name: "waiting 4", frame: waiting_4_frame, src: waiting_4, w: 300, h: 300, x: (winDims.width / 2 ) - 200, y: (winDims.height / 2) - 200, rotation: 0  },
    { name: "waiting 5", frame: waiting_5_frame, src: waiting_5, w: 180, h: 140, x: 300, y: 150, rotation: 9  },
    { name: "waiting 1", frame: waiting_1_frame, src: waiting_1, w: 160, h: 160, x: 842, y: 820, rotation: -4 },
    { name: "waiting 2", frame: waiting_2_frame, src: waiting_2, w: 250, h: 150, x: 1150, y: 480, rotation: 2  },
    { name: "waiting 3", frame: waiting_3_frame, src: waiting_3, w: 120, h: 180, x: 270, y: 488, rotation: -5 },
    { name: "waiting 7", frame: waiting_7_frame, src: waiting_7, w: 100, h: 100, x: 350, y: 568, rotation: -4  },
    { name: "waiting 6", frame: waiting_6_frame, src: waiting_6, w: 260, h: 100, x: 345, y: 740, rotation: 0  },
    { name: "waiting 9", frame: waiting_9_frame, src: waiting_9, w: 160, h: 130, x: 750, y: 60, rotation: -12  },
    { name: "waiting 8", frame: waiting_8_frame, src: waiting_8, w: 180, h: 150, x: 1140, y: 220, rotation: -7  },
    { name: "waiting 10", frame: waiting_10_frame, src: waiting_10, w: 120, h: 100, x: 1140, y: 740, rotation: -4  },
  ]
  
  const pointingGifsData = [
    { name: "pointing 1", frame: pointing_1_frame, src: pointing_1, w: 146, h: 136, x: 700, y: 50, rotation: 6 },
    { name: "pointing 3", frame: pointing_3_frame, src: pointing_3, w: 126, h: 124, x: 1208, y: 308, rotation: 10 },
    { name: "pointing 2", frame: pointing_2_frame, src: pointing_2, w: 238, h: 134, x: 1100, y: 204, rotation: -13  },
    { name: "pointing 4", frame: pointing_4_frame, src: pointing_4, w: 240, h: 170, x: 1170, y: 578, rotation: 8  },
    { name: "pointing 5", frame: pointing_5_frame, src: pointing_5, w: 260, h: 160, x: 810, y: 790, rotation: -6.5  },
    { name: "pointing 7", frame: pointing_7_frame, src: pointing_7, w: 224, h: 156, x: 280, y: 700, rotation: -16  },
    { name: "pointing 6", frame: pointing_6_frame, src: pointing_6, w: 112, h: 112, x: 410, y: 770, rotation: -3.5  },
    { name: "pointing 8", frame: pointing_8_frame, src: pointing_8, w: 198, h: 132, x: 270, y: 450, rotation: -3  },
    { name: "pointing 9", frame: pointing_9_frame, src: pointing_9, w: 244, h: 166, x: 320, y: 170, rotation: 9  }
  ]
  
  const thinkingGifsData = [
    { name: "thinking 1", frame: thinking_1_frame, src: thinking_1, w: 156, h: 118, x: 730, y: 66, rotation: -8.5 },
    { name: "thinking 2", frame: thinking_2_frame, src: thinking_2, w: 164, h: 132, x: 1040, y: 240, rotation: -10  },
    { name: "thinking 3", frame: thinking_3_frame, src: thinking_3, w: 188, h: 94, x: 1140, y: 440, rotation: 5 },
    { name: "thinking 4", frame: thinking_4_frame, src: thinking_4, w: 268, h: 150, x: 1110, y: 620, rotation: 10  },
    { name: "thinking 5", frame: thinking_5_frame, src: thinking_5, w: 148, h: 148, x: 900, y: 890, rotation: 13  },
    { name: "thinking 6", frame: thinking_6_frame, src: thinking_6, w: 200, h: 120, x: 410, y: 910, rotation: -9  },
    { name: "thinking 9", frame: thinking_9_frame, src: thinking_9, w: 160, h: 96, x: 200, y: 460, rotation: -14  },
    { name: "thinking 8", frame: thinking_8_frame, src: thinking_8, w: 216, h: 190, x: 320, y: 560, rotation: -7  },
    { name: "thinking 7", frame: thinking_7_frame, src: thinking_7, w: 180, h: 110, x: 270, y: 700, rotation: -21  },
    { name: "thinking 10", frame: thinking_10_frame, src: thinking_10, w: 250, h: 114, x:330, y: 180, rotation: 9  }
  ]
  
  const clappingGifsData = [
    { name: "clapping 1", frame: clapping_1_frame, src: clapping_1, w: 180, h: 180, x: 734, y: 60, rotation: -4 },
    { name: "clapping 2", frame: clapping_2_frame, src: clapping_2, w: 180, h: 140, x: 1060, y: 234, rotation: -12  },
    { name: "clapping 3", frame: clapping_3_frame, src: clapping_3, w: 212, h: 228, x: 1174, y: 528, rotation: 4 },
    { name: "clapping 4", frame: clapping_4_frame, src: clapping_4, w: 104, h: 136, x: 1060, y: 628, rotation: 0  },
    { name: "clapping 5", frame: clapping_5_frame, src: clapping_5, w: 130, h: 130, x: 910, y: 870, rotation: 9  },
    { name: "clapping 6", frame: clapping_6_frame, src: clapping_6, w: 200, h: 132, x: 500, y: 928, rotation: 14  },
    { name: "clapping 7", frame: clapping_7_frame, src: clapping_7, w: 160, h: 160, x: 260, y: 720, rotation: -4  },
    { name: "clapping 9", frame: clapping_8_frame, src: clapping_9, w: 162, h: 144, x: 330, y: 440, rotation: -12  },
    { name: "clapping 8", frame: clapping_9_frame, src: clapping_8, w: 145, h: 70, x: 250, y: 500, rotation: 13  },
    { name: "clapping 10", frame: clapping_10_frame, src: clapping_10, w: 200, h: 150, x: 340, y: 160, rotation: 13  }
  ]
  
  const gifsData = [...waitingGifsData, ...pointingGifsData, ...thinkingGifsData, ...clappingGifsData]
  
  const baseWidth = 1440; const baseHeight = 1024
  
  const styleThing = ({x, y, w, h, rotation}: Gif) => {
    const newX = (x / baseWidth) * winDims.width
    const newY = (y / baseHeight) * winDims.height
    return {
      transform: `translate(-50%, -50%) translate(${newX}px, ${newY}px) rotate(${rotation}deg)  ${winDims.width < 1000 ? "scale(75%)" : "scale(100%)"}`,
      height: `${h}px`, width: `${w}px`
    }
  }
  
  const gifStyles = useMemo(() => gifsData.map(gif => styleThing(gif)), [winDims, gifsData]);

  return (
    <div id="GifBackground" className="hidden sm:flex absolute h-screen w-screen overflow-hidden">
      { appState === "ready" && pointingGifsData.map((gif, index) => <ImageContainer key={gif.name} gif={gif} style={gifStyles[index + 10]} /> )}
      { appState === "details" && thinkingGifsData.map((gif, index) => <ImageContainer key={gif.name} gif={gif} style={gifStyles[index + 19]}/>)}
      { appState === "processing" && waitingGifsData.map((gif, index) => <ImageContainer key={gif.name} gif={gif}  style={gifStyles[index]}/>)}
      { appState === "done" && clappingGifsData.map((gif, index) => <ImageContainer key={gif.name} gif={gif} style={gifStyles[index + 29]}/>)}
    </div>
  )
}

function ImageContainer({gif, style}: {gif: Gif, style: any}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div  className="absolute object-cover" style={style}>
      <img  src={gif.frame} alt="gif placeholder"
            style={{ display: imageLoaded ? 'none' : 'block' }}
      />
      <img  src={gif.src} alt={gif.name} onLoad={() => setImageLoaded(true)} 
            style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </div>
  )
}