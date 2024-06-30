import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Home | Authentication & Authorization",
  description: "A simple next.js app to practice next-auth and prisma",
};

export default function HomeLayout({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
