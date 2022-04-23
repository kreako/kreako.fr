import { useState } from "react"
import imgCcasHome from "../images/projects/ccas-stats-accueil.png"
import imgCcasStats from "../images/projects/ccas-stats-stats.png"
import SkyTag from "./sky-tag"

interface ReturnType {
  img: any
  next: () => void
}

function useCarousel(imgList: any[]): ReturnType {
  if (imgList.length == 0) {
    throw new Error("no element in imgList")
  }
  const [index, setIndex] = useState(0)
  const next = () => {
    setIndex(index + 1)
    if (index >= imgList.length - 1) {
      setIndex(0)
    }
  }
  const img = imgList[index]
  return { img, next }
}

export default function PortfolioCcasStats() {
  const { img, next: nextImg } = useCarousel([imgCcasHome, imgCcasStats])
  const goToNextImg = () => {
    nextImg()
  }
  return (
    <div id="ccasstats" className="bg-sky-100 rounded-md px-2 py-12 h-full">
      <div className="uppercase tracking-wider font-bold text-sky-700 text-sm text-center">
        Help center statistics
      </div>
      <div className="text-sky-700 mt-4 text-center">
        SaaS to collect and process statistics - insights to enable better service
      </div>

      <div className="relative bg-white rounded-md mt-8 mx-auto" onClick={goToNextImg}>
        <div className="absolute -inset-1 bg-white rounded-md blur opacity-75"></div>
        <div className="relative bg-white rounded-md p-2">
          <img src={img} alt="Home page" className="rounded-md mx-auto" />
        </div>
      </div>

      <ul className="mt-8 text-sky-700 list-disc list-inside">
        <li>
          Frontend with <SkyTag title="react" />, <SkyTag title="typescript" /> and{" "}
          <SkyTag title="tailwindcss" />
        </li>
        <li>
          Backend with <SkyTag title="typescript" />, <SkyTag title="prisma" />,{" "}
          <SkyTag title="express" /> and <SkyTag title="postgresql" />
        </li>
        <li>
          Infrastructure with <SkyTag title="docker" />, <SkyTag title="ansible" />,{" "}
          <SkyTag title="prometheus" /> and <SkyTag title="grafana" />
        </li>
      </ul>
    </div>
  )
}
