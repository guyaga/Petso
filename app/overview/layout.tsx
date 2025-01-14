import Login from "../login/page";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Alert from "@/components/Alert";
import Navbar from "../navbar/page";
import Footer from "../footer/page";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full flex-col px-4 py-6 lg:px-40">
        <Alert />
        {children}
      </div>
    </>
  );
}
