import { cookies } from "next/headers"
import { SetModelButton } from "./SetModelButton"
import SendMessageButton from "./SendMessageButton"
import Link from "next/link"
import { prisma } from "@/app/prisma"
import UserMessage from "./UserMessage"
import AssistantMessage from "./AssistantMessage"

interface Model {
  name: string,
  modified_at: string,
  size: number,
  digest: string,
  details: {}
}

export default async function ChatWindow({ chatId, chat }: { chatId: string, chat: any }) {

  async function setModel(formData: FormData) {
    'use server'
    const modelName: string = formData.get("model") as string
    const existingModelsJson = await fetch("http://localhost:11434/api/tags")
    const existingModels = await existingModelsJson.json();

    let modelExist = false
    existingModels.models.map((model: Model) => {
      if (model.name == modelName || model.name == `${modelName}:latest`) {
        modelExist = true
      }
    })

    if (!modelExist) {
      const ollamaMsgJson = await fetch("http://localhost:11434/api/pull", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          "name": modelName,
          "stream": false
        })
      })
      const ollamaMsg = await ollamaMsgJson.json()
      if (ollamaMsg.status == 'success') {
        cookies().set("model", modelName)
      }
    } else {
      cookies().set("model", modelName)
    }
  }

  async function sendMessage(formData: FormData) {
    'use server'
    const message = formData.get("message")

    if (message == "") {
      cookies().set("error", "Message input can not be empty :(")
      return 0;
    }

    if (cookies().get("model") === undefined) {
      cookies().set("error", "Model can not be empty :(")
      return 0;
    }

    cookies().delete("error")

    await prisma.message.create({
      data: {
        chat_id: chatId,
        message_author: "user",
        message_content: message as string,
        message_modelBy: "user",
      }
    })

    const historyOfMessages = await prisma.message.findMany({
      select: {
        message_author: true,
        message_content: true
      },
      where: {
        chat_id: chatId
      },
      orderBy: {
        message_addedDate: 'asc'
      }
    })

    const messagesToSend = historyOfMessages.map((message) => {
      return { role: message.message_author, content: message.message_content }
    })

    const aiResponseJson = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        model: cookies().get("model")?.value,
        messages: messagesToSend,
        stream: false
      })
    })

    const aiResponse = await aiResponseJson.json()

    await prisma.message.create({
      data: {
        chat_id: chatId,
        message_author: "assistant",
        message_content: aiResponse.message.content as string,
        message_modelBy: cookies().get("model")?.value as string,
      }
    })
  }

  return (
    <div className="w-3/4 bg-teal-950 rounded-xl shadow-xl flex flex-col p-4 gap-4 h-full">
      {cookies().get("error") === undefined
        ? <p></p>
        : <p className="text-red-500">{cookies().get("error")?.value}</p>
      }
      <div className="h-full bg-teal-900 rounded-xl shadow-xl p-4 overflow-y-auto flex flex-col gap-4">
        {
          chat.chat_messages.map((message: any) => (
            message.message_author == "user" ?
              <UserMessage key={message.id} content={message.message_content} />
              :
              <AssistantMessage key={message.id} content={message.message_content} model={message.message_modelBy} />
          ))
        }
      </div>
      <form action={sendMessage} className="flex flex-row gap-2 text-teal-950">
        <input type="text" name="message" placeholder="Write something..." className="w-full p-2 rounded-xl" />
        <SendMessageButton />
      </form>
      <form action={setModel} className="flex flex-row gap-2 text-teal-950 items-center">
        <input type="text" name="model" placeholder="eg. llama2" className='w-1/3 p-2 rounded-xl' />
        <SetModelButton />
        <Link href="https://ollama.ai/library" className="p-2 bg-blue-400 rounded-xl
        transition hover:bg-blue-500 disabled:bg-blue-500 cursor-pointer">📋</Link>
        <p className="text-teal-300">Actual model is {cookies().get("model")?.value}</p>
      </form>
    </div>
  )
}
