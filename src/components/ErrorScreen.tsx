import { useState } from 'react'
import crying_1 from "../assets/gifs/crying/crying_1.webp"
import crying_1_frame from "../assets/gifs/crying/crying_1_frame.webp"
import crying_2 from "../assets/gifs/crying/crying_2.webp"
import crying_2_frame from "../assets/gifs/crying/crying_2_frame.webp"
import crying_3 from "../assets/gifs/crying/crying_3.webp"
import crying_3_frame from "../assets/gifs/crying/crying_3_frame.webp"
import crying_4 from "../assets/gifs/crying/crying_4.webp"
import crying_4_frame from "../assets/gifs/crying/crying_4_frame.webp"
import crying_5 from "../assets/gifs/crying/crying_5.webp"
import crying_5_frame from "../assets/gifs/crying/crying_5_frame.webp"
import crying_6 from "../assets/gifs/crying/crying_6.webp"
import crying_6_frame from "../assets/gifs/crying/crying_6_frame.webp"
import crying_7 from "../assets/gifs/crying/crying_7.webp"
import crying_7_frame from "../assets/gifs/crying/crying_7_frame.webp"
import crying_8 from "../assets/gifs/crying/crying_8.webp"
import crying_8_frame from "../assets/gifs/crying/crying_8_frame.webp"
import crying_9 from "../assets/gifs/crying/crying_9.webp"
import crying_9_frame from "../assets/gifs/crying/crying_9_frame.webp"
import crying_10 from "../assets/gifs/crying/crying_10.webp"
import crying_10_frame from "../assets/gifs/crying/crying_10_frame.webp"

type ErrorScreenProps = {
  error: string,
  startOver: () => void
}

const gifs = [
  {name: "crying_1", src: crying_1, frame: crying_1_frame},
  {name: "crying_2", src: crying_2, frame: crying_2_frame},
  {name: "crying_3", src: crying_3, frame: crying_3_frame},
  {name: "crying_4", src: crying_4, frame: crying_4_frame},
  {name: "crying_5", src: crying_5, frame: crying_5_frame},
  {name: "crying_6", src: crying_6, frame: crying_6_frame},
  {name: "crying_7", src: crying_7, frame: crying_7_frame},
  {name: "crying_8", src: crying_8, frame: crying_8_frame},
  {name: "crying_9", src: crying_9, frame: crying_9_frame},
  {name: "crying_10", src: crying_10, frame: crying_10_frame}
]

export default function ErrorScreen({error, startOver}: ErrorScreenProps) {
  const [gifIndex, setGifIndex] = useState(0)

  return (
    <div id="EditDetails" className="hidden sm:flex flex-col justify-center items-center w-100 h-100">
      <div className="w-full flex flex-col justify-between items-center mt-16">
        <ImageContainer gif={gifs[gifIndex % gifs.length]}/>
        <div className="font-bold text-red-500 text-center mt-4 mb-4">There was an error: {error}</div>
      </div>

      <div id="ButtonsContainer" className="flex justify-around items-center w-100 h-20 font-black">
          <button onClick={() => setGifIndex(prev => prev + 1)} className="h-14 w-44 rounded-full m-6 font-poppins bg-button shadow-button hover:bg-button-hover hover:shadow-hover active:bg-button-active active:shadow-none transform active:translate-y-1 transition duration-150">
            CRY MORE
          </button>
          <button onClick={() => startOver()} className="h-14 w-44 rounded-full m-6 font-poppins bg-button shadow-button hover:bg-button-hover hover:shadow-hover active:bg-button-active active:shadow-none transform active:translate-y-1 transition duration-150">
            START OVER
          </button>
      </div>
  </div>
  )
}

function ImageContainer({gif}: {gif: {name: string, src: string, frame: string}}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div key={gif.name} className="my-4">
      <img  src={gif.frame} alt="gif placeholder"
            style={{ display: imageLoaded ? 'none' : 'block' }}
      />
      <img  src={gif.src} alt={gif.name} onLoad={() => setImageLoaded(true)} 
            style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </div>
  )
}