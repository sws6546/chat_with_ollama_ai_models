export default function AssistantMessage({ content, model } : { content: string, model: string }) {
    return (
      <div>
        <p className="text-sm mb-[-5px]">assistant [{model}]:</p>
        <p className="text-xl">{content}</p>
      </div>
    )
  }
  