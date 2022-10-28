import Image from "next/image";
import type { Product } from "../types";


type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({product}) => {
  return (
    <div
      style={{
        border: "1px solid white",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
        <img src={product.image} alt={product.image} />
        <h3>{product.name}</h3>
        <p>Valoracion:{"★".repeat(product.rating).padEnd(5,"☆")}</p>
        <p>{product.price.toLocaleString('en-US',{style:'currency', currency:'USD'})}</p>
    </div>
  );
};

export default ProductCard;
