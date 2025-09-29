import { useState } from "react";
import { Filter, Grid, List, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MovieCard from "@/components/MovieCard";

// Import generated movie posters
import darkKnightPoster from "@/assets/dark-knight-poster.jpg";
import inceptionPoster from "@/assets/inception-poster.jpg";
import interstellarPoster from "@/assets/interstellar-poster.jpg";
import avengersPoster from "@/assets/avengers-poster.jpg";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Mock movie data with generated posters
  const movies = [
    {
      id: "1",
      title: "The Dark Knight",
      poster: darkKnightPoster,
      rating: 9.0,
      year: 2008,
      duration: "2h 32m",
      genre: "Action",
      type: "movie" as const,
    },
    {
      id: "2", 
      title: "Inception",
      poster: inceptionPoster,
      rating: 8.8,
      year: 2010,
      duration: "2h 28m",
      genre: "Sci-Fi",
      type: "movie" as const,
    },
    {
      id: "3",
      title: "Interstellar", 
      poster: interstellarPoster,
      rating: 8.6,
      year: 2014,
      duration: "2h 49m",
      genre: "Sci-Fi",
      type: "movie" as const,
    },
    {
      id: "4",
      title: "Avengers: Endgame",
      poster: avengersPoster,
      rating: 8.4,
      year: 2019,
      duration: "3h 1m",
      genre: "Action",
      type: "movie" as const,
    },
  ];

  const categories = [
    { name: "Action", count: 245 },
    { name: "Sci-Fi", count: 189 },
    { name: "Drama", count: 156 },
    { name: "Comedy", count: 134 },
    { name: "Horror", count: 98 },
    { name: "Romance", count: 87 },
  ];

  const filteredMovies = selectedGenre === "all" 
    ? movies 
    : movies.filter(movie => movie.genre.toLowerCase() === selectedGenre);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Browse by Genre</h2>
            <Button variant="ghost" className="text-primary">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer p-6 bg-gradient-card border border-border/50 rounded-lg hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                onClick={() => setSelectedGenre(category.name.toLowerCase())}
              >
                <h3 className="font-semibold text-center group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {category.count} titles
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Latest Movies</h2>
              <p className="text-muted-foreground">Discover the newest releases and trending content</p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-[180px] bg-muted/50 border-border/50">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center bg-muted/50 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "hero" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "hero" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Movie Grid */}
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
              : "space-y-4"
          }>
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No movies found in this genre
              </p>
              <Button variant="cinema" onClick={() => setSelectedGenre("all")}>
                Show All Movies
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-xl font-bold">MovieHub</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your ultimate destination for movies and TV series. Discover, watch, and enjoy.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Browse</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Movies</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">TV Series</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Genres</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Top Rated</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">Twitter</Button>
                <Button variant="ghost" size="sm">Instagram</Button>
                <Button variant="ghost" size="sm">YouTube</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MovieHub. All rights reserved. Built for entertainment purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;