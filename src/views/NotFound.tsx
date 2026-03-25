"use client";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">404</h1>
        <p className="mb-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Page not found
        </p>
        <a href="/" className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
