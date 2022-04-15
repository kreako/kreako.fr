import { ReactNode } from "react"

export default function EmptyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="text-gray-900">{children}</main>
    </>
  )
}
