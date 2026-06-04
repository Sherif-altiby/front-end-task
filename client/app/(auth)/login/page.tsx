"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm rounded-2xl border shadow-lg">

        {/* HEADER */}
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Welcome back
          </CardTitle>
          <CardDescription>
            Sign in to your account
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
                    <FieldLabel>Email</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className="h-11"
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
                    <FieldLabel>Password</FieldLabel>

                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </FieldGroup>

            {/* REGISTER LINK */}
            <div className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Create one
              </Link>
            </div>
          </form>
        </CardContent>

        {/* FOOTER */}
        <CardFooter>
          <Button
            type="submit"
            form="login-form"
            className="w-full h-11 rounded-lg"
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}