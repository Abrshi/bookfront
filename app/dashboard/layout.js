import Header from "@/components/Home/header/Header";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex min-h-screen">
      {/* Header */}
     

      {/* Main Content */}
      <main className="">
        <Header />
        {children}
      </main>
    </section>
  );
}
