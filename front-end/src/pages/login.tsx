import Input from "./components/Input"
import Header from "./components/Header";
import { useState } from "react";

export default function login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function verifyLogin() {
        if (email === "admin@admin.com" && password === "admin") {
            window.location.href = "/dashboard";
        }
    }

    return (
        <div className="default-theme">
            <Header />
            <div className="flex flex-col justify-center items-center">
                <div className="w-[25%] mt-[8%]">
                    <h2 className="text-3xl text-center">Bem-vindo de volta</h2>
                    <p className="text-neutral-400 text-center">Entre na sua conta para continuar</p>
                    <div className="gap-4 flex flex-col my-6">
                        <Input className="w-full" type="text" placeholder="Email" title="Email" value={email} onChange={e => { setEmail(e.target.value) }} />
                        <Input className="w-full" type="password" placeholder="Senha" title="Senha" value={password} onChange={e => { setPassword(e.target.value) }} />
                    </div>
                    <button onClick={verifyLogin} className="w-full rounded-xl p-3">Entrar</button>
                    <p className="text-center mt-6">Não tem uma conta? <a href="/register" className="text-blue-500">Cadastre-se</a></p>
                </div>
            </div>
        </div>

    )
}