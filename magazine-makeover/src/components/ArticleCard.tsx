import { Link } from "react-router-dom";

interface ArticleCardProps {
  image: string;
  category: string;
  categoryColor: "culturals" | "ethnic" | "science" | "tech";
  title: string;
  description: string;
  link: string;
}

const categoryColorMap = {
  culturals: "text-category-culturals",
  ethnic: "text-category-ethnic",
  science: "text-category-science",
  tech: "text-category-tech",
};

const ArticleCard = ({
  image,
  category,
  categoryColor,
  title,
  description,
  link,
}: ArticleCardProps) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full group">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className={`text-sm font-bold uppercase ${categoryColorMap[categoryColor]}`}>
          {category}
        </span>
        <h3 className="font-display font-bold text-lg mt-1 text-card-foreground leading-tight">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mt-2 flex-1">
          {description}
        </p>
        <div className="mt-4">
          <Link
            to={link}
            className="inline-block w-full text-center py-2 px-4 border border-foreground text-foreground text-sm font-medium rounded hover:bg-foreground hover:text-background transition-colors"
          >
            Read Full Article
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
