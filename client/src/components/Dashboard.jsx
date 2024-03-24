import { Appbar } from "./Appbar";
import { useSearchParams } from "react-router-dom"

export function Dashboard(){
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    return <div>
        <Appbar name={name}></Appbar>
    </div>
}