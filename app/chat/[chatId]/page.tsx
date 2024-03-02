import ListOfChats from "@/components/ListOfChats"
import ChatWindow from "@/components/ChatWindow"
import { prisma } from "@/app/prisma"
import { redirect } from "next/navigation"

export default async function Chat({ params }: { params: { chatId: string } }) {
    const chat = await prisma.chat.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            chat_messages: {
                orderBy:{
                    message_addedDate: 'asc'
                }
            }
        }
    })

    if(chat == null) {
        redirect("/chat")
    }



    return (
        <div className="flex flex-row h-svh gap-2">
            <ListOfChats />
            <ChatWindow chatId={params.chatId} chat={chat} />
        </div>
    )
}
