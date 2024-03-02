import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"
import jwt from 'jsonwebtoken'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const token = cookies().get('jwt')?.value
  if (token === undefined) {
    redirect("/")
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
      if (err) {
        redirect("/")
      }
    })
  }

  return (
    <div className="flex flex-col h-screen gap-2 p-2">
      {children}
    </div>
  )
}