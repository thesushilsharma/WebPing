import { Bell, Code2, Database, Globe, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 dark:opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-8 pt-24 sm:pt-32 pb-16 w-full">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300 ring-1 ring-zinc-900/10 dark:ring-white/10 shadow-sm backdrop-blur-sm">
              Lightweight full-stack architecture.{" "}
              <a
                href="https://github.com/thesushilsharma/WebPing"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600 dark:text-indigo-400"
              >
                <span className="absolute inset-0" aria-hidden="true"></span>
                View Source <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
            Native Push Notifications,{" "}
            <span className="text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text">
              Simplified.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-300">
            A fast, open-source setup for the Web Push API. Build powerful
            browser notifications in Next.js without relying on Firebase.
            Powered by VAPID and PostgreSQL.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/notifications"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105 active:scale-95"
            >
              Go to Notifications
            </Link>
            <a
              href="#features"
              className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              Explore Features <span aria-hidden="true">↓</span>
            </a>
            <a
              href="https://github.com/thesushilsharma/WebPing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 text-zinc-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors hidden sm:inline"
            >
              GitHub Repo <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mx-auto mt-24 max-w-7xl sm:mt-32 pt-10">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              A Complete Push Architecture
            </p>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              WebPing provides the full modern stack from the client-side
              Service Worker down to the backend database storage.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex flex-col items-start bg-white/50 dark:bg-[#121212]/80 p-8 rounded-3xl ring-1 ring-zinc-200 dark:ring-white/5 backdrop-blur-sm transition-all duration-300 hover:ring-indigo-500/50 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)] hover:-translate-y-1"
                >
                  <div className="rounded-xl bg-zinc-100 dark:bg-white/5 p-3 ring-1 ring-zinc-200 dark:ring-white/10 mb-6 group-hover:bg-indigo-500/10 transition-colors">
                    <feature.icon
                      className="h-6 w-6 text-zinc-900 dark:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="text-lg font-semibold leading-7 text-zinc-900 dark:text-white">
                    {feature.name}
                  </dt>
                  <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900/10 dark:border-white/10 py-10 z-10 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex border-zinc-900/10 dark:border-white/10 flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} WebPing.
          </p>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Released under the MIT License
          </p>
        </div>
      </footer>
    </div>
  );
}

// Lucide React icons for features
const features = [
  {
    name: "Native Browser Notifications",
    description:
      "Leverage the standard Web Push and Notifications APIs for a seamless, cross-browser experience spanning Chrome, Edge, and Firefox.",
    icon: Bell,
  },
  {
    name: "No Firebase Required",
    description:
      "Uses VAPID authentication for a fully self-hosted push capability. Maintain complete ownership of your data, keys, and infrastructure.",
    icon: ShieldCheck,
  },
  {
    name: "Modern Next.js Stack",
    description:
      "Built safely for the Next.js App Router. Features proper React Server Components abstraction and seamless API routes integration.",
    icon: Zap,
  },
  {
    name: "Robust PostgreSQL Storage",
    description:
      "Persistent subscriptions stored securely in PostgreSQL, interfaced with uncompromising type-safety utilizing the Drizzle ORM.",
    icon: Database,
  },
  {
    name: "Service Worker Powered",
    description:
      "Reliably receive and display notifications in the background even when the browser is closed, all powered by robust service workers.",
    icon: Globe,
  },
  {
    name: "Open Source Foundation",
    description:
      "An open architecture mapped to the permissive MIT License. Fork, modify, and integrate it into your own SaaS with zero hassle.",
    icon: Code2,
  },
];
