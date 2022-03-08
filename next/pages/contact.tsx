import Head from "next/head"
import { IconMail } from "../icons/icon-mail"
import { IconPhone } from "../icons/icon-phone"

export default function Contact() {
  return (
    <>
      <Head>
        <title>contact - kreako</title>
        <meta name="description" content="contact page of kreako.fr" />
      </Head>
      <section className="flex flex-col items-center min-h-[18rem] md:min-h-[24rem] lg:min-h-[32rem] ">
        <div className="flex flex-col justify-center flex-grow items-center">
          <div className="grid grid-cols-1 gap-y-2 md:gap-y-4 lg:gap-y-6 mt-20 text-gray-900">
            <div className="text-2xl md:text-3xl text-sky-600">
              <a className="font-bold" href="tel:+33698990069">
                +33 6 98 99 00 69
              </a>
            </div>
            <div className="text-2xl md:text-3xl text-sky-600">
              <a className="font-bold" href="mailto:olivier@kreako.fr">
                olivier@kreako.fr
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-center flex-grow items-center mt-24 bg-gradient-to-br from-sky-500 to-sky-600 px-2 py-12 text-white">
          <h1 className="text-3xl uppercase font-extrabold tracking-widest text-center text-white">
            Full stack developer
          </h1>
          <div className="mt-2">
            #{"{"}java,type{"}"}script #react #vue
          </div>
          <div>#rust #python</div>
          <div className="mt-6 text-lg">À bientôt ! 🤸</div>
        </div>
      </section>
    </>
  )
}
