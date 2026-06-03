/**
 * Debug script to test Supabase authentication
 * 
 * Usage: Add this to browser console or import in a test component
 */

// Test Supabase connection
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('Testing Supabase connection...');
    
    const response = await fetch('https://your_supabase_project_id.supabase.co/rest/v1/', {
      headers: {
        'apikey': 'your_supabase_anon_key',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      console.log('Supabase connection successful!');
      return true;
    } else {
      console.error('Supabase connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}

// Test signup
export async function testSignup(email: string, password: string, name: string): Promise<{ success: boolean; error?: unknown }> {
  try {
    console.log('Testing signup...', { email, name });
    
    const response = await fetch('https://your_supabase_project_id.supabase.co/auth/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'your_supabase_anon_key',
      },
      body: JSON.stringify({
        email,
        password,
        data: {
          full_name: name,
          user_type: 'individual'
        }
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Signup successful!', data);
      return { success: true };
    } else {
      console.error('Signup failed:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error };
  }
}

// Test login
export async function testLogin(email: string, password: string): Promise<{ success: boolean; error?: unknown }> {
  try {
    console.log('Testing login...', { email });
    
    const response = await fetch('https://your_supabase_project_id.supabase.co/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'your_supabase_anon_key',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Login successful!', data);
      return { success: true };
    } else {
      console.error('Login failed:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error };
  }
}

// Run all tests
export async function runAllTests(): Promise<void> {
  console.log('Starting authentication tests...\n');
  
  await testSupabaseConnection();
  
  console.log('\n');
  await testSignup('test' + Date.now() + '@example.com', 'testpass123', 'Test User');
  
  console.log('\nTests complete!');
}

// Make available globally for testing
interface TestAuthWindow {
  testAuth?: {
    testSupabaseConnection: typeof testSupabaseConnection;
    testSignup: typeof testSignup;
    testLogin: typeof testLogin;
    runAllTests: typeof runAllTests;
  };
}

if (typeof window !== 'undefined') {
  (window as unknown as TestAuthWindow).testAuth = {
    testSupabaseConnection,
    testSignup,
    testLogin,
    runAllTests
  };
}
