import Image from "next/image";
import LoginForm from "@/components/public/login-form"

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 sm:p-20">
      <LoginForm />
    </div>
  );
}
