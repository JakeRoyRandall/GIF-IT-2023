import { useState, useRef, useEffect } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL, fetchFile } from "@ffmpeg/util"
import ShapeBackground from './components/ShapeBackground'
import GifBackground from './components/GifBackground'
import Interface from './components/Interface'

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"

export default function App() {
  const [appState, setAppState] = useState<AppState>("loading")
  const [gifUrl, setGifUrl] = useState<string | null>(null)
  const ffmpegRef = useRef(new FFmpeg())

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/esm"
    const ffmpeg = ffmpegRef.current
    // toBlobURL is used to bypass CORS issue, urls with the same domain can be used directly.
    const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript")
    const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm")
    const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript")
    await ffmpeg.load({ coreURL, wasmURL, workerURL })
    setAppState("ready")
  }

  useEffect(() => {load()}, [])

  const convertToGif = async (video: File, start: number, duration: number) => {
    const ffmpeg = ffmpegRef.current
    try {
      setAppState("processing")
      
      // Write the file to memory (to a file name unlikely to be in memory)
      const rand = Math.floor(Math.random() * 1000000)
      const randName = `${rand}.mp4`
      await ffmpeg.writeFile(randName, await fetchFile(video))
      await ffmpeg.exec(
        [ '-ss', `${start}`, 
        // where we want the gif to start relative to the input
        '-t', `${duration}`, 
        // the duration to read from the input
        '-i', randName,
        // sets the input to the file created previously
        // '-filter_complex','[0:v] fps=12,scale=480:-1,split [a][bx;[a] palettegen [p];[b][p] paletteuse',
        '-f', 'gif', `${video.name}.gif`])
        // sets the output desitantion of the previous set of commands
        // $ ffmpeg -ss 61.0 -t 2.5 -i StickAround.mp4 -i palette.png -filter_complex "[0:v][1:v] paletteuse" prettyStickAround.gif
        // -filter_complex "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1" StickAroundPerFrame.gif
        const data = await ffmpeg.readFile(`${video.name}.gif`);
        // @ts-ignore
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
        setGifUrl(url)
        setAppState("done")
    } catch {
      
    }
  }

  return (
    <div id="app" className="h-screen w-screen flex flex-col overflow-hidden">
      <ShapeBackground />
      <GifBackground appState={appState}/>
      <Interface appState={appState} setAppState={setAppState} convertToGif={convertToGif} gifUrl={gifUrl}/>
    </div>
  )
}

