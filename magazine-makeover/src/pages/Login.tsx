import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name contains at least one letter
    if (!/[a-zA-Z]/.test(name)) {
      toast.error("Name must contain at least one alphabet character.");
      return;
    }

    toast.success("Login successful!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-info/10 via-background to-category-tech/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-card-hover p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold tracking-wide text-info mb-2">
            PRAGNA
          </h1>
          <h2 className="font-display text-xl text-card-foreground">
            Login to your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-card-foreground">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-info"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-card-foreground">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-info"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-card-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-info"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-input text-info focus:ring-info"
            />
            <span className="text-sm text-card-foreground">Remember me</span>
          </label>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-button"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/subscribe" className="text-info hover:underline font-medium">
            Subscribe Now
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link to="/" className="text-info hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
