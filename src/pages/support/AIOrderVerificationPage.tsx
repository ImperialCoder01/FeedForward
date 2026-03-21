
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

interface VerificationResult {
  overallCompliance: number;
  categories: {
    name: string;
    score: number;
    recommendations: string[];
  }[];
}

const AIOrderVerificationPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setVerificationResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      // Generate random verification results
      const overallCompliance = Math.floor(Math.random() * 31) + 70; // 70-100%
      
      const categories = [
        {
          name: "Packaging Integrity",
          score: Math.floor(Math.random() * 40) + 60,
          recommendations: overallCompliance < 90 ? [
            "Ensure all seals are properly secured",
            "Use thicker packaging material for fragile items"
          ] : []
        },
        {
          name: "Labeling Compliance",
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: overallCompliance < 90 ? [
            "Include batch number on all packages",
            "Ensure expiry date is clearly visible"
          ] : []
        },
        {
          name: "Food Safety Standards",
          score: Math.floor(Math.random() * 20) + 80,
          recommendations: overallCompliance < 95 ? [
            "Maintain proper temperature control",
            "Ensure handling instructions are included"
          ] : []
        },
        {
          name: "Transportation Readiness",
          score: Math.floor(Math.random() * 25) + 75,
          recommendations: overallCompliance < 85 ? [
            "Use more secure stacking methods",
            "Add cushioning for delicate items"
          ] : []
        }
      ];
      
      setVerificationResult({ overallCompliance, categories });
      setIsAnalyzing(false);
      
      if (overallCompliance >= 90) {
        toast.success("Food packaging meets compliance standards");
      } else {
        toast.warning("Some improvements needed for optimal compliance");
      }
    }, 2000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setVerificationResult(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI Order Quality Verification</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Upload Food Package Image</CardTitle>
            <CardDescription>
              Upload an image of your packaged food to verify compliance with government standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              {selectedImage ? (
                <div className="relative w-full h-64 mb-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected package" 
                    className="w-full h-full object-contain rounded-md" 
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={resetAnalysis}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-md w-full h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload an image</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={analyzeImage} 
              disabled={!selectedImage || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Verify Compliance"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Verification Results</CardTitle>
            <CardDescription>
              {verificationResult 
                ? "Detailed analysis of your packaging compliance" 
                : "Results will appear here after analysis"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex flex-col items-center py-10 space-y-4">
                <div className="animate-pulse">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Analyzing image...</p>
                <Progress value={45} className="w-full" />
              </div>
            ) : verificationResult ? (
              <div className="space-y-6">
                <div className="text-center pb-4">
                  <div className="text-4xl font-bold">
                    {verificationResult.overallCompliance}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Compliance</p>
                  
                  {verificationResult.overallCompliance >= 90 ? (
                    <Alert className="mt-4 bg-green-50 border-green-100">
                      <Check className="h-5 w-5 text-green-500" />
                      <AlertTitle>Good to go!</AlertTitle>
                      <AlertDescription>
                        Your packaging meets government compliance standards
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="mt-4 bg-yellow-50 border-yellow-100">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <AlertTitle>Improvements needed</AlertTitle>
                      <AlertDescription>
                        Some aspects of your packaging need improvement
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Category Breakdown</h3>
                  {verificationResult.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium">{category.score}%</span>
                      </div>
                      <Progress value={category.score} />
                      
                      {category.recommendations.length > 0 && (
                        <div className="pl-2 mt-1 border-l-2 border-yellow-400">
                          <p className="text-xs font-medium text-yellow-700 mb-1">Recommendations:</p>
                          <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                            {category.recommendations.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <Upload className="h-12 w-12 mb-4 text-gray-300" />
                <p>Upload an image and verify to see the analysis results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIOrderVerificationPage;
