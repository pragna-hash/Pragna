import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "TRENDING", path: "/trending" },
  { name: "TECHNOLOGY", path: "/technology" },
  { name: "DESIGN", path: "/design" },
  { name: "STARTUPS", path: "/startups" },
  { name: "FROM THE EDITOR", path: "/editor" },
  { name: "CONTACT", path: "/contact" },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-background">
      {/* Top bar */}
      <div className="flex justify-end items-center gap-2 px-4 py-2 text-sm">
        <Link 
          to="/subscribe" 
          className="text-muted-foreground font-semibold hover:text-foreground transition-colors"
        >
          Subscribe
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link 
          to="/login" 
          className="text-muted-foreground font-semibold hover:text-foreground transition-colors"
        >
          Login
        </Link>
      </div>

      {/* Logo section */}
      <div className="flex flex-col items-center py-6">
        <div className="flex items-center gap-2 mb-2">
          <svg 
            className="w-10 h-10 text-info" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="7" cy="7" r="1.5" />
            <circle cx="17" cy="7" r="1.5" />
            <circle cx="7" cy="17" r="1.5" />
            <circle cx="17" cy="17" r="1.5" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-wide text-foreground">
          PRAGNA
        </h1>
        <p className="text-sm text-muted-foreground tracking-widest mt-1">
          TECH | CULTURE | LIFESTYLE | FUTURE
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-nav border-y border-nav-border">
        <div className="container-magazine">
          <ul className="flex flex-wrap justify-center gap-1 md:gap-6 py-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-xs md:text-sm font-medium tracking-wide px-2 py-1 transition-colors ${
                    location.pathname === item.path
                      ? "text-info"
                      : "text-foreground hover:text-info"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
