import { redirect } from "next/navigation";
import { GET__getUser } from "@/lib/data-service";

import { createClient } from "@/supabase/server";

export default async function PrivatePage() {
  const { data, error } = await GET__getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return <p>Hello {data.user.email}</p>;
}
