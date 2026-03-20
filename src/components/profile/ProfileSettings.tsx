
import React, { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Mail,
  Shield,
  Key
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileSettings = () => {
  const { profile, updateProfile, loading } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    notifications: true,
    marketplaceAlerts: true,
    emailUpdates: false
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (profile?.preferences) {
      setPreferences({
        notifications: profile.preferences.notifications !== false,
        marketplaceAlerts: profile.preferences.marketplaceAlerts !== false,
        emailUpdates: profile.preferences.emailUpdates === true
      });
    }
  }, [profile]);

  const handleToggle = async (setting: string) => {
    const newPreferences = {
      ...preferences,
      [setting]: !preferences[setting as keyof typeof preferences]
    };
    
    setPreferences(newPreferences);
    
    try {
      await updateProfile({
        preferences: {
          ...profile?.preferences,
          ...newPreferences
        }
      });
    } catch (error) {
      console.error(`Failed to update ${setting} preference:`, error);
      // Revert UI state if the update fails
      setPreferences(preferences);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setPasswordError('');
  };

  const handlePasswordUpdate = async () => {
    // Clear any previous errors
    setPasswordError('');
    
    // Validate password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    // In a real app, we would make an API call to update the password
    // This is just a simulation for this example
    toast.success("Password updated successfully");
    
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success("Successfully logged out");
  };

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notification Settings
          </CardTitle>
          <CardDescription>
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">App notifications</h4>
              <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
            </div>
            <Switch 
              checked={preferences.notifications} 
              onCheckedChange={() => handleToggle('notifications')}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Marketplace alerts</h4>
              <p className="text-sm text-muted-foreground">Get notified about marketplace updates</p>
            </div>
            <Switch 
              checked={preferences.marketplaceAlerts} 
              onCheckedChange={() => handleToggle('marketplaceAlerts')}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email updates</h4>
              <p className="text-sm text-muted-foreground">Receive email notifications</p>
            </div>
            <Switch 
              checked={preferences.emailUpdates} 
              onCheckedChange={() => handleToggle('emailUpdates')}
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" /> Account Security
          </CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Key className="mr-2 h-4 w-4" /> Change Password
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change your password</DialogTitle>
                <DialogDescription>
                  Make sure to use a strong, unique password that you don't use elsewhere.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 py-3">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    name="currentPassword" 
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    name="newPassword" 
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                </div>
              </form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handlePasswordUpdate}>Update Password</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="pt-4">
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" /> Privacy Settings
          </CardTitle>
          <CardDescription>
            Control your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Public profile</h4>
              <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Analytics collection</h4>
              <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve our service</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground mb-2">
            Your data is stored securely and we will never share it without your permission.
          </p>
          <Button variant="link" className="p-0 h-auto">View Privacy Policy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSettings;
