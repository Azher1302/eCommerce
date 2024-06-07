import React from 'react';
import Filter from '../components/Filter';
import Products from '../components/Products';
import Layout from '../layout/Layout';
import { ProductsData } from '../Data/ProductsData';
import Head from './../components/Head';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  let { category } = useParams();

  const Datas = ProductsData.filter((val) => val.type === category);

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-6 my-6">
        <Head title={category} />
        <Filter total={Datas?.length} />
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {Datas.map((p) => (
            <Products bg={true} key={p._id} product={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default CategoryPage;
