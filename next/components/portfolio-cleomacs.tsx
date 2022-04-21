import imgCleomacs from "../images/projects/cleomacs.jpg?resize&size=768"
import SkyTag from "./sky-tag"

export default function PortfolioCleomacs() {
  return (
    <div className="bg-sky-100 rounded-md px-2 py-12 h-full">
      <div className="uppercase tracking-wider font-bold text-sky-700 text-sm text-center">
        Cleomacs
      </div>
      <div className="text-sky-700 mt-4 text-center">
        SaaS starter mono-repo typescript template
      </div>

      <div className="relative bg-white rounded-md mt-8">
        <div className="absolute -inset-1 bg-white rounded-md blur opacity-75"></div>
        <div className="relative bg-white rounded-md p-2">
          <img
            src={imgCleomacs}
            alt="Evolution curve for french competency"
            className="rounded-md"
          />
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
      </ul>
    </div>
  )
}
