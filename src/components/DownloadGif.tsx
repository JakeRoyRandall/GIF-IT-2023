type DownloadGifProps = {
  fileName: string | undefined,
  gifUrl: string | undefined,
  startOver: () => void
}

export default function DownloadGif({fileName ="your_new_gif", gifUrl, startOver}: DownloadGifProps) {
  return (
    <div id="DownloadGifContainer" className="hidden sm:flex w-100 h-100">
      <div id="GifContainer" className="flex justify-center items-start w-100 h-60 rounded-3xl">
        <img src={gifUrl} className="max-h-60" alt="your new gif"/>
      </div>
      <div id="emptyContainer" className="flex w-100 h-20"></div>

      <div id="ButtonsContainer" className="flex justify-around items-center w-100 h-20 font-black">
          <button onClick={() => startOver()} className="h-14 w-44 rounded-full m-6 font-poppins bg-button shadow-button hover:bg-button-hover hover:shadow-hover active:bg-button-active active:shadow-none transform active:translate-y-1 transition duration-150">
            START OVER
          </button>
          <a href={gifUrl} download={`${fileName}.gif`} className="">
            <div className="h-14 w-44 flex justify-center items-center rounded-full m-6 font-poppins bg-button shadow-button hover:bg-button-hover hover:shadow-hover active:bg-button-active active:shadow-none transform active:translate-y-1 transition duration-150" >
              DOWNLOAD
            </div>
          </a>
      </div>
  </div>
  )
}