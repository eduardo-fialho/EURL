import Input from "./components/Input"
import Header from "./components/Header";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    async function handleLogin() {
        setError("");
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        }); 

        if (result?.error) setError("E-mail ou senha incorretos.");
        else router.push("/dashboard");
    }

    return (
        <div className="default-theme flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col justify-center items-center px-4 -mt-32">
                <div className="w-full max-w-md bg-[var(--background-contrast-color)]/30 p-8 rounded-3xl border border-[var(--border-color)] shadow-2xl backdrop-blur-sm">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Bem-vindo de volta</h2>
                        <p className="text-neutral-500">Entre na sua conta para continuar gerenciando seus links</p>
                    </div>

                    <div className="gap-5 flex flex-col my-6">
                        <Input 
                            type="text" 
                            placeholder="exemplo@email.com" 
                            title="Email" 
                            icon="mail"
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <Input 
                            type="password" 
                            placeholder="Sua senha secreta" 
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
                        onClick={handleLogin} 
                        className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(23,182,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Entrar na conta
                    </button>

                    <p className="text-center mt-8 text-neutral-500 text-sm">
                        Não tem uma conta? 
                        <a href="/register" className="text-[var(--primary-color)] ml-1 font-semibold hover:underline">Cadastre-se</a>
                    </p>
                </div>
            </main>
        </div>
    );
}