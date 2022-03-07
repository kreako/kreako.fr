import { IconMail } from "../icons/icon-mail"
import { IconPhone } from "../icons/icon-phone"

export default function ContactBlock() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-sky-500 to-sky-600 px-2 py-12">
      <div className="uppercase tracking-wider font-bold text-white text-sm">Contact</div>
      <div className="grid grid-cols-1 gap-y-2 mt-6">
        <div className="flex items-center space-x-2 mr-8">
          <IconPhone />
          <p className="font-bold text-lg md:text-xl text-white">
            <a href="tel:+33698990069">+33 6 98 99 00 69</a>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <IconMail />
          <p className="font-bold text-lg md:text-xl text-white">
            <a href="mailto:olivier@kreako.fr">olivier@kreako.fr</a>
          </p>
        </div>
      </div>
    </div>
  )
}