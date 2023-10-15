import squiggle_blue_full from '../assets/shapes/squiggle_blue_full.png'
import cube_yellow_full from '../assets/shapes/cube_yellow_full.png'
import squiggle_purple_full from '../assets/shapes/squiggle_purple_full.png'
import tube_pink_full from '../assets/shapes/tube_pink_full.png'

export default function ShapeBackground() {
  return (
    <div id="ShapeBackground" className="absolute h-screen w-screen overflow-hidden">
      <div className="absolute bottom-0 h-14 w-screen flex justify-center items-center bg-black">
          <a className="text-white hover:text-[#FFD464]" href="http://jakerandall.me">Made by your good friend Jake</a>
      </div>
      <img className="absolute top-[-255px] right-[-50px]" src={squiggle_blue_full} alt="squiggle_blue_full"/>
      <img className="absolute top-0 left-[-100px]" src={squiggle_purple_full} alt="squiggle_purple_full"/>
      <img className="absolute bottom-[-80px] left-[105px]" src={cube_yellow_full} alt="cube_yellow_full"/>
      <img className="absolute bottom-[55px] right-0" src={tube_pink_full} alt="tube_pink_full"/>
    </div>
  )
}