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

export default function ForgotPassword() {
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordSchemaType) {
    console.log(values);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
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
