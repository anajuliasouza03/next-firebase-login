"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/firebase";
import { LoginInput, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    console.log("Submeteu com", data);
    try {
      await login(data.email, data.password);
      console.log("Login bem-sucedido, redirecionando…");
      router.push("/dashboard");
    } catch (e: any) {
      console.error(e);
      if (e.message == "Firebase: Error (auth/invalid-credential).") {
        alert("Você não fez cadastro ainda!");
        router.push("/register");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-3">
                  <User size={16} /> Faça o seu Login!
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="seu@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Link href="/reset-password" className="text-[12px]">
                  Esqueci minha senha
                </Link>
                <Link href="/register" className="text-[12px]">
                  Sem login? Registre-se
                </Link>
              </div>
              <Button type="submit">Entrar</Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
