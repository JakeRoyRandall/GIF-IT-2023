import { useState, useMemo } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"

type EditDetailsProps = {
  video: File,
  setVideo: (file: File | null) => void
  appState: AppState,
  setAppState: (state: AppState) => void,
  convert: (start: number, duration: number) => Promise<void>
}

export default function EditDetails({video, setVideo, appState, setAppState, convert}: EditDetailsProps) {
  // const [start, setStart] = useState(0)
  const [duration, setDuration] = useState(6)
  // const [end, setEnd] = useState(0)

  const [start, setStart] = useState(0)
  const [gifDur, setGifDur] = useState(6)

  const updateState = (e: any) => {
      setStart(e[0])
      setGifDur(e[1])
  }

  return (
    <div id="EditDetails" className="w-100 h-100">
      <div id="VideoContainer" className="flex justify-center items-start w-100 h-60 rounded-3xl">
        <video 
            controls className="max-h-60"
            src={useMemo(() => URL.createObjectURL(video), [video])}
            onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
              const vid = e.target as HTMLVideoElement; 
              setDuration(Number(vid.duration.toFixed(2)))
            }}
        />
      </div>
      <div id="SliderContainer" className="flex flex-col justify-around items-center w-100 h-20">
          <Slider className="w-100 text-black" dots={true} range min={0} max={duration} onChange={(e) => updateState(e)} allowCross={false} defaultValue={[0, 6]} step={0.01}/>
            <h4>Start : {start} seconds &nbsp;&nbsp;&nbsp; Duration: {gifDur} seconds</h4>
      </div>

      <div id="ButtonsContainer" className="flex justify-around items-center w-100 h-20">
          <button className="h-14 w-44 rounded-full m-6 font-poppins font-semibold bg-button shadow-button hover:bg-button-hover hover:shadow-hover active:bg-button-active active:shadow-none transform active:translate-y-1 transition duration-150" 
                  onClick={() => {setVideo(null); setAppState("ready")}}>
            START OVER
          </button>
          <button className="h-14 w-44 rounded-full m-6 font-poppins font-semibold bg-button shadow-button hover:bg-button-hover hover:shadow-hover active:bg-button-active active:shadow-none transform active:translate-y-1 transition duration-150" 
                  onClick={() => {convert(start, gifDur)}}>
            GIF-IT!
          </button>
      </div>
  </div>
  )
}