
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser, Session, AuthError } from '@supabase/supabase-js';
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name?: string;
  userType?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  session: null,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: async () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: User | null;
    session: Session | null;
    loading: boolean;
  }>({
    isAuthenticated: false,
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        updateAuthState(session);
        toast.success("Successfully signed in!");
      } else if (event === 'SIGNED_OUT') {
        setAuthState({
          isAuthenticated: false,
          user: null,
          session: null,
          loading: false,
        });
        toast.success("Successfully signed out!");
        // Removed direct navigation to avoid the router issue
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateAuthState(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateAuthState = (session: Session | null) => {
    if (session?.user) {
      const user: User = {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
        userType: session.user.user_metadata?.user_type || 'individual',
      };
      
      setAuthState({
        isAuthenticated: true,
        user,
        session,
        loading: false,
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        user: null,
        session: null,
        loading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) return { error };
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signup = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.name,
            user_type: userData.userType,
          },
        }
      });

      if (error) {
        console.error('[Signup Error]', {
          message: error.message,
          status: error.status,
          name: error.name,
        });
        // Provide a more helpful message for database errors
        if (error.message?.includes('Database error')) {
          const enhancedError = {
            ...error,
            message: 'Database error saving new user. Please contact support or try again later.',
          };
          return { error: enhancedError as AuthError };
        }
        return { error };
      }
      return { error: null };
    } catch (error: any) {
      console.error('[Signup Unexpected Error]', error);
      return { error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        session: authState.session,
        login,
        signup,
        logout,
        loading: authState.loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
