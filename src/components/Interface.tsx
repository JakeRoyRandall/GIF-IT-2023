import { useState } from 'react'
import DropZoneInput from "./DropZoneInput"
import EditDetails from "./EditDetails"
import DownloadGif from "./DownloadGif"

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"

type InterfaceProps = {
  appState: AppState,
  setAppState: (state: AppState) => void,
  convertToGif: (video: File, start: number, duration: number) => Promise<void>,
  gifUrl: string | null,
}
// Ignore props errors as I will eventually use them
// @ts-ignore
export default function Interface({appState, setAppState, convertToGif, gifUrl}: InterfaceProps) {
  const [video, setVideo] = useState<File | null>(null)
  
  const convert = async (start: number, duration: number) => {
    console.log("converting")
    if (video) {
      await convertToGif(video, start, duration)
      setAppState("done")
    }
  }

  const startOver = () => {setVideo(null); setAppState("ready")}

  return (
    <div id="interface" className="flex justify-center items-center h-[calc(100vh-56px)] w-screen z-10">
      { appState === "ready" ? 
                <DropZoneInput setVideo={setVideo} setAppState={setAppState}/> : 
        (["details", "processing"].includes(appState) && video) ? 
                <EditDetails video={video} startOver={startOver} appState={appState} convert={convert}/> : 
        (appState === "done" && gifUrl) ?
                <DownloadGif fileName={video?.name} gifUrl={gifUrl} startOver={startOver}/> : <></>}
    </div>
  )
}