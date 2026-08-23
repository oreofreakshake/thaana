import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        The page you requested is not part of the Thaana docs.
      </p>
      <Link
        to="/"
        className="mt-7 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
      >
        Return home
      </Link>
    </main>
  )
}
