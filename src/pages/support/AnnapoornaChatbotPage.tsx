
import React from "react";
import { Card } from "@/components/ui/card";

const AnnapoornaChatbotPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Annapoorna Chatbot</h1>
      <p className="text-muted-foreground mb-6">
        Our AI assistant can help answer questions about food donation, volunteering, and more.
      </p>
      
      <Card className="w-full h-[calc(100vh-220px)] overflow-hidden">
        <iframe 
          src="https://bot.orimon.ai/?tenantId=8593c1f7-3314-406f-b3ed-9e90f2456eed&fullScreenBot=true" 
          height="100%" 
          width="100%" 
          frameBorder="0" 
          title="Annapoorna Chatbot"
          className="w-full h-full"
        />
      </Card>
    </div>
  );
};

export default AnnapoornaChatbotPage;
