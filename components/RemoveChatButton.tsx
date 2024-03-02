'use client'

import { useFormStatus } from "react-dom"

export default function RemoveChatButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending} className="p-2 pl-4 pr-4 bg-red-500 hover:bg-red-600 disabled:bg-red-600
        shadow-xl rounded-xl transition">
            🗑
        </button>
    )
}
