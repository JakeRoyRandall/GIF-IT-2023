import {useState, useRef, useEffect, useCallback} from 'react'
import uploadArrowWhite from '../assets/UploadArrowWhite.png'
import uploadArrowBlack from '../assets/UploadArrowBlack.png'

type AppState = "error" | "loading" | "ready" | "details" | "processing" | "done"

type DropZoneInputProps = {
  setVideo: (file: File) => void,
  setAppState: (state: AppState) => void,
}

export default function DropZoneInput({setVideo, setAppState}:DropZoneInputProps) {
  const inputRef = useRef<HTMLDivElement | null>(null)
  const [drag, setDrag] = useState(false)

  const handleFile = useCallback((file: File) => {
    const [type] = file.type.split('/')
    if (type === "video") { setVideo(file); setAppState("details") }
    else return
    // NEED TO HANDLE ERROR
  }, [setVideo]);

    useEffect(() => {
      if (inputRef.current) {
        const input = inputRef.current
        const handleDrag = (e: DragEvent) => { 
          e.preventDefault(); e.stopPropagation(); 
          console.log("handleDrag")
          if (drag === false) setDrag(true)
        }
          
        const handleDragIn = (e: DragEvent) => {
          e.preventDefault(); e.stopPropagation()
          console.log("handleDragIn")
          const hasData = e.dataTransfer && e.dataTransfer.files.length > 0
          if (hasData) setDrag(true)
        }
            
        const handleDragOut = (e: DragEvent) => {
          e.preventDefault(); e.stopPropagation()
          console.log("handleDragOut")
          if (e.clientX === 0 && e.clientY === 0) setDrag(false)
        }
      
        const handleDrop = (e: DragEvent) => {
          e.preventDefault(); e.stopPropagation()
          console.log("handleDrop")
          setDrag(false)
          const hasData = e.dataTransfer && e.dataTransfer.files.length > 0
          if (hasData) handleFile(e.dataTransfer.files[0])
        }
    
        input.addEventListener('dragenter', handleDragIn)
        input.addEventListener('dragleave', handleDragOut)
        input.addEventListener('dragover', handleDrag)
        input.addEventListener('drop', handleDrop)
    
        return () => {
          // Cleanup: remove the event listeners when the component is unmounted
          input.removeEventListener('dragenter', handleDragIn)
          input.removeEventListener('dragleave', handleDragOut)
          input.removeEventListener('dragover', handleDrag)
          input.removeEventListener('drop', handleDrop)
        }
      }
    }, [inputRef])

    return (
        <div ref={inputRef} className={`w-96 h-60 rounded-3xl ${drag ? "bg-gradient-to-bl from-[#FFAE5A] from-4.25% via-[#DA38B9] via-46%% to-[#5E489F] to-94.84%%" : "border-black border-4 border-dashed"}`}>
          <input type="file" name="fileInput" id="fileInput" className="overflow-hidden opacity-0 -z-100 hidden" onChange={e => e.target.files && handleFile(e.target.files[0])}/>
          <label htmlFor="fileInput" className={`flex flex-col justify-center items-center w-full h-full cursor-pointer ${drag && "text-white"}`}>
              <img src={`${drag ? uploadArrowWhite : uploadArrowBlack}`} alt="Upload Arrow"/><br/>
              <span className={`text-lg ${drag? "text-white": ""}`}>Drop your video here or&nbsp;
                <span className={`${!drag && "underline decoration-[#DA38B9] underline-offset-2 font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE5A] via-[#DA38B9] to-[#5E489F]"}`}>browse</span>
              </span>
              <span className={`text-sm ${drag? "text-white": ""}`}>Please upload a GIF, MP4, or MOV</span>
          </label>
        </div>
    )
}