import { useState } from "react";
import { Plus, Edit, Trash2, Search, Filter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("movies");

  // Mock data for demonstration
  const movies = [
    { id: 1, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, status: "Published" },
    { id: 2, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, status: "Published" },
    { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, status: "Draft" },
  ];

  const series = [
    { id: 1, title: "Breaking Bad", year: 2008, genre: "Drama", rating: 9.5, status: "Published", seasons: 5 },
    { id: 2, title: "Game of Thrones", year: 2011, genre: "Fantasy", rating: 9.3, status: "Published", seasons: 8 },
    { id: 3, title: "Stranger Things", year: 2016, genre: "Sci-Fi", rating: 8.7, status: "Published", seasons: 4 },
  ];

  const stats = [
    { title: "Total Movies", value: "1,284", icon: "🎬" },
    { title: "Total Series", value: "567", icon: "📺" },
    { title: "Total Users", value: "45,123", icon: "👥" },
    { title: "Monthly Views", value: "2.4M", icon: "👁️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your movie and series content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted/50 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "movies" ? "hero" : "ghost"}
            onClick={() => setActiveTab("movies")}
            size="sm"
          >
            Movies
          </Button>
          <Button
            variant={activeTab === "series" ? "hero" : "ghost"}
            onClick={() => setActiveTab("series")}
            size="sm"
          >
            TV Series
          </Button>
          <Button
            variant={activeTab === "users" ? "hero" : "ghost"}
            onClick={() => setActiveTab("users")}
            size="sm"
          >
            Users
          </Button>
        </div>

        {/* Content Management */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {activeTab === "movies" ? "Movies" : activeTab === "series" ? "TV Series" : "Users"} Management
                </CardTitle>
                <CardDescription>
                  Manage your {activeTab} content and settings
                </CardDescription>
              </div>
              <Button variant="hero">
                <Plus className="w-4 h-4" />
                Add {activeTab.slice(0, -1)}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  className="pl-10 bg-muted/50 border-border/50"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px] bg-muted/50 border-border/50">
                  <SelectValue placeholder="Filter by genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="cinema">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Data Table */}
            <div className="rounded-md border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Title</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Rating</TableHead>
                    {activeTab === "series" && <TableHead>Seasons</TableHead>}
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(activeTab === "movies" ? movies : series).map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>{item.genre}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          ⭐ {item.rating}
                        </Badge>
                      </TableCell>
                      {activeTab === "series" && (
                        <TableCell>{("seasons" in item ? (item as any).seasons : "-") as React.ReactNode}</TableCell>
                      )}
                      <TableCell>
                        <Badge
                          variant={item.status === "Published" ? "default" : "secondary"}
                          className={item.status === "Published" ? "bg-green-600" : ""}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;