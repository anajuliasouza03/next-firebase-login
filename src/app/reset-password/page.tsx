"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/firebase";
import { ResetInput, resetSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetInput) => {
    try {
      await resetPassword(data.email);
      setSubmitted(true);
    } catch (e: any) {
      alert("Erro ao resetar senha");
      console.log(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md">
        {submitted ? (
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-3">
                  <Mail size={16} /> Email enviado!
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              Verifique sua caixa de entrada para redefinir sua senha.
              <Button onClick={() => router.replace("/login")}>
                Ir para login
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-md"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-3">
                      <Mail size={16} /> Recuperar senha
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
                          <Input {...field} placeholder="seu@gmail.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Enviar link</Button>
                </CardContent>
              </Card>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
