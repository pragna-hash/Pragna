import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import conferenceImg from "@/assets/conference.jpeg";
import dgpImg from "@/assets/dgp.jpeg";
import ethnicImg from "@/assets/ethnic-attire.jpeg";
import marsImg from "@/assets/mars.jpeg";

interface ArticleData {
  badge: string;
  badgeColor: string;
  title: string;
  meta: string;
  image: string;
  content: React.ReactNode;
}

const articlesData: Record<string, ArticleData> = {
  conference: {
    badge: "Technology & Education",
    badgeColor: "bg-category-tech text-white",
    title: "International Conference on AI, LLM, and Bioinformatics",
    meta: "By PRAGNA Editorial Team | December 25, 2025 | 4 Min Read",
    image: conferenceImg,
    content: (
      <>
        <p>
          Visakha Institute of Engineering And Technology and IBCB Visakhapatnam are proudly hosting a two-day
          International Conference starting December 27th. This prestigious event focuses on the intersection of
          Artificial Intelligence (AI), Large Language Models (LLM), and the rapidly evolving field of
          Bioinformatics.
        </p>
        <p>
          Experts from across the globe are expected to gather in Visakhapatnam to share insights into how
          computational power is redefining biological research and data analysis. The conference serves as a
          platform for students and researchers to showcase their work and interact with industry leaders.
        </p>
        <h3>Why AI and Bioinformatics?</h3>
        <p>
          The synergy between AI and Bioinformatics is unlocking new possibilities in drug discovery, personalized
          medicine, and genomic research. With the rise of LLMs, researchers can now process vast amounts of
          medical literature and data more efficiently than ever before.
        </p>
        <p>
          Participants can look forward to keynote sessions, paper presentations, and interactive workshops over
          the two days. The event marks a significant milestone for VIET in promoting advanced technical education
          and global collaboration.
        </p>
      </>
    ),
  },
  culturals: {
    badge: "CULTURALS",
    badgeColor: "bg-category-culturals text-white",
    title: "Freshers Day Celebration at VIET",
    meta: "Inaugurated by former DGP Nanduri Sambasiva Rao",
    image: dgpImg,
    content: (
      <>
        <p>
          Visakha Institute of Engineering and Technology (VIET) celebrated its annual Freshers Day with great
          enthusiasm. The event was graced by the former DGP, who shared valuable life lessons with the young
          students.
        </p>
        <p>
          The celebration featured cultural performances, interactive sessions, and a grand welcome for the new batch
          of engineering students. The event emphasized the importance of discipline, dedication, and continuous learning.
        </p>
      </>
    ),
  },
  ethnic: {
    badge: "Lifestyle & Tradition",
    badgeColor: "bg-category-ethnic text-white",
    title: "VIET has Reflected Its Personality Through Tradition",
    meta: "By PRAGNA Cultural Desk | Published: Dec 2025",
    image: ethnicImg,
    content: (
      <>
        <p>
          Tradition is not just about the past; it's about carrying our identity into the future. Recently, the
          students across Visakha Institute of Engineering and Technology (VIET) showcased this beautifully by
          adopting traditional dress codes.
        </p>
        <p>
          The campus was transformed into a colorful celebration of heritage. From elegant sarees to traditional
          weaves, every student reflected a sense of pride in their roots. Faculty members noted that such
          initiatives help in building a strong personality and cultural awareness among young engineers.
        </p>
        <p>
          Events like these prove that while we excel in modern technology like AI and Science, our connection to
          our culture remains our greatest strength.
        </p>
      </>
    ),
  },
  science: {
    badge: "SCIENCE",
    badgeColor: "bg-category-science text-white",
    title: "Mars Mission: The Final Countdown",
    meta: "By Space Exploration Desk | Published: Dec 2025",
    image: marsImg,
    content: (
      <>
        <p>
          The dream of becoming a multi-planetary species is closer than ever. Space agencies
          across the world are entering the final countdown for the most ambitious Mars mission
          yet. This mission aims to not only land humans on the Red Planet but also to establish a
          sustainable habitat.
        </p>
        <h3>The Lunar Base Connection</h3>
        <p>
          Before we reach Mars, the moon serves as a vital stepping stone. The upcoming lunar base
          will act as a refueling and research station, providing the necessary data on long-term
          human survival in space environments.
        </p>
        <p>
          With advanced propulsion systems and AI-driven life support, the 2026 window for launch
          is looking increasingly promising. Scientists are focusing on resource
          utilization—learning how to make fuel and oxygen directly from the Martian atmosphere.
        </p>
      </>
    ),
  },
};

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articlesData[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-magazine py-20 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-info hover:underline">
            ← Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container-magazine py-10">
        <article className="max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide mb-4 ${article.badgeColor}`}>
              {article.badge}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
              {article.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {article.meta}
            </p>
          </div>

          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded-lg shadow-card-hover mb-8 object-cover max-h-[500px]"
          />

          <div className="prose prose-lg max-w-none">
            <div className="space-y-4 text-foreground leading-relaxed [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4">
              {article.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-semibold mb-4 text-foreground">Share this article:</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-info text-white rounded hover:opacity-90 transition-opacity text-sm">
                Twitter
              </button>
              <button className="px-4 py-2 bg-category-culturals text-white rounded hover:opacity-90 transition-opacity text-sm">
                Facebook
              </button>
              <button className="px-4 py-2 bg-category-ethnic text-white rounded hover:opacity-90 transition-opacity text-sm">
                WhatsApp
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-info hover:underline">
              ← Back to Home
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Article;
