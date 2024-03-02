import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation";

export default function Home() {

  const token = cookies().get('jwt')?.value
  if (token !== undefined) {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
      if (!err) {
        redirect('/chat')
      }
    })
  }

  async function Login(formData: FormData) {
    "use server"

    cookies().getAll().map(cookie => {
      cookies().delete(cookie.name)
    })

    const rawPassword = formData.get("password")
    if (rawPassword == process.env.APP_PASSWORD) {
      const jwt_secret_key: string = process.env.JWT_SECRET_KEY ?? "super secret jwt private key :P"
      cookies().set("jwt", jwt.sign({ username: "user" }, jwt_secret_key, { expiresIn: "1h" }))
      redirect('/chat')
    }
    else {
      cookies().set("error", "Bad Password")
    }
  }

  return (
    <div className="text-center mt-10 flex flex-col items-center gap-5 m-5">
      <h1 className="text-3xl font-bold">{process.env.APP_NAME}</h1>
      <p>powered by ollama ai</p>
      <form action={Login} className="flex flex-col w-full md:w-2/5 p-3 rounded-xl bg-teal-700 shadow-xl gap-4">
        <h2 className="text-2xl">Login:</h2>
        <input type="password" name="password" id="password" placeholder="Password" className="p-2 rounded-xl text-teal-900" />
        { cookies().get("error") != undefined ?
            (<p className="text-red-500">bad password</p>)
            :
            (<p></p>)
        }
        <input type="submit" value="Sign in" className="bg-blue-500 w-min self-center p-2 pl-6 pr-6 rounded-xl shadow-xl 
        hover:bg-blue-600 transition cursor-pointer" />
      </form>
    </div>
  );
}
