'use client'

import { useFormStatus } from "react-dom"

export function SetModelButton() {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} type="submit" value="Set model" className="p-2 pl-6 pr-6 bg-blue-400 rounded-xl
        transition hover:bg-blue-500 disabled:bg-blue-500 cursor-pointer">
      {pending ? "loading..." : "Set model"}
    </button>
  )
}
