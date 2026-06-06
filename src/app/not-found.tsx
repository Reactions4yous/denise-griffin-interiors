import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="container-wide text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="display text-4xl text-ink sm:text-5xl">
          This page took a different path.
        </h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist — but there&apos;s
          plenty of beautiful work to explore.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
