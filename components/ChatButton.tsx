import { prisma } from "@/app/prisma"
import { revalidatePath } from "next/cache"
import RemoveChatButton from "./RemoveChatButton"
import Link from "next/link"

export default function ChatButton({ chatId, chatName }: { chatId: string, chatName: string }) {

  async function removeChat(formData: FormData) {
    'use server'
    await prisma.message.deleteMany({
      where: {
        chat_id: chatId
      }
    })
    await prisma.chat.delete({
      where: {
        id: chatId
      }
    })
    revalidatePath('/chat')
  }

  return (
    <div className="w-full rounded-xl shadow-xl
    flex flex-row justify-between items-center gap-2">
      <Link href={`/chat/${chatId}`} className="bg-teal-800 w-full p-2 rounded-xl shadow-xl
      transition hover:bg-teal-600 cursor-pointer">
        {chatName}
      </Link>
      <form action={removeChat}>
        <RemoveChatButton />
      </form>
    </div>
  )
}
