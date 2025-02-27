"use client"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { redirect } from "next/navigation"

const LogOut = () => {
    useEffect(() => {
        window.localStorage.setItem("loggedIn", false)
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        toast("Logged out succesfully")
        redirect("/")
    }, [])
    return (
        <div>
            logging out
        </div>
    )
}

export default LogOut