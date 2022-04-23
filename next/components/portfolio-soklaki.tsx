import imgEvolutionFrancais from "../images/projects/soklaki-evolution-francais.jpg"
import SkyTag from "./sky-tag"

type SoklakiMainStatisticProps = {
  label: string
  percent: Number
}

function SoklakiMainStatistic({ label, percent }: SoklakiMainStatisticProps) {
  return (
    <div className="bg-gray-800 h-40 w-40 border-2 border-gray-200 shadow-2xl rounded-xl p-2 relative">
      <div className="absolute top-0 inset-x-0 text-sm text-white font-bold flex justify-center">
        {label}
      </div>
      <div className="absolute top-14 left-6 right-0 flex justify-center items-end">
        <div className="text-7xl text-teal-500">{percent}</div>
        <div className="text-2xl text-teal-700">%</div>
      </div>
    </div>
  )
}

function SoklakiMainStatistics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      <SoklakiMainStatistic label="Total" percent={64} />
      <SoklakiMainStatistic label="Commentaires" percent={73} />
      <SoklakiMainStatistic label="Observations" percent={48} />
      <SoklakiMainStatistic label="Evaluations" percent={88} />
    </div>
  )
}

type IndividualCompetencyProps = {
  label: string
  level: "red" | "yellow" | "green" | "pink"
  observations: number
}

function IndividualCompetency({ label, level, observations }: IndividualCompetencyProps) {
  let bgObservations = "bg-gray-500"
  if (observations > 0) {
    bgObservations = "bg-green-500"
  }
  let bgLevel = "bg-pink-500"
  if (level === "red") {
    bgLevel = "bg-red-500"
  } else if (level === "yellow") {
    bgLevel = "bg-yellow-500"
  } else if (level === "green") {
    bgLevel = "bg-green-500"
  }
  return (
    <div className="flex items-center space-x-2">
      <div className="w-16">{label}</div>
      <div className={`${bgObservations} w-5 h-5 rounded-md block mx-auto`}>
        <div className="flex items-center justify-center h-full text-xs">{observations}</div>
      </div>
      <div className={`${bgLevel} w-5 h-5 rounded-md align-middle block mx-auto`}></div>
    </div>
  )
}

function IndividualCompetencies() {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4">
      <IndividualCompetency label="1.1.1." level="yellow" observations={0} />
      <IndividualCompetency label="1.1.2." level="green" observations={2} />
      <IndividualCompetency label="1.1.3." level="green" observations={5} />
      <IndividualCompetency label="1.1.4." level="red" observations={0} />
      <IndividualCompetency label="1.1.5." level="pink" observations={1} />
      <IndividualCompetency label="1.2.1." level="yellow" observations={2} />
      <IndividualCompetency label="1.2.2." level="yellow" observations={3} />
      <IndividualCompetency label="1.3.1." level="green" observations={0} />
      <IndividualCompetency label="1.3.2." level="pink" observations={0} />
      <IndividualCompetency label="2.1.1." level="pink" observations={0} />
      <IndividualCompetency label="2.1.2." level="yellow" observations={1} />
      <IndividualCompetency label="2.1.3." level="green" observations={1} />
    </div>
  )
}

export default function PortfolioSoklaki() {
  return (
    <div id="soklaki" className="bg-sky-100 rounded-md px-2 py-12">
      <div className="uppercase tracking-wider font-bold text-sky-700 text-sm text-center">
        Soklaki
      </div>
      <div className="text-sky-700 mt-4 text-center">
        SaaS for french schools - comply with regulations
      </div>
      <div className="relative bg-white rounded-md mt-8">
        <div className="absolute -inset-1 bg-white rounded-md blur opacity-75"></div>
        <div className="relative bg-white rounded-md p-2">
          <SoklakiMainStatistics />
          <IndividualCompetencies />
          <div className="absolute bottom-0 bg-gradient-to-b from-white/25 to-white inset-x-0 h-8" />
        </div>
      </div>
      <div className="relative bg-white rounded-md mt-8">
        <div className="absolute -inset-1 bg-white rounded-md blur opacity-75"></div>
        <div className="relative bg-white rounded-md p-2">
          <img
            src={imgEvolutionFrancais}
            alt="Evolution curve for french competency"
            className="rounded-md"
          />
        </div>
      </div>
      <ul className="mt-8 text-sky-700 list-disc list-inside">
        <li>
          Solo founder, <SkyTag title="product" /> with <SkyTag title="gamification" /> to support
          school teams and produce administrative reports
        </li>
        <li>
          Frontend with <SkyTag title="vue" /> and <SkyTag title="tailwindcss" />
        </li>
        <li>
          Backend with <SkyTag title="rust" />, <SkyTag title="python" />,{" "}
          <SkyTag title="fastapi" />, <SkyTag title="hasura" /> and <SkyTag title="postgresql" />
        </li>
        <li>
          Infrastructure with <SkyTag title="docker/podman" />, <SkyTag title="ansible" />,{" "}
          <SkyTag title="prometheus" /> and <SkyTag title="grafana" />
        </li>
      </ul>
    </div>
  )
}
