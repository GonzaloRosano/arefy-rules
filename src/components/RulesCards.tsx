import React from 'react';
import { useFetchStrapiRules } from '../hooks/useFetchStrapiRules';

const StrapiRulesComponent = () => {
  const { data, loading, error } = useFetchStrapiRules();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='grid grid-cols-3 gap-8 w-2/3 mx-auto'>
      {data?.map((rule) => (
        <div key={rule.id} className='flex flex-col align-center drop-shadow-2xl rounded-2xl bg-white px-6 py-8 text-lg'>
           <h3 className='font-bold mx-auto'>{rule.title}:</h3>
          
            <p className='flex'>{rule.description}</p>
         
        </div>
      ))}
    </div>
  );
};

export default StrapiRulesComponent;
