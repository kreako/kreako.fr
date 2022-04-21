import type { NextPage } from "next"
import Head from "next/head"
import ContactBlock from "../components/contact-block"
import imgServer from "../images/server-view.jpg?resize&size=768"
import type { EmptyLayoutPage } from "./_app"
import { IconHeart } from "../icons/icon-heart"
import { IconUbuntu } from "../icons/icon-ubuntu"
import PortfolioSoklaki from "../components/portfolio-soklaki"
import PortfolioCleomacs from "../components/portfolio-cleomacs"
import PortfolioCcasStats from "../components/portfolio-ccas-stats"
import PortfolioMaraiche from "../components/portfolio-maraiche"

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Freelance Full Stack Developer - kreako</title>
        <meta name="description" content="home of kreako.fr" />
      </Head>

      <section
        className="min-h-[18rem] md:min-h-[24rem] lg:min-h-[32rem] flex items-center justify-center bg-cover bg-center mx-auto"
        style={{ backgroundImage: `url(${imgServer})` }}
      >
        <div className="bg-white/90 flex flex-col items-center justify-center flex-grow py-4 md:py-8 space-y-2 md:space-y-4 lg:space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-extrabold tracking-widest text-center text-sky-700">
            Senior Full Stack Developer
          </h1>
          <div className="flex flex-col items-center md:text-lg lg:text-xl">
            <div className="font-bold">#SaaS #typescript #react</div>
            <div>#vue #rust #python</div>
          </div>
        </div>
      </section>

      <section>
        <ContactBlock />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-center mx-auto">
        <section className="flex flex-col px-2 py-12 items-center">
          <div className="uppercase tracking-wider font-bold text-sky-700 text-sm">Who am I ?</div>
          <div className="text-sky-700 mt-6">
            <ul className="list-disc">
              <li>
                <div className="flex items-center space-x-2">
                  <div>
                    <abbr title="Software As A Service">SaaS</abbr> and web apps lover
                  </div>
                  <div className="text-red-600">
                    <IconHeart />
                  </div>
                </div>
              </li>
              <li>17 years of experience in software development</li>
              <li>
                <div className="flex items-center space-x-2">
                  <div>Tech lead, solo and team player</div>
                  <div className="text-amber-600">
                    <IconUbuntu />
                  </div>
                </div>
              </li>
              <li>Daily rate from 450€</li>
            </ul>
          </div>
        </section>
        <section className="flex flex-col px-2 py-12 items-center bg-sky-700">
          <div className="uppercase tracking-wider font-bold text-white text-sm">Skills</div>
          <div className="text-white mt-6">
            <div className="font-bold">Backend / System</div>
            <ul className="list-disc">
              <li>
                <WhiteTag title="python" />, <WhiteTag title="django" />, <WhiteTag title="flask" />
                , <WhiteTag title="fastapi" />
              </li>
              <li>
                <WhiteTag title="rust" />, <WhiteTag title="rocket" />, <WhiteTag title="axum" />
              </li>
              <li>
                <WhiteTag title="c" />, drivers, <WhiteTag title="linux" />,{" "}
                <WhiteTag title="vxworks" />
              </li>
              <li>
                <WhiteTag title="sql" />, <WhiteTag title="postgres" />,{" "}
                <WhiteTag title="mongodb" />, <WhiteTag title="redis" />
              </li>
            </ul>
            <div className="mt-4 font-bold">Frontend</div>
            <ul className="list-disc">
              <li>
                <WhiteTag title="typescript" />, <WhiteTag title="javascript" />
              </li>
              <li>
                <WhiteTag title="react" />, <WhiteTag title="vue" />, <WhiteTag title="jquery" />
              </li>
              <li>
                <WhiteTag title="tailwindcss" />, <WhiteTag title="nextjs" />,{" "}
                <WhiteTag title="quasar" />
              </li>
              <li>
                <WhiteTag title="jest" />, <WhiteTag title="storybook" />
              </li>
            </ul>
            <div className="mt-4 font-bold">Soft</div>
            <ul className="list-disc">
              <li>
                <WhiteTag title="communication" />, <WhiteTag title="empathy" />
              </li>
              <li>
                <WhiteTag title="strategy" />, <WhiteTag title="listening" />
              </li>
              <li>
                <WhiteTag title="training" />, <WhiteTag title="coaching" />
              </li>
              <li>
                <WhiteTag title="french" />, <WhiteTag title="english" />,{" "}
                <WhiteTag title="german" />
              </li>
            </ul>
          </div>
        </section>
      </div>
      <hr className="h-1 md:hidden bg-white" />
      <section className="flex flex-col px-2 py-6 items-center bg-sky-700">
        <div className="uppercase tracking-wider font-bold text-white text-sm py-16">Portfolio</div>
        <div className="grid grid-cols-1 xl:grid-cols-2 justify-center mx-auto gap-4 place-items-stretch">
          <div>
            <PortfolioSoklaki />
          </div>
          <div>
            <PortfolioCleomacs />
          </div>
          <div>
            <PortfolioCcasStats />
          </div>
          <div>
            <PortfolioMaraiche />
          </div>
        </div>
      </section>
      <hr className="h-1 md:hidden bg-white" />
      <section className="">
        <ContactBlock />
      </section>
    </>
  )
}

type WhiteTagProps = {
  title: string
}

function WhiteTag({ title }: WhiteTagProps) {
  return <span className="before:content-['#'] before:text-xs before:text-sky-300">{title}</span>
}

const Home = Page as EmptyLayoutPage
Home.emptyLayout = true

export default Home
