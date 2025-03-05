import { useContext } from "react"
import { NyContext } from "../App"

export default function useApi() {
    const ctx = useContext(NyContext);
    if (ctx === undefined || ctx === null)
        throw "ctx undefined";
    return ctx.api;
}