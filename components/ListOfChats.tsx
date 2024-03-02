import { prisma } from "@/app/prisma"
import ChatButton from "./ChatButton"
import { revalidatePath } from "next/cache";
import Navbar from "./Navbar";

export default async function ListOfChats() {

  async function addChat(formData: FormData) {
    'use server'
    const chatName: string = formData.get('name') as string
    if (chatName != "") {
      await prisma.chat.create({
        data: {
          chat_name: chatName
        }
      })
      revalidatePath("/chat");
    }
  }

  const chatList = await prisma.chat.findMany()

  return (
    <div className="bg-teal-950 rounded-xl shadow-xl p-4 flex flex-col gap-4 w-1/4 h-full overflow-auto">
      <Navbar />
      <form action={addChat} className="flex flex-row gap-2">
        <input type="text" name="name" className="w-full p-2 rounded-xl text-teal-900"
        placeholder='eg. "fetch api in javascript"' />
        <input type="submit" value="+" className="p-2 pl-4 pr-4 bg-blue-400 rounded-xl
        transition hover:bg-blue-500 disabled:bg-blue-500 cursor-pointer" />
      </form>
      {chatList.map((chat) => (
        <ChatButton key={chat.id} chatId={chat.id} chatName={chat.chat_name} />
      ))}
    </div>
  )
}
