"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState<String | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      setName(user.displayName ?? user.email ?? "Usuário");
      setReady(true);
    });
    return unsubscribe;
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-2xl">
      <div>
        Olá, <a className="font-bold text-red-500">{name}</a>!
      </div>
      <div>Bem-vindo ao seu Dashboard</div>
      <Button
        onClick={async () => {
          await signOut(auth);
        }}
        variant={"outline"}
        className="m-3"
      >
        Sair
      </Button>
    </div>
  );
}
