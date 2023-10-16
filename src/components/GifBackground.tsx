import { useMemo } from 'react'

// in top left, top right, bottom right, bottom left order
import pointing_1 from '../assets/gifs/pointing/pointing_1.gif'
import pointing_2 from '../assets/gifs/pointing/pointing_2.gif'
import pointing_3 from '../assets/gifs/pointing/pointing_3.gif'
import pointing_4 from '../assets/gifs/pointing/pointing_4.gif'
import pointing_5 from '../assets/gifs/pointing/pointing_5.gif'
import pointing_6 from '../assets/gifs/pointing/pointing_6.gif'
import pointing_7 from '../assets/gifs/pointing/pointing_7.gif'
import pointing_8 from '../assets/gifs/pointing/pointing_8.gif'
import pointing_9 from '../assets/gifs/pointing/pointing_9.gif'

// import thinking_1 from '../assets/gifs/thinking/thinking_1.gif'
// import thinking_2 from '../assets/gifs/thinking/thinking_2.gif'
// import thinking_3 from '../assets/gifs/thinking/thinking_3.gif'
// import thinking_4 from '../assets/gifs/thinking/thinking_4.gif'
// import thinking_5 from '../assets/gifs/thinking/thinking_5.gif'
// import thinking_6 from '../assets/gifs/thinking/thinking_6.gif'
// import thinking_7 from '../assets/gifs/thinking/thinking_7.gif'
// import thinking_8 from '../assets/gifs/thinking/thinking_8.gif'
// import thinking_9 from '../assets/gifs/thinking/thinking_9.gif'
// import thinking_10 from '../assets/gifs/thinking/thinking_10.gif'

// import clapping_1 from '../assets/gifs/clapping/clapping_1.gif'
// import clapping_2 from '../assets/gifs/clapping/clapping_2.gif'
// import clapping_3 from '../assets/gifs/clapping/clapping_3.gif'
// import clapping_4 from '../assets/gifs/clapping/clapping_4.gif'
// import clapping_5 from '../assets/gifs/clapping/clapping_5.gif'
// import clapping_6 from '../assets/gifs/clapping/clapping_6.gif'
// import clapping_7 from '../assets/gifs/clapping/clapping_7.gif'
// import clapping_8 from '../assets/gifs/clapping/clapping_8.gif'
// import clapping_9 from '../assets/gifs/clapping/clapping_9.gif'
// import clapping_10 from '../assets/gifs/clapping/clapping_10.gif'

const pointingGifsData = [
  { name: "pointing 1", src: pointing_1, w: 146, h: 136, x: 700, y: 50, rotation: 6 },
  { name: "pointing 3", src: pointing_3, w: 126, h: 124, x: 1208, y: 308, rotation: 10 },
  { name: "pointing 2", src: pointing_2, w: 238, h: 134, x: 1100, y: 204, rotation: -13  },
  { name: "pointing 4", src: pointing_4, w: 240, h: 170, x: 1170, y: 578, rotation: 8  },
  { name: "pointing 5", src: pointing_5, w: 250, h: 148, x: 770, y: 778, rotation: -6.5  },
  { name: "pointing 7", src: pointing_7, w: 224, h: 156, x: 280, y: 680, rotation: -16  },
  { name: "pointing 6", src: pointing_6, w: 112, h: 112, x: 410, y: 750, rotation: -3.5  },
  { name: "pointing 8", src: pointing_8, w: 198, h: 132, x: 270, y: 450, rotation: -3  },
  { name: "pointing 9", src: pointing_9, w: 244, h: 166, x: 320, y: 170, rotation: 9  },

]

const gifsData = [...pointingGifsData]

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"
type WindowDimensions = { height: number, width: number }
type GifBackgroundProps = { appState: AppState, winDims: WindowDimensions }
type Gif = { name: string, src: string, w: number, h: number, x: number, y: number, rotation: number }

export default function GifBackground({appState, winDims}: GifBackgroundProps) {
  const baseWidth = 1440
  const baseHeight = 1024
  
  const styleThing = ({x, y, w, h, rotation}: Gif) => {
    const newX = (x / baseWidth) * winDims.width
    const newY = (y / baseHeight) * winDims.height
    return {
      transform: `translate(-50%, -50%) translate(${newX}px, ${newY}px) rotate(${rotation}deg)`,
      height: `${h}px`,
      width: `${w}px`, // if you have maxWidth in your data
      // ... any other styles you were applying through classes
    };
  }
  
  const gifStyles = useMemo(() => gifsData.map(gif => styleThing(gif)), [winDims, gifsData]);

  return (
    <div id="GifBackground" className="absolute h-screen w-screen overflow-hidden">
      {appState === "ready" && pointingGifsData.map((gif, index) => ( 
        <img key={gif.name} src={gif.src} className="absolute object-cover" alt={gif.name} style={gifStyles[index]}/> 
      ))}
    </div>
  )
}