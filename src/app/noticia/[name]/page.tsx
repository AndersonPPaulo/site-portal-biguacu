import ColumnistCardWidget from "@/components/columnists/columnist-card-widget";
import DefaultPage from "@/components/default-page";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import ListArticlesByCategory from "@/components/posts/sections/list-news-by-category";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string; slug: string }>;
}): Promise<Metadata> {
  const { name } = await params;

  const faviconUrl = "https://novo.portalpalhoca.com.br/favicon.ico";

  return {
    title: `Notícias sobre ${name.toLocaleUpperCase()} | Portal Biguaçu`,
    description:
      "Portal Biguaçu é um site de notícias que traz as últimas informações sobre a cidade de Biguaçu, SC.",
    openGraph: {
      type: "website",
      siteName: "Portal Biguaçu",
      title: `Notícias sobre ${name.toLocaleUpperCase()} | Portal Biguaçu`,
      description:
        "Portal Biguaçu é um site de notícias que traz as últimas informações sobre a cidade de Biguaçu, SC.",
      images: [
        {
          url: faviconUrl,
          width: 32,
          height: 32,
          alt: "Portal Biguaçu",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `Notícias sobre ${name.toLocaleUpperCase()} | Portal Biguaçu`,
      description:
        "Portal Biguaçu é um site de notícias que traz as últimas informações sobre a cidade de Biguaçu, SC.",
      images: [
        {
          url: faviconUrl,
          width: 32,
          height: 32,
          alt: "Portal Biguaçu",
        },
      ],
    },
  };
}

export default function NewsPage() {
  return (
    <DefaultPage>
      <Header />
      <main className="relative min-h-75">
        <div className="lg:absolute right-0 top-0">
          <ColumnistCardWidget noSlug={true} />
        </div>

        <ListArticlesByCategory />
      </main>
      <footer>
        <Footer />
      </footer>
    </DefaultPage>
  );
}
