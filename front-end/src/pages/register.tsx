import { useState } from "react";
import { useRouter } from "next/router";
import Input from "./components/Input";
import Header from "./components/Header";

export default function Register() {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    async function handleRegister() {
        setError("");

        const userData = {
            "name": name,
            "email": email,
            "password": password
        };

        const result = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }); 

        if(!result.ok) setError("E-mail já está em uso.");
        else router.push("/login");
    }

    return (
        <div className="default-theme">
            <Header />
            <div className="flex flex-col justify-center items-center">
                <div className="w-[25%] mt-[8%]">
                    <h2 className="text-3xl text-center">Bem-vindo</h2>
                    <p className="text-neutral-400 text-center">Crie sua conta para continuar</p>
                    <div className="gap-4 flex flex-col my-6">
                        <Input className="w-full" type="text" placeholder="Nome" title="Nome" value={name} onChange={e => { setName(e.target.value) }} />
                        <Input className="w-full" type="email" placeholder="Email" title="Email" value={email} onChange={e => { setEmail(e.target.value) }} />
                        <Input className="w-full" type="password" placeholder="Senha" title="Senha" value={password} onChange={e => { setPassword(e.target.value) }} />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                    <button onClick={handleRegister} className="w-full rounded-xl p-3">Criar</button>
                    <p className="text-center mt-6">Já tem uma conta? <a href="/login" className="text-blue-500">Login</a></p>
                </div>
            </div>
        </div>

    )
}