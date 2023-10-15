import { useState } from 'react'
import DropZoneInput from "./DropZoneInput"
import EditDetails from "./EditDetails"
import DownloadGif from "./DownloadGif"

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"

type InterfaceProps = {
  appState: AppState,
  setAppState: (state: AppState) => void,
  convertToGif: (video: File, start: number, duration: number) => void,
  gifUrl: string | null,
}
// Ignore props errors as I will eventually use them
// @ts-ignore
export default function Interface({appState, setAppState, convertToGif, gifUrl}: InterfaceProps) {
  const [video, setVideo] = useState<File | null>(null)
  
  const convert = (start: number, duration: number) => {
    if (video) {
      convertToGif(video, start, duration)
    }
  }

  return (
    <div id="interface" className="flex justify-center items-center h-screen w-screen z-10">
      { appState === "ready" ? 
                <DropZoneInput setVideo={setVideo} setAppState={setAppState}/> : 
        (["details", "processing"].includes(appState) && video) ? 
                <EditDetails video={video} appState={appState} setAppState={setAppState} convert={convert}/> : 
        appState === "done" ?
                <DownloadGif gifUrl={gifUrl}/> : <></>}
    </div>
  )
}