import { Button } from "@/components/ui/button";
import { Bell, Home, Film, Tv, List, Settings, PlusCircle } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, onPost }) => {
  const navItems = [
    { name: "Dashboard", key: "dashboard", icon: Home },
    { name: "Movies", key: "movies", icon: Film },
    { name: "TV Series", key: "series", icon: Tv },
    { name: "Genres", key: "genres", icon: List },
    { name: "Notifications", key: "notifications", icon: Bell },
    { name: "Settings", key: "settings", icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gradient-card border-r border-border/50 p-4 space-y-2">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="text-xl font-bold">Admin Panel</span>
      </div>
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant={activeTab === item.key ? "hero" : "ghost"}
          onClick={() => setActiveTab(item.key)}
          className="w-full justify-start"
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.name}
        </Button>
      ))}
      <div className="pt-4 mt-4 border-t border-border/50 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => onPost("movie")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Post Movie
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => onPost("series")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Post Series
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
