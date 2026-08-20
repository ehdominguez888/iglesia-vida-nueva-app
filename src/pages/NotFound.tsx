import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-20">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Página no encontrada
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;