import { useState } from 'react'
import ErrorScreen from "./ErrorScreen"
import DropZoneInput from "./DropZoneInput"
import EditDetails from "./EditDetails"
import DownloadGif from "./DownloadGif"
import crying from "../assets/gifs/crying/crying_1.gif"

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
    if (video) {
      await convertToGif(video, start, duration)
      setAppState("done")
    }
  }

  const startOver = () => {setVideo(null); setAppState("ready")}

  return (
    <div id="interface" className="flex justify-center items-center h-[calc(100vh-56px)] w-screen z-10">
      <div className="flex flex-col sm:hidden justify-center items-center w-96 m-8 mt-16">
        <img src={crying} className="rounded-3xl my-8" alt="crying baby gif"/>
        <div className="font-bold text-red-500">Sorry, GIT-IT is intended for desktop use only</div>
      </div>

      { appState === "error" ? 
                <ErrorScreen error="sorry" startOver={startOver}/> : 
        ["ready", "loading"].includes(appState) ? 
                <DropZoneInput setVideo={setVideo} appState={appState} setAppState={setAppState}/> : 
        (appState === "details" && video) ? 
                <EditDetails video={video} startOver={startOver} appState={appState} convert={convert}/> : 
        (appState === "done" && gifUrl) ?
                <DownloadGif fileName={video?.name} gifUrl={gifUrl} startOver={startOver}/> : <></>}
    </div>
  )
}