"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      await api.post("/api/auth/login", data);
      toast.success("Login successful 🎉");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="w-full max-w-sm shadow-xl border-border/60 rounded-2xl">
        
        {/* HEADER */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>

        {/* FORM */}
        <CardContent>
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FieldGroup className="space-y-4">

              {/* EMAIL */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <FieldLabel className="text-xs text-muted-foreground">
                      Email
                    </FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className="
                        h-11 rounded-lg
                        bg-background/60 backdrop-blur
                        border-border/60
                        transition-all
                        focus-visible:ring-2
                        focus-visible:ring-foreground/20
                        focus-visible:border-foreground/40
                        placeholder:text-muted-foreground/50
                      "
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* PASSWORD */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <FieldLabel className="text-xs text-muted-foreground">
                      Password
                    </FieldLabel>

                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="
                        h-11 rounded-lg
                        bg-background/60 backdrop-blur
                        border-border/60
                        transition-all
                        focus-visible:ring-2
                        focus-visible:ring-foreground/20
                        focus-visible:border-foreground/40
                        placeholder:text-muted-foreground/50
                      "
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </FieldGroup>
          </form>
        </CardContent>

        {/* FOOTER */}
        <CardFooter>
          <Button
            className="
              w-full h-11 rounded-lg
              font-medium
              bg-foreground text-background
              hover:bg-foreground/90
              transition-all
              active:scale-[0.98]
            "
            type="submit"
            form="login-form"
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}