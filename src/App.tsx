import { useState, useRef, useEffect } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL, fetchFile } from "@ffmpeg/util"
import Background from './components/Background'
import GifBackground from './components/GifBackground'
import Interface from './components/Interface'

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"

export default function App() {
  const [winDims, setWinDims] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [appState, setAppState] = useState<AppState>("loading")
  const [gifUrl, setGifUrl] = useState<string | null>(null)
  const ffmpegRef = useRef(new FFmpeg())

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm"
    const ffmpeg = ffmpegRef.current
    // toBlobURL is used to bypass CORS issue, urls with the same domain can be used directly.
    const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript")
    const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm")
    const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript")
    await ffmpeg.load({ coreURL, wasmURL, workerURL })
    setAppState("ready")
  }

  useEffect(() => {load()}, [])

  // debounce is not needed from some testing

  // function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number): (...args: Parameters<F>) => void {
  //   let timeout: ReturnType<typeof setTimeout> | null = null
  //   return (...args: Parameters<F>): void => {
  //     if (timeout !== null) { clearTimeout(timeout) }
  //     timeout = setTimeout(() => func(...args), waitFor)
  //   }
  // }

  // const handleResize = debounce(() => { setWinDims({ height: window.innerHeight, width: window.innerWidth }) }, 250)
  const handleResize = () => { setWinDims({ height: window.innerHeight, width: window.innerWidth }) }


  useEffect(() => {
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const convertToGif = async (video: File, start: number, duration: number) => {
    const ffmpeg = ffmpegRef.current
    try {
      setAppState("processing")
      const rand = Math.floor(Math.random() * 1000000)
      const randName = `${rand}.mp4`
      await ffmpeg.writeFile(randName, await fetchFile(video))

      await ffmpeg.exec(
        [ '-ss', `${start}`, 
          '-t', `${duration}`, 
          '-i', randName,
          '-vf', 'fps=10,scale=320:-1:flags=lanczos', '-c:v', 'gif',
          // '-f', 'gif', 
          `${video.name}.gif`])
        // '-filter_complex','[0:v] fps=12,scale=480:-1,split [a][bx[a] palettegen [p][b][p] paletteuse',
        // $ ffmpeg -ss 61.0 -t 2.5 -i StickAround.mp4 -i palette.png -filter_complex "[0:v][1:v] paletteuse" prettyStickAround.gif
        // -filter_complex "[0:v] fps=12,scale=w=480:h=-1,split [a][b][a] palettegen=stats_mode=single [p][b][p] paletteuse=new=1" StickAroundPerFrame.gif
        const data = await ffmpeg.readFile(`${video.name}.gif`)
        // @ts-ignore
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
        setGifUrl(url)
        setAppState("done")
    } catch {
      console.log("error")
    }
  }

  return (
    <div id="app" className="h-screen w-screen flex flex-col overflow-hidden font-poppins">
      <Background winDims={winDims}/>
      <GifBackground appState={appState} winDims={winDims}/>
      <Interface appState={appState} setAppState={setAppState} convertToGif={convertToGif} gifUrl={gifUrl}/>
    </div>
  )
}

