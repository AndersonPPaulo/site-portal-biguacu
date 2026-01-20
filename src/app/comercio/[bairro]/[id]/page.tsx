import { Metadata } from "next";
import ComercioDetails from "./content";
import { getCompanyByIdServer } from "./get-company";

const capitalize = (text?: string) => {
  if (!text) return "";
  return text
    .split("-") // divide por hífen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "); // junta com espaço
};

export async function generateMetadata({
  params,
}: {
  params: Promise<any>;
}): Promise<Metadata> {
  const { id, bairro } = await params;
  console.log("bairro", bairro);

  const comercio = await getCompanyByIdServer(id);

  if (!comercio) {
    return {
      title: "Comércio não encontrado - Portal Biguaçu",
      description: "O comércio informado não foi localizado.",
    };
  }

  const imageUrl =
    comercio.company_image?.url ||
    "https://portalbiguacu.com.br/images/default-og-image.jpg";

  return {
    title: `${comercio.name} - ${capitalize(bairro)} - ${capitalize(
      comercio.city,
    )} | Portal Biguaçu`,
    description:
      comercio.description ||
      "Informações detalhadas sobre este comércio em Biguaçu você vê aqui!.",
    openGraph: {
      title: `${capitalize(comercio.name)}, ${capitalize(
        bairro,
      )} - ${capitalize(comercio.city)} | Portal Biguaçu`,
      description:
        comercio.description || "Descubra mais sobre este comércio em Biguaçu.",
      url: `https://portalbiguacu.com.br/comercio/${bairro}/${id}`,
      siteName: "Portal Biguaçu",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Imagem do comércio ${comercio.name}`,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${comercio.name} - ${bairro}`,
      description:
        comercio.description ||
        "Informações detalhadas sobre este comércio em Biguaçu.",
      images: [imageUrl],
    },
  };
}

export default async function ComercioPage() {
  return (
    <div className="p-4">
      <ComercioDetails />
    </div>
  );
}
