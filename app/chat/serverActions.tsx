"use server"

interface Model {
  name: string,
  modified_at: string,
  size: number,
  digest: string,
  details: {}
}


export async function setModel(formData: FormData) {
  const modelName = formData.get("model")
  const existingModelsJson = await fetch("http://localhost:11434/api/tags")
  const existingModels = await existingModelsJson.json();

  let modelExist = false
  existingModels.models.map((model: Model) => {
    if (model.name == modelName || model.name == `${modelName}:latest`) {
      modelExist = true
    }
  })

  if (!modelExist) {

  }
}

export async function sendMessage(formData: FormData) {
  const message = formData.get("message")

}