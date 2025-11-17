"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
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
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function toggleShowRepeatPassword() {
    setShowRepeatPassword((prev) => !prev);
  }

  async function onSubmit(values: ResetPasswordSchemaType) {
    if (!token) {
      toast.error("Invalid or missing token.");
      router.push("/forgot-password");
      return;
    }
    await authClient.resetPassword(
      {
        newPassword: values.password,
        token,
      },
      {
        onSuccess: () => {
          toast.success("Password reset successfully!");
          router.push("/sign-in");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setErrorMessage(ctx.error.message);
        },
      }
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-accent-foreground">
            Enter your new password below.
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
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showRepeatPassword ? "text" : "password"}
                          disabled={isLoading}
                          placeholder="repeat password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={toggleShowRepeatPassword}
                          className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-medium text-accent-foreground cursor-pointer"
                        >
                          {showRepeatPassword ? (
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
