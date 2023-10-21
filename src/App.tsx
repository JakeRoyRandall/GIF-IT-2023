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
    // Multi-threading and below line not working. Problem with the FFMPEG WASM package
    // const workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript")
    await ffmpeg.load({ coreURL, wasmURL })
    setAppState("ready")
  }

  const cacheImages = async () => {

    const frames = [
      "./src/assets/gifs/pointing/pointing_1_frame.webp",
      "./src/assets/gifs/pointing/pointing_2_frame.webp",
      "./src/assets/gifs/pointing/pointing_3_frame.webp",
      "./src/assets/gifs/pointing/pointing_4_frame.webp",
      "./src/assets/gifs/pointing/pointing_5_frame.webp",
      "./src/assets/gifs/pointing/pointing_6_frame.webp",
      "./src/assets/gifs/pointing/pointing_7_frame.webp",
      "./src/assets/gifs/pointing/pointing_8_frame.webp",
      "./src/assets/gifs/pointing/pointing_9_frame.webp",
      "./src/assets/gifs/thinking/thinking_1_frame.webp",
      "./src/assets/gifs/thinking/thinking_2_frame.webp",
      "./src/assets/gifs/thinking/thinking_3_frame.webp",
      "./src/assets/gifs/thinking/thinking_4_frame.webp",
      "./src/assets/gifs/thinking/thinking_5_frame.webp",
      "./src/assets/gifs/thinking/thinking_6_frame.webp",
      "./src/assets/gifs/thinking/thinking_7_frame.webp",
      "./src/assets/gifs/thinking/thinking_8_frame.webp",
      "./src/assets/gifs/thinking/thinking_9_frame.webp",
      "./src/assets/gifs/thinking/thinking_10_frame.webp",
      "./src/assets/gifs/clapping/clapping_1_frame.webp",
      "./src/assets/gifs/clapping/clapping_2_frame.webp",
      "./src/assets/gifs/clapping/clapping_3_frame.webp",
      "./src/assets/gifs/clapping/clapping_4_frame.webp",
      "./src/assets/gifs/clapping/clapping_5_frame.webp",
      "./src/assets/gifs/clapping/clapping_6_frame.webp",
      "./src/assets/gifs/clapping/clapping_7_frame.webp",
      "./src/assets/gifs/clapping/clapping_8_frame.webp",
      "./src/assets/gifs/clapping/clapping_9_frame.webp",
      "./src/assets/gifs/clapping/clapping_10_frame.webp",
      "./src/assets/gifs/waiting/waiting_1_frame.webp",
      "./src/assets/gifs/waiting/waiting_2_frame.webp",
      "./src/assets/gifs/waiting/waiting_3_frame.webp",
      "./src/assets/gifs/waiting/waiting_4_frame.webp",
      "./src/assets/gifs/waiting/waiting_5_frame.webp",
      "./src/assets/gifs/waiting/waiting_6_frame.webp",
      "./src/assets/gifs/waiting/waiting_7_frame.webp",
      "./src/assets/gifs/waiting/waiting_8_frame.webp",
      "./src/assets/gifs/waiting/waiting_9_frame.webp",
      "./src/assets/gifs/waiting/waiting_10_frame.webp"
    ]
    const framePromises = frames.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
      })
      })
    Promise.all(framePromises)

    const animImages = [
      "./src/assets/gifs/pointing/pointing_1.webp",
      "./src/assets/gifs/pointing/pointing_2.webp",
      "./src/assets/gifs/pointing/pointing_3.webp",
      "./src/assets/gifs/pointing/pointing_4.webp",
      "./src/assets/gifs/pointing/pointing_5.webp",
      "./src/assets/gifs/pointing/pointing_6.webp",
      "./src/assets/gifs/pointing/pointing_7.webp",
      "./src/assets/gifs/pointing/pointing_8.webp",
      "./src/assets/gifs/pointing/pointing_9.webp",
      "./src/assets/gifs/crying/crying_1.webp",
      "./src/assets/gifs/crying/crying_2.webp",
      "./src/assets/gifs/crying/crying_3.webp",
      "./src/assets/gifs/crying/crying_4.webp",
      "./src/assets/gifs/crying/crying_5.webp",
      "./src/assets/gifs/crying/crying_6.webp",
      "./src/assets/gifs/crying/crying_7.webp",
      "./src/assets/gifs/crying/crying_8.webp",
      "./src/assets/gifs/crying/crying_9.webp",
      "./src/assets/gifs/crying/crying_10.webp",
      "./src/assets/gifs/thinking/thinking_1.webp",
      "./src/assets/gifs/thinking/thinking_2.webp",
      "./src/assets/gifs/thinking/thinking_3.webp",
      "./src/assets/gifs/thinking/thinking_4.webp",
      "./src/assets/gifs/thinking/thinking_5.webp",
      "./src/assets/gifs/thinking/thinking_6.webp",
      "./src/assets/gifs/thinking/thinking_7.webp",
      "./src/assets/gifs/thinking/thinking_8.webp",
      "./src/assets/gifs/thinking/thinking_9.webp",
      "./src/assets/gifs/thinking/thinking_10.webp",
      "./src/assets/gifs/clapping/clapping_1.webp",
      "./src/assets/gifs/clapping/clapping_2.webp",
      "./src/assets/gifs/clapping/clapping_3.webp",
      "./src/assets/gifs/clapping/clapping_4.webp",
      "./src/assets/gifs/clapping/clapping_5.webp",
      "./src/assets/gifs/clapping/clapping_6.webp",
      "./src/assets/gifs/clapping/clapping_7.webp",
      "./src/assets/gifs/clapping/clapping_8.webp",
      "./src/assets/gifs/clapping/clapping_9.webp",
      "./src/assets/gifs/clapping/clapping_10.webp",
      "./src/assets/gifs/waiting/waiting_1.webp",
      "./src/assets/gifs/waiting/waiting_2.webp",
      "./src/assets/gifs/waiting/waiting_3.webp",
      "./src/assets/gifs/waiting/waiting_4.webp",
      "./src/assets/gifs/waiting/waiting_5.webp",
      "./src/assets/gifs/waiting/waiting_6.webp",
      "./src/assets/gifs/waiting/waiting_7.webp",
      "./src/assets/gifs/waiting/waiting_8.webp",
      "./src/assets/gifs/waiting/waiting_9.webp",
      "./src/assets/gifs/waiting/waiting_10.webp"
    ]
    const animImagesPromises = animImages.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
      })
      })
    Promise.all(animImagesPromises)
  }


  useEffect(() => {load(), cacheImages()}, [])

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
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const convertToGif = async (video: File, start: number, duration: number) => {
    const ffmpeg = ffmpegRef.current;
    console.log(video.name)
    try {
        setAppState("processing");
        const rand = Math.floor(Math.random() * 1000000);
        const randName = `${rand}.mp4`;
        await ffmpeg.writeFile(randName, await fetchFile(video));
        
        // First, create a palette for better color quality
        const paletteName = `${rand}_palette.png`;
        await ffmpeg.exec([
            '-ss', `${start}`,
            '-t', `${duration}`,
            '-i', randName,
            '-vf', 'fps=10,scale=320:-1:flags=lanczos,palettegen',
            paletteName
        ]);

        // Now, create the GIF using the palette
        await ffmpeg.exec([
            '-ss', `${start}`,
            '-t', `${duration}`,
            '-i', randName,
            '-i', paletteName,
            '-filter_complex', `[0:v][1:v] paletteuse`,
            `${video.name}.gif`
        ]);

        const data = await ffmpeg.readFile(`${video.name}.gif`);
        // @ts-ignore
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
        setGifUrl(url);
        setAppState("done");
    } catch {
        console.log("error");
    }
};

  return (
    <div id="app" className="h-screen w-screen flex flex-col overflow-hidden font-poppins">
      <Background winDims={winDims}/>
      <GifBackground appState={appState} winDims={winDims}/>
      <Interface appState={appState} setAppState={setAppState} convertToGif={convertToGif} gifUrl={gifUrl}/>
    </div>
  )
}

