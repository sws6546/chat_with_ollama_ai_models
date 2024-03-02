import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Navbar() {
  async function logout() {
    'use server'
    const allCookies = cookies().getAll()
    allCookies.map((cookie) => {
      cookies().delete(cookie.name)
    })
    redirect('/chat')
  }
  return (
    <div className="bg-teal-950 p-2 rounded-xl shadow-xl flex md:flex-row flex-col justify-between items-center">
      <h1 className="text-xl font-bold">{process.env.APP_NAME}</h1>
      <form action={logout}>
        <button type="submit" className="border border-red-500 text-red-500 p-2 pl-6 pr-6 rounded-xl
      transition hover:border-red-600 hover:text-red-600">Log Out</button>
      </form>
    </div>
  )
}
