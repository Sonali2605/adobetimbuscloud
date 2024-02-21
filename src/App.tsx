import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
export default function App(){
  return (
    <>
    <p className="container bg-sky-100">For Docs : https://ui.shadcn.com/</p>
    <div className="container grid grid-cols-4 gap-4 mt-5 ">
    <Button>Hello , I am a ShadCN UI Button</Button>
    <Button variant={"secondary"}>Hello , I am a ShadCN UI Button</Button>
    <Button variant={"link"}>Hello , I am a ShadCN UI Button</Button>
    <Button variant={"outline"}>Hello , I am a ShadCN UI Button</Button>
    <label>Hello I am a Switch</label>
    <Switch></Switch>
    </div>
    </>
  )
}