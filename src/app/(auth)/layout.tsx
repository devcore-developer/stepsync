export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-page">
      {/* Left brand panel - hidden on mobile */}
      <div className="hidden w-1/2 bg-navy-700 lg:flex lg:flex-col lg:justify-between p-12 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-grid)" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-navy-500">
               <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                 <path d="M16 8.5C16 7 14.5 6 12 6C9.5 6 8 7.2 8 9C8 10.5 9.3 11.3 12 12C14.7 12.7 16 13.5 16 15C16 16.8 14.5 18 12 18C9.5 18 8 17 8 15.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
               </svg>
            </div>
            <span className="text-lg font-bold">Step<span className="text-accent-gold">Sync</span></span>
          </div>
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Your USMLE Step 1 journey,<br />optimized.
          </h1>
          <p className="max-w-md text-navy-100">
            Plan, track, and master your study schedule with AI-assisted precision. Join thousands of medical students achieving their target scores.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["SM", "JK", "AP", "RL"].map((i) => (
                <div key={i} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy-700 bg-brand-500 text-xs font-semibold">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm text-navy-100">Join 10,000+ future doctors</p>
          </div>
        </div>

        <div className="relative text-xs text-navy-200">
          © {new Date().getFullYear()} StepSync. All rights reserved.
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}