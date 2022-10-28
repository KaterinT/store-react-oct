import { useMemo, useState } from "react";
import { buffer } from "stream/consumers";
import { Filter, Product } from "../types";

type Props = {
  products: Product[];
  onChange: (filter: Filter) => void;
};

const ColorFilter: React.FC<Props> = ({ products, onChange }) => {
    const [selected, setSelected] = useState<Set<string>>(()=> new Set())
  const colors = useMemo(() => {
    const buffer: Set<string> = new Set();

    for (let product of products) {
      buffer.add(product.color);
    }

    return Array.from(buffer);
  }, [products]);

  function handleChange (color:string, isChecked:boolean) {
    const draft = structuredClone(selected)

    if (isChecked) {
        draft.add(color)
    }else {
        draft.delete(color)
    }

    onChange(draft.size ? (product) => draft.has(product.color) : null)

    setSelected(draft)
    
  }

  console.log(selected);
  return (
    <div style={{ border: "1px solid white", padding: 12 ,display: "flex", flexDirection: "column", gap: 12 }}>
      <h4>Color</h4>
      <ul>
        {colors.map((color) => (
          <li key={color} style={{ display: "flex", gap: 12 }}>
            <label>
              <input onChange={(e) => handleChange(color, e.target.checked)}type="checkbox" name="color" value={color} />
              {color}
              </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilter;
