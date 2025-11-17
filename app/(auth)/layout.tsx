interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-4xl md:border md:shadow-md rounded-2xl w-full flex overflow-hidden min-h-9/12">
        <div className="flex-1 p-6">{children}</div>
        <div className="flex-1 bg-linear-180 from-orange-500 to-orange-400 md:flex hidden flex-col justify-center items-center">
          <div>
            <h2 className="text-white text-3xl font-bold p-6">Welcome Back!</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
