"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/schema/auth.schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import env from "@/lib/env";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  async function onSubmit(values: ForgotPasswordSchemaType) {
    await authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          toast.success("Password reset email sent!");
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message);
          toast.error(ctx.error.message);
        },
      }
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-accent-foreground">
            Enter your email to reset your password.
          </p>
        </div>
        <div>
          {errorMessage && (
            <div className="mb-3 text-sm text-red-500 p-3 border border-red-400 rounded-lg bg-red-100">
              {errorMessage}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@example.com"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                Send Reset Link
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <Link href="/sign-in">
            <Button variant="link" className="w-full h-4!">
              remember your password? sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
