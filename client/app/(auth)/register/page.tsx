"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

import { registerSchema, RegisterSchema } from "@/validations/register.schema";
import { registerUser } from "./register";

export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: RegisterSchema) {
        try {
            setLoading(true);

            await registerUser(data);

            toast.success("Account created successfully");
            router.push("/");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-sm rounded-2xl border shadow-lg">

                {/* HEADER */}
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-semibold">
                        Create account
                    </CardTitle>
                    <CardDescription>
                        Sign up to get started
                    </CardDescription>
                </CardHeader>

                {/* FORM */}
                <CardContent>
                    <form
                        id="register-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FieldGroup className="space-y-4">

                            {/* NAME */}
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                                        <FieldLabel>Name</FieldLabel>
                                        <Input {...field} type="text" placeholder="User name" className="h-11" />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* EMAIL */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                                        <FieldLabel>Email</FieldLabel>
                                        <Input {...field} type="email" placeholder="you@example.com" className="h-11" />
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
                                        <Input {...field} type="password" placeholder="••••••••" className="h-11" />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>

                        {/* LOGIN LINK */}
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>

                {/* FOOTER */}
                <CardFooter>
                    <Button
                        type="submit"
                        form="register-form"
                        disabled={loading}
                        className="w-full h-11 rounded-lg"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}