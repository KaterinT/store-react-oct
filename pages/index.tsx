import type { GetStaticProps, NextPage } from 'next'
import type {Filter, Product} from "../types";

import api from '../api';
import ProductCard from "../components/ProductCard";
import PriceRangeFilter from '../components/PriceRangeFilter';
import ColorFilter from '../components/ColorFilter';
import RatingFilter from '../components/RatingFilter';
import { useMemo, useState } from 'react';

type Props = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<Props> = async() => {
  const products = await api.product.list();
  return {
    props: {
      products
    }
  }
}



const Home: NextPage<Props> = ({products}) => {
  const [filters,setFilters] = useState<Record<string, Filter>>({
    price:null,
    color:null,
    rating:null
  })
  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean)
    let matches = products;

    for (let filter of filtersToApply) {
      matches = matches.filter(filter!);
    }

    return matches
  }, [products, filters])

  return (
    <main style={{display:'flex', gap:12}}>
      <aside>
        <PriceRangeFilter onChange={(filter: Filter) => setFilters((filters) => ({...filters, price:filter}))}  />
        <ColorFilter onChange={(filter: Filter) => setFilters((filters) => ({...filters, color:filter}))} products={products} /> 
        <RatingFilter onChange={(filter: Filter) => setFilters((filters) => ({...filters, rating:filter}))}/>
      </aside>
      <div style={{display:"flex", flexDirection: "column",gap:6, width:"100%" }}>
        <h2>{matches.length} resultados</h2>
          <section 
          style={{
            flex:1,
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))",
            gap:12
          }}
          >
            {matches.map((product) => (
              <article key={product.id}>
                <ProductCard product={product}/>
              </article>
            ))}
          </section>
      </div>
    </main>
  )
}

export default Home;
