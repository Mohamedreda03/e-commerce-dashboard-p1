"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignInSchema, SignInSchemaType } from "@/schema/auth.schema";

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
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { GoogleIcon } from "@/components/icons";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  async function onSubmit(values: SignInSchemaType) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
        rememberMe: false,
      },
      {
        onSuccess: () => {
          toast.success("Successfully signed in!");
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message);
          toast.error(ctx.error.message);
        },
      }
    );
  }

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleGoogleSignIn() {
    if (isGoogleLoading) return;

    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to continue with Google.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-accent-foreground">
            Sign in to your account to continue.
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          disabled={isLoading}
                          placeholder="password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-accent-foreground cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Link
                href="/forgot-password"
                className="text-sm flex justify-end text-accent-foreground hover:underline"
              >
                Forgot Password?
              </Link>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <GoogleIcon className="h-4 w-4" aria-hidden="true" />
                )}
                {isGoogleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <Link href="/sign-up">
            <Button variant="link" className="w-full h-4!">
              don&apos;t have an account? sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
