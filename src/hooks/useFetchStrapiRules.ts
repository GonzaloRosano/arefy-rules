import { useState, useEffect } from 'react';

interface RuleItem {
  type: string;
  text?: string;
  children?: RuleItem[];
}

interface Rule {
  id: number;
  title: string;
  description: string;

  documentId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data: Rule[];
}

export const useFetchStrapiRules = () => {
  const [data, setData] = useState<Rule[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/rules', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Error al obtener los datos de Strapi');

        const json: ApiResponse = await response.json();
        setData(json.data);
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { data, loading, error };
};
