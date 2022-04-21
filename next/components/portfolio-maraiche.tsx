import imgPlanning from "../images/projects/maraichage-planning.png"
import SkyTag from "./sky-tag"

type Color = "red" | "pink" | "orange" | "teal" | "cyan" | "violet" | "green"

function colorToBg(color: Color, level: 100 | 600) {
  if (level === 600) {
    switch (color) {
      case "pink":
        return "bg-pink-600"
      case "red":
        return "bg-red-600"
      case "orange":
        return "bg-orange-600"
      case "teal":
        return "bg-teal-600"
      case "cyan":
        return "bg-cyan-600"
      case "violet":
        return "bg-violet-600"
      case "green":
        return "bg-green-600"
    }
  } else {
    switch (color) {
      case "pink":
        return "bg-pink-100"
      case "red":
        return "bg-red-100"
      case "orange":
        return "bg-orange-100"
      case "teal":
        return "bg-teal-100"
      case "cyan":
        return "bg-cyan-100"
      case "violet":
        return "bg-violet-100"
      case "green":
        return "bg-green-100"
    }
  }
}

type MaraicheTodoProps = {
  initial: string
  initialColor: Color
  label: string
  location: string
  culture: string
  cultureColor: Color
  done: boolean
}

function MaraicheTodo({
  initial,
  initialColor,
  label,
  location,
  culture,
  cultureColor,
  done,
}: MaraicheTodoProps) {
  const fontLineThrough = done ? "line-through" : ""
  return (
    <div className={`flex items-baseline space-x-2 ${fontLineThrough}`}>
      <div
        className={`${colorToBg(
          initialColor,
          100
        )} text-gray-800 rounded-full p-1 text-xs font-bold`}
      >
        {initial}
      </div>
      <div>{label}</div>
      <div className="text-gray-800 text-xs">{location}</div>
      <div className="rounded-md bg-gray-100 text-xs px-1 flex space-x-2 items-baseline">
        <div className={`${colorToBg(cultureColor, 600)} rounded-full h-3 w-3`}></div>
        <div>{culture}</div>
      </div>
    </div>
  )
}

function MaraicheTodos() {
  return (
    <div>
      <div className="font-bold uppercase text-xs text-gray-700">Pour aujourd&apos;hui</div>
      <div className="mt-1">
        <MaraicheTodo
          initial="JD"
          initialColor="pink"
          label="Repiquage"
          location="Tnl 5/Pl 4"
          culture="Tomates 2/8"
          cultureColor="red"
          done={false}
        />
        <MaraicheTodo
          initial="RT"
          initialColor="orange"
          label="Semis"
          location="Tnl 1/Pl 3"
          culture="Salades 27/52"
          cultureColor="green"
          done={true}
        />
        <MaraicheTodo
          initial="RT"
          initialColor="orange"
          label="Repiquage"
          location="Tnl 2/Pl 7"
          culture="Salades 24/52"
          cultureColor="green"
          done={false}
        />
      </div>
      <div className="font-bold uppercase text-xs text-gray-700 mt-4">Pour la semaine</div>
      <div className="mt-1">
        <MaraicheTodo
          initial="JD"
          initialColor="pink"
          label="Repiquage"
          location="Tnl 3/Pl 2"
          culture="Tomates 3/8"
          cultureColor="red"
          done={false}
        />
        <MaraicheTodo
          initial="EN"
          initialColor="teal"
          label="Semis"
          location="Tnl 1/Pl 2"
          culture="Aubergines 3/9"
          cultureColor="cyan"
          done={false}
        />
        <MaraicheTodo
          initial="RT"
          initialColor="orange"
          label="Repiquage"
          location="Tnl 4/Pl 3"
          culture="Salades 25/52"
          cultureColor="green"
          done={false}
        />
      </div>
    </div>
  )
}

function MaraichePlanning() {
  return (
    <>
      <div className="font-bold uppercase text-xs text-gray-700 mt-8">Planning général</div>
      <div className="relative bg-white rounded-md mt-1">
        <div className="absolute -inset-1 bg-white rounded-md blur opacity-75"></div>
        <div className="relative bg-white rounded-md p-2">
          <img src={imgPlanning} alt="Seed production planning" className="rounded-md" />
        </div>
      </div>
    </>
  )
}

export default function PortfolioMaraiche() {
  return (
    <div className="bg-sky-100 rounded-md px-2 py-12 h-full">
      <div className="uppercase tracking-wider font-bold text-sky-700 text-sm text-center">
        Seeds production
      </div>
      <div className="text-sky-700 mt-4 text-center">SaaS to organize and plan</div>

      <div className="relative bg-white rounded-md mt-8">
        <div className="absolute -inset-1 bg-white rounded-md blur opacity-75"></div>
        <div className="relative bg-white rounded-md p-2">
          <MaraicheTodos />
          <MaraichePlanning />
          <div className="absolute bottom-0 bg-gradient-to-b from-white/25 to-white inset-x-0 h-8" />
        </div>
      </div>

      <ul className="mt-8 text-sky-700 list-disc list-inside">
        <li>
          Frontend with <SkyTag title="react" />, <SkyTag title="typescript" /> and{" "}
          <SkyTag title="tailwindcss" />
        </li>
        <li>
          Backend with <SkyTag title="python" />, <SkyTag title="fastapi" />,{" "}
          <SkyTag title="peewee" /> and <SkyTag title="postgresql" />
        </li>
      </ul>
    </div>
  )
}
