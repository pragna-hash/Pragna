import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Subscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate name contains at least one letter
    if (!/[a-zA-Z]/.test(name)) {
      toast.error("Name must contain at least one alphabet character.");
      return;
    }

    toast.success("Thank you for subscribing!");
    setName("");
    setEmail("");
    setInterests([]);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-card-hover overflow-hidden">
        <div className="grid md:grid-cols-5">
          {/* Left panel */}
          <div className="md:col-span-2 bg-primary text-primary-foreground p-8 flex flex-col justify-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Stay Informed.
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Join 5,000+ readers and get the latest in Tech, Culture, and Science delivered straight to your inbox.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-category-ethnic">✓</span> Monthly Digital Edition
              </li>
              <li className="flex items-center gap-2">
                <span className="text-category-ethnic">✓</span> Weekly Newsletters
              </li>
              <li className="flex items-center gap-2">
                <span className="text-category-ethnic">✓</span> Exclusive Interviews
              </li>
            </ul>
          </div>

          {/* Right panel - Form */}
          <div className="md:col-span-3 p-8">
            <h3 className="font-display text-2xl font-bold mb-6 text-card-foreground">
              Newsletter Subscription
            </h3>
            
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
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-card-foreground">
                  Interests
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Technology", "Culture", "Science"].map((interest) => (
                    <label key={interest} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-ring"
                      />
                      <span className="text-sm text-card-foreground">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity shadow-button mt-4"
              >
                Subscribe Now
              </button>

              <p className="text-center text-muted-foreground text-sm">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className="text-info hover:underline text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
