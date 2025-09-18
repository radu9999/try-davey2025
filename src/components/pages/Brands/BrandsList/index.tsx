import { BrandCard } from "@/api/modernCommuneApi";
import BrandsCard from "./BrandsCard";

type BrandsListProps = {
  list: BrandCard[];
};

const BrandsList = ({ list }: BrandsListProps) => {
  return (
    <div className="w-full min-h-[calc(100vh-220px)]">
      <div className=" mx-auto grid grid-cols-3 gap-4 ">
        {list.map((brand, index) => (
          <BrandsCard key={index} brandCard={brand} />
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
