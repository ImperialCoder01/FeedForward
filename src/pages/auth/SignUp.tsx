
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Lock, AtSign } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "individual",
    agreeTerms: false,
  });

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, userType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formState.password !== formState.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please check your passwords and try again."
      });
      return;
    }
    
    if (!formState.agreeTerms) {
      toast.error("Terms and conditions required", {
        description: "Please agree to the terms and conditions to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signup(formState.email, formState.password, {
        name: formState.name,
        userType: formState.userType,
      });
      
      if (error) {
        toast.error("Sign up failed", {
          description: error.message || "Please check your information and try again."
        });
      } else {
        toast.success("Account created successfully!", {
          description: "Welcome to FeedForward! Please check your email to verify your account."
        });
        // If email confirmation is required, redirect to login
        // Otherwise, the useEffect will redirect to home
        if (!isAuthenticated) {
          navigate("/login", { replace: true });
        }
      }
    } catch (error: any) {
      toast.error("Sign up failed", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, from]);

  return (
    <div className="container max-w-md py-12 mx-auto">
      <Card className="border-2 animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">{t('auth.createAccount')}</CardTitle>
          <CardDescription className="text-center">
            {t('auth.joinFeedForward')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('auth.fullName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="John Doe" 
                    value={formState.name}
                    onChange={handleChange}
                    className="pl-10"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    name="email"
                    placeholder="name@example.com" 
                    type="email" 
                    value={formState.email}
                    onChange={handleChange}
                    className="pl-10"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    value={formState.password}
                    onChange={handleChange}
                    className="pl-10"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type="password" 
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('auth.iAmA')}</Label>
                <RadioGroup 
                  value={formState.userType} 
                  onValueChange={handleRadioChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">{t('auth.individual')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="organization" id="organization" />
                    <Label htmlFor="organization">{t('auth.organization')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formState.agreeTerms}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  {t('auth.iAgreeTo')}{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    {t('auth.termsAndConditions')}
                  </Link>
                </Label>
              </div>

              <Button className="w-full btn-gradient" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <><span className="mr-2">{t('auth.creatingAccount')}</span><span className="animate-pulse">...</span></>
                ) : (
                  t('auth.createAccount')
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {t('auth.alreadyHaveAccount')}{" "}
            <Link to="/login" className="text-primary hover:underline">
              {t('auth.signIn')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
