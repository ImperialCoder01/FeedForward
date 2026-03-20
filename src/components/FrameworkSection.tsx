import React from 'react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingDown,
  Coins,
  ArrowUpDown,
  CheckCircle,
  Users,
  Leaf,
  Utensils,
  Building2,
  Package,
  Cloud,
  Handshake,
  Rocket,
  Scale,
  UserCircle
} from "lucide-react";

interface FrameworkCategory {
  title: string;
  items: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
}

const frameworkData: FrameworkCategory[] = [
  {
    title: "Sustainability Assessment",
    items: [
      {
        icon: DollarSign,
        title: "Financial Sustainability",
        description: "Long-term financial viability through innovative revenue streams and cost management"
      },
      {
        icon: TrendingDown,
        title: "Low Operational Costs",
        description: "Optimized operational efficiency to minimize running costs"
      },
      {
        icon: Coins,
        title: "Token Economics",
        description: "Sustainable token model incentivizing participation and growth"
      },
      {
        icon: ArrowUpDown,
        title: "Scaling Efficiency",
        description: "Infrastructure designed for seamless scaling with demand"
      }
    ]
  },
  {
    title: "Feasibility Analysis",
    items: [
      {
        icon: CheckCircle,
        title: "Technical Feasibility",
        description: "Robust technical architecture ensuring reliable platform operation"
      },
      {
        icon: Scale,
        title: "Market Feasibility",
        description: "Strong market demand and sustainable business model"
      },
      {
        icon: CheckCircle,
        title: "Operational Feasibility",
        description: "Streamlined operations for efficient resource utilization"
      }
    ]
  },
  {
    title: "Impact Analysis",
    items: [
      {
        icon: Users,
        title: "Social Impact",
        description: "Creating positive change in communities through food accessibility"
      },
      {
        icon: TrendingDown,
        title: "Economic Impact",
        description: "Contributing to local economic growth and development"
      },
      {
        icon: Leaf,
        title: "Environmental Impact",
        description: "Reducing food waste and environmental footprint"
      }
    ]
  },
  {
    title: "Integration with SDGs",
    items: [
      {
        icon: Utensils,
        title: "SDG 2: Zero Hunger",
        description: "Working towards eliminating hunger in communities"
      },
      {
        icon: Building2,
        title: "SDG 11: Sustainable Cities",
        description: "Contributing to sustainable urban development"
      },
      {
        icon: Package,
        title: "SDG 12: Responsible Consumption",
        description: "Promoting responsible food consumption patterns"
      },
      {
        icon: Cloud,
        title: "SDG 13: Climate Action",
        description: "Reducing carbon footprint through food waste prevention"
      },
      {
        icon: Handshake,
        title: "SDG 17: Partnerships",
        description: "Building strategic partnerships for sustainable development"
      }
    ]
  },
  {
    title: "Critical Success Factors",
    items: [
      {
        icon: UserCircle,
        title: "Early Adopter Engagement",
        description: "Building a strong initial user base and community"
      },
      {
        icon: CheckCircle,
        title: "Trust Establishment",
        description: "Creating a reliable and transparent platform"
      },
      {
        icon: Rocket,
        title: "Technology Implementation",
        description: "Leveraging cutting-edge technology for optimal performance"
      },
      {
        icon: Scale,
        title: "Regulatory Navigation",
        description: "Ensuring compliance with food safety and distribution regulations"
      },
      {
        icon: Users,
        title: "Community Ownership",
        description: "Empowering communities through participatory governance"
      }
    ]
  }
];

const FrameworkSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Project Framework</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          A comprehensive approach to sustainable food distribution and community impact
        </p>

        <div className="grid gap-8">
          {frameworkData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold">{category.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, index) => (
                  <HoverCard key={item.title}>
                    <HoverCardTrigger asChild>
                      <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-6 flex items-start space-x-4">
                          <div className="shrink-0">
                            <item.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-4 w-4" />
                          <h4 className="text-sm font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;
