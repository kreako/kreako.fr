export default function ContactBlock() {
  return (
    <div className="flex flex-col items-center bg-sky-600 px-2 py-16 space-y-4">
      <div className="uppercase tracking-wider font-bold text-white text-sm">Contact</div>
      <div className="grid grid-cols-1 gap-y-4 mt-6">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl md:text-2xl text-white">
            <a href="tel:+33698990069">+33 6 98 99 00 69</a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl md:text-2xl text-white">
            <a href="mailto:olivier@kreako.fr">olivier@kreako.fr</a>
          </div>
        </div>
      </div>
    </div>
  )
}
