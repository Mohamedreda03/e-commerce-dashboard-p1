"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <div>
      {session ? (
        <div>
          <div>{JSON.stringify(session)}</div>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      ) : (
        <div>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
