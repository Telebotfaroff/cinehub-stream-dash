import { Play, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-cinema.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Cinema Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl space-y-6">
          <Badge className="bg-primary/10 text-primary border-primary/30 backdrop-blur-sm">
            <TrendingUp className="w-3 h-3 mr-1" />
            #1 Trending Now
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Movie
            </span>
            <span className="text-foreground"> Universe</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Discover thousands of movies and TV series. From the latest blockbusters to hidden gems, 
            find your next favorite entertainment.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">8.5</span>
              <span>IMDb Rating</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span>2024 • Action • 2h 28m</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="hero" size="lg" className="text-base px-8">
              <Play className="w-5 h-5 fill-current mr-2" />
              Watch Now
            </Button>
            
            <Button variant="cinema" size="lg" className="text-base px-8">
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse delay-300" />
    </section>
  );
};

export default HeroSection;