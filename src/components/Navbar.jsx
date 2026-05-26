"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaBrain, FaCoins, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { SiVercel } from "react-icons/si";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const credits = session?.user?.credits ?? 0;

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Studio", href: "/chat" },
    { name: "Gallery", href: "/gallery" },
  ];

  const vercelDeployUrl = "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSamurAIGPT%2Fsocial-post&root-directory=apps/prompt-architect";

  return (
    <header className="sticky top-0 z-[150] w-full glass border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
            <FaBrain className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent group-hover:opacity-95 transition-opacity">
            Prompt<span className="text-violet-400">Architect</span>
          </span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions (Stripe / Deploy / User Profile) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Vercel Deploy Button */}
          <a
            href={vercelDeployUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <SiVercel className="w-3.5 h-3.5" />
            Deploy to Vercel
          </a>

          {session ? (
            <div className="flex items-center gap-3">
              {/* Credits counter */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                <FaCoins className="w-3.5 h-3.5 text-violet-400" />
                <span>{credits} credits</span>
              </div>

              {/* User profile dropdown/button */}
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                )}
                <span className="text-sm font-medium text-zinc-300 max-w-[120px] truncate">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  title="Sign Out"
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:from-violet-500 hover:to-pink-500 shadow-md shadow-violet-500/20 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {session && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
              <FaCoins className="w-3 h-3 text-violet-400" />
              <span>{credits}</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Absolute Overlay Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-[200] glass bg-slate-950/95 border-b border-white/10 flex flex-col p-4 space-y-3 animate-slide-up md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <hr className="border-white/5 my-1" />

          {session ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      className="w-8 h-8 rounded-full border border-white/20"
                    />
                  )}
                  <span className="text-sm font-medium text-zinc-300 truncate max-w-[150px]">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <FaSignOutAlt className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                signIn("google");
              }}
              className="w-full py-2.5 text-center font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 text-white hover:from-violet-500 hover:to-pink-500 shadow-md shadow-violet-500/20 transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Vercel Deploy Button (at the bottom of mobile menu) */}
          <a
            href={vercelDeployUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <SiVercel className="w-4 h-4" />
            Deploy to Vercel
          </a>
        </div>
      )}
    </header>
  );
}
