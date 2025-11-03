import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { supabase } from "@/integrations/supabase/client";

type Genre = {
  id: string;
  name: string;
};

const Index = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchMedia = async () => {
      const { data: movies, error: moviesError } = await supabase.from("movies").select("*, genre:genres(name)");
      if (moviesError) console.error("Error fetching movies:", moviesError.message);

      const { data: series, error: seriesError } = await supabase.from("series").select("*, genre:genres(name)");
      if (seriesError) console.error("Error fetching series:", seriesError.message);

      const formattedMovies = movies?.map(movie => ({ ...movie, poster: movie.poster_url, type: 'movie' })) || [];
      const formattedSeries = series?.map(s => ({ ...s, poster: s.poster_url, type: 'series' })) || [];

      setMedia([...formattedMovies, ...formattedSeries]);
    };

    const fetchGenres = async () => {
      const { data, error } = await supabase.from("genres").select("*").order("name");
      if (error) {
        console.error("Error fetching genres:", error.message);
      } else {
        setGenres(data || []);
      }
    };

    fetchMedia();
    fetchGenres();
  }, []);

  const handleGenreClick = (genreName: string | null) => {
    setSelectedGenre(genreName);
    setCurrentPage(1); // Reset to first page when genre changes
  };

  const filteredMedia = selectedGenre
    ? media.filter((item) => item.genre.name === selectedGenre)
    : media;

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginatedMedia = filteredMedia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="flex-grow">
        {/* Genres Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Button
                onClick={() => handleGenreClick(null)}
                variant={selectedGenre === null ? "default" : "outline"}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg"
              >
                All
              </Button>
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.name)}
                  variant={selectedGenre === genre.name ? "default" : "outline"}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg"
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Movies & Web Series Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {paginatedMedia.map((item) => (
                <MovieCard key={item.id} {...item} genre={item.genre.name} />
              ))}
            </div>

            {filteredMedia.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No movies or web series found for this genre.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                  <Pagination>
                      <PaginationContent>
                          <PaginationItem>
                              <PaginationPrevious href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                          </PaginationItem>
                          {[...Array(totalPages)].map((_, i) => (
                              <PaginationItem key={i}>
                                  <PaginationLink href="#" isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                                      {i + 1}
                                  </PaginationLink>
                              </PaginationItem>
                          ))}
                          <PaginationItem>
                              <PaginationNext href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                          </PaginationItem>
                      </PaginationContent>
                  </Pagination>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
