export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-8 text-[#17211b]">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-between rounded-lg border border-[#dfe5dc] bg-white p-8 shadow-sm">
        <nav className="flex items-center justify-between">
          <div className="text-lg font-semibold">PassportKit</div>
          <div className="rounded-full bg-[#eef6ef] px-3 py-1 text-sm font-medium text-[#237047]">
            Next.js + Vercel ready
          </div>
        </nav>

        <div className="grid gap-10 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-[#2455a4]">
              Validation prototype
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight">
              QR product passports for small fashion brands.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526057]">
              We have the project scaffolded. Next we will turn this into the
              PassportKit landing page, dashboard, wizard, and public passport
              flow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-md bg-[#17211b] px-5 py-3 text-sm font-semibold text-white"
                href="/dashboard"
              >
                Build dashboard next
              </a>
              <a
                className="rounded-md border border-[#cfd8cf] px-5 py-3 text-sm font-semibold text-[#17211b]"
                href="/p/linen-overshirt"
              >
                Preview passport route
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-[#dfe5dc] bg-[#fbfcfa] p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">Setup checklist</span>
              <span className="rounded-full bg-[#eef6ef] px-2 py-1 text-xs font-semibold text-[#237047]">
                3/5
              </span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                "Next.js App Router scaffolded",
                "Tailwind CSS installed",
                "Git repository initialized",
                "Connect GitHub remote",
                "Import project into Vercel",
              ].map((item, index) => (
                <div
                  className="flex items-center gap-3 rounded-md border border-[#e5ebe2] bg-white px-3 py-3"
                  key={item}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      index < 3 ? "bg-[#2f9d62]" : "bg-[#d39b2a]"
                    }`}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-[#6b746d]">
          Readiness support, not legal advice.
        </p>
      </section>
    </main>
  );
}
