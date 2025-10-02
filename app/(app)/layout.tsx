import Header from "@/components/Header";


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-slate-400">
      <Header />
      <div className="container py-10">{children}</div>
    </div>
  );
};

export default layout;
