import type { ComponentChildren } from "preact";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";

interface ShellProps {
  active?: string;
  children: ComponentChildren;
}

export default function Shell({ active, children }: ShellProps) {
  return (
    <div class="page-enter">
      <Header active={active} />
      {children}
      <Footer />
    </div>
  );
}
