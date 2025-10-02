"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardCompany } from "./card-company";
import { IPublicCompany, usePublicCompany } from "@/provider/company";

export function CompanyGridSection() {
  const { companies, loading, listCompanies } = usePublicCompany();
  const [displayCompanies, setDisplayCompanies] = useState<any[]>([]);

  // Carregar dados na inicialização
  useEffect(() => {
      listCompanies(1, 4); // Carregar apenas 4 empresas do backend
  }, []);

  useEffect(() => {
    if (companies?.data) {
      // Apenas converter o formato, sem filtrar ou embaralhar
      const convertedCompanies = companies.data.map((company) => {
        // Extrair todas as categorias
        const allCategories = company.company_category?.map(
          (cat: { name: any }) => cat.name
        ) || ["Comércio"];

        return {
          name: company.name,
          address: company.address,
          category:
            allCategories.length === 1 ? allCategories[0] : allCategories,
          image:
            company.company_image?.url || company.company_image?.original_name,
          id: company.id,
        };
      });

      setDisplayCompanies(convertedCompanies);
    }
  }, [companies]);

  if (companies?.total === 0) {
    return <></>;
  }

  return (
    <section className="w-full mt-10 py-12 max-w-[1272px] mx-auto px-4">
      <div className="w-[106px] h-2 bg-red-500 rounded-full mt-15" />

      <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between">
        <h2 className="text-2xl font-semibold text-red-500 py-6">
          Comércios que são destaques em Biguaçu!
        </h2>
        <Link
          href="/comercio"
          className="flex items-center font-semibold gap-2 text-zinc-900 hover:text-red-500 transition-colors"
        >
          Veja mais
          <ArrowRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCompanies.map((company) => (
          <div key={company.id} className="w-full">
            <CardCompany company={company} />
          </div>
        ))}
      </div>
    </section>
  );
}
