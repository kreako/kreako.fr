export default function EmptyProjectCard({ className }: { className: string }) {
  return (
    <div
      className={`flex flex-col items-center mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-2 w-[22.5rem] ${className}`}
    ></div>
  )
}
