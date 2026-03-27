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
        const userData = { name, email, password };

        const result = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }); 

        if(!result.ok) setError("E-mail já está em uso.");
        else router.push("/login");
    }

    return (
        <div className="default-theme flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col justify-center items-center px-4 -mt-20"> 
                <div className="w-full max-w-md bg-[var(--background-contrast-color)]/30 p-8 rounded-3xl border border-[var(--border-color)] shadow-2xl backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Criar conta</h2>
                        <p className="text-neutral-500">Junte-se a nós para gerenciar seus links</p>
                    </div>

                    <div className="gap-4 flex flex-col my-6">
                        <Input 
                            type="text" 
                            placeholder="Seu nome" 
                            title="Nome" 
                            icon="person"
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                        <Input 
                            type="email" 
                            placeholder="seu@email.com" 
                            title="Email" 
                            icon="mail"
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <Input 
                            type="password" 
                            placeholder="Sua senha" 
                            title="Senha" 
                            icon="lock"
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl mb-6 text-sm">
                            <span className="material-symbols-rounded !text-[18px]">error</span>
                            {error}
                        </div>
                    )}

                    <button 
                        onClick={handleRegister} 
                        className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(23,182,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Criar conta
                    </button>

                    <p className="text-center mt-8 text-neutral-500 text-sm">
                        Já tem uma conta? 
                        <a href="/login" className="text-[var(--primary-color)] ml-1 font-semibold hover:underline">Fazer login</a>
                    </p>
                </div>
            </main>
        </div>
    );
}