import { useState } from 'react'
import crying_1 from "../assets/gifs/crying/crying_1.gif"
import crying_2 from "../assets/gifs/crying/crying_2.gif"
import crying_3 from "../assets/gifs/crying/crying_3.gif"
import crying_4 from "../assets/gifs/crying/crying_4.gif"
import crying_5 from "../assets/gifs/crying/crying_5.gif"
import crying_6 from "../assets/gifs/crying/crying_6.gif"
import crying_7 from "../assets/gifs/crying/crying_7.gif"
import crying_8 from "../assets/gifs/crying/crying_8.gif"
import crying_9 from "../assets/gifs/crying/crying_9.gif"
import crying_10 from "../assets/gifs/crying/crying_10.gif"

type ErrorScreenProps = {
  error: string,
  startOver: () => void
}

const gifs = [crying_1, crying_2, crying_3, crying_4, crying_5, crying_6, crying_7, crying_8, crying_9, crying_10]

export default function ErrorScreen({error, startOver}: ErrorScreenProps) {
  const [gifIndex, setGifIndex] = useState(0)

  return (
    <div id="EditDetails" className="hidden sm:flex flex-col justify-center items-center w-100 h-100">
      <div className="flex flex-col justify-between w-96 mt-16">
        <img src={gifs[gifIndex % gifs.length]} className="my-4" alt="crying baby gif"/>
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