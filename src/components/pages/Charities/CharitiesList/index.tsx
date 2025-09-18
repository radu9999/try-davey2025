import { CharityCard } from "@/api/modernCommuneApi";
import CharitiesCard from "./CharitiesCard";

type CharitiesListProps = {
  list?: CharityCard[];
};

const CharitiesList = ({ list }: CharitiesListProps) => {
  return (
    <div className=" mx-auto grid grid-cols-4 gap-4 w-full">
      {list?.map((charity, index) => (
        <CharitiesCard key={index} charityCard={charity} />
      ))}
    </div>
  );
};

export default CharitiesList;
