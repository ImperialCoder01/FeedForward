
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-muted">
      <div className="text-center px-4 animate-fade-in">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-2xl font-medium mb-4">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="btn-gradient">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/map">Browse Food Map</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
