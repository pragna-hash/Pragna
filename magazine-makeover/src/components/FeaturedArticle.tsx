import { Link } from "react-router-dom";

interface FeaturedArticleProps {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  link: string;
}

const FeaturedArticle = ({ image, badge, title, subtitle, link }: FeaturedArticleProps) => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <img
        src={image}
        alt={title}
        className="w-full max-w-4xl mx-auto rounded-lg shadow-card-hover mb-6 object-cover max-h-[500px]"
      />
      <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded uppercase tracking-wide">
        {badge}
      </span>
      <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-foreground leading-tight">
        {title}
      </h2>
      <p className="text-lg text-muted-foreground mt-3">
        {subtitle}
      </p>
      <Link
        to={link}
        className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 font-medium rounded hover:opacity-90 transition-opacity shadow-button"
      >
        Read Full Article
      </Link>
    </div>
  );
};

export default FeaturedArticle;
