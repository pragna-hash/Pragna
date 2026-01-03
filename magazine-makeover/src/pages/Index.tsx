import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleCard from "@/components/ArticleCard";

import conferenceImg from "@/assets/conference.jpeg";
import dgpImg from "@/assets/dgp.jpeg";
import ethnicImg from "@/assets/ethnic-attire.jpeg";
import marsImg from "@/assets/mars.jpeg";

const articles = [
  {
    image: dgpImg,
    category: "CULTURALS",
    categoryColor: "culturals" as const,
    title: "Freshers day held at VIET in 2025",
    description: "Inaugurated by former DGP Nanduri Sambasiva Rao",
    link: "/article/culturals",
  },
  {
    image: ethnicImg,
    category: "ETHNIC ATTIRE",
    categoryColor: "ethnic" as const,
    title: "VIET has Reflected Its Personality",
    description: "Students across the college have adopted traditional dress codes.",
    link: "/article/ethnic",
  },
  {
    image: marsImg,
    category: "SCIENCE",
    categoryColor: "science" as const,
    title: "Mars Mission: The Final Countdown",
    description: "Everything you need to know about the upcoming lunar base.",
    link: "/article/science",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container-magazine py-10">
        <FeaturedArticle
          image={conferenceImg}
          badge="Editor's Pick"
          title="International conference on AI, LLM, and Bioinformatics"
          subtitle="December 27th and 28th Hosted by VIET & IBCB Visakhapatnam"
          link="/article/conference"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div 
              key={article.link}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <ArticleCard {...article} />
            </div>
          ))}
        </div>

        <hr className="my-12 border-border" />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
