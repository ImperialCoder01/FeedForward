import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogIn, AtSign, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!loading && isAuthenticated) {
      toast.success("Welcome back!", {
        description: "You are now logged in."
      });
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await login(email, password);
      
      if (error) {
        toast.error("Login failed", {
          description: error.message || "Please check your credentials and try again."
        });
      }
      // If no error, the useEffect will handle navigation
    } catch (error: any) {
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-12 mx-auto">
      <Card className="border-2 animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">{t('auth.welcomeBack')}</CardTitle>
          <CardDescription className="text-center">
            {t('auth.enterCredentials')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    placeholder="name@example.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required 
                  />
                </div>
              </div>
              <Button className="w-full btn-gradient" type="submit" disabled={isLoading || loading}>
                {isLoading ? (
                  <><span className="mr-2">{t('auth.loggingIn')}</span><span className="animate-pulse">...</span></>
                ) : (
                  <><LogIn className="mr-2 h-4 w-4" /> {t('auth.signIn')}</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {t('auth.noAccount')}{" "}
            <Link to="/signup" className="text-primary hover:underline">
              {t('auth.signUp')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
