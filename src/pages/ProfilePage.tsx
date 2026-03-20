
import React, { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Edit, MapPin, Globe, FileText, User2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ProfileSettings from '@/components/profile/ProfileSettings';
import FeedCoinStats from '@/components/profile/FeedCoinStats';

const ProfilePage = () => {
  const { profile, loading, error, updateProfile, uploading, uploadAvatar } = useProfile();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: '',
    location: '',
    website: ''
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Discard changes
      setIsEditing(false);
    } else {
      // Start editing with current values
      setFormData({
        full_name: profile?.full_name || '',
        username: profile?.username || '',
        bio: profile?.bio || '',
        location: profile?.location || '',
        website: profile?.website || ''
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      
      if (!file.type.includes('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      
      await uploadAvatar(file);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl py-8 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="h-6 w-24 mt-3" />
              </div>
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="container max-w-6xl py-8 mx-auto">
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="feedcoin">FeedCoin & Impact</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">My Profile</CardTitle>
              <Button 
                variant={isEditing ? "outline" : "default"} 
                size="sm" 
                onClick={handleEditToggle}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-2 border-border">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="text-3xl bg-primary/10">{initials}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <label htmlFor="avatar-upload" className="cursor-pointer text-white text-sm p-2 w-full h-full flex items-center justify-center">
                          <Edit className="h-6 w-6" />
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleAvatarChange}
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 font-medium text-lg">
                    {profile?.username || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="full_name">Full Name</label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Your username"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="bio">Bio</label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio || ''}
                          onChange={handleChange}
                          placeholder="Tell us about yourself"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location || ''}
                            onChange={handleChange}
                            placeholder="Your location"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="website">Website</label>
                          <Input
                            id="website"
                            name="website"
                            value={formData.website || ''}
                            onChange={handleChange}
                            placeholder="Your website"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button onClick={handleSave}>Save Profile</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold">{profile?.full_name || 'No name set'}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        {profile?.bio && (
                          <div className="flex items-start gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-sm">{profile.bio}</p>
                          </div>
                        )}
                        
                        {profile?.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">{profile.location}</p>
                          </div>
                        )}
                        
                        {profile?.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {profile.website}
                            </a>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <User2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">Member since {new Date(profile?.created_at || '').toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedcoin">
          <FeedCoinStats />
        </TabsContent>
        
        <TabsContent value="settings">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
