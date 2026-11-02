
export default function LoginPage() {
  return (
    <main className="
    flex items-center justify-center
    px-4 py-8  
    min-h-screen
    bg-cover
    bg-center
    bg-no-repeat
    bg-[url('/images/mobile-bg.jpg')]
    md:bg-[url('/images/desktop-bg.jpg')]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">

        {/* Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Users Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and explore user information
          </p>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Please enter your credentials to sign in.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
