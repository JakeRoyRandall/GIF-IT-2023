type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"

export default function GifBackground({appState}: {appState: AppState}) {
  return (
    <div id="GifBackground" className="absolute h-screen w-screen overflow-hidden">

    </div>
  )
}