import { ReactNode } from "react"
import Header from "./header"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="text-gray-900">{children}</main>
    </>
  )
}
