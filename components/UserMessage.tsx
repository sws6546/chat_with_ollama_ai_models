export default function UserMessage({ content } : { content: string }) {
  return (
    <div>
      <p className="text-sm mb-[-5px]">user:</p>
      <p className="text-xl">{content}</p>
    </div>
  )
}
