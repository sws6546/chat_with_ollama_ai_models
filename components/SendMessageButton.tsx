'use client'

import { useFormStatus } from "react-dom"

export default function SendMessageButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className="p-2 pl-6 pr-6 bg-teal-400 rounded-xl
        transition hover:bg-teal-500 cursor-pointer disabled:bg-teal-500">{pending ? "Sending..." : "Send"}</button>
  )
}
