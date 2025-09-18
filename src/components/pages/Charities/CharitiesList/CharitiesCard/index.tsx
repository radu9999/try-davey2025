import { CharityCard } from "@/api/modernCommuneApi";
import Dollar from "@/components/Icons/Dollar";
import Button from "@/components/UI/Button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import CharityModal from "./CharityModal";
import React, { useState } from "react";
import { useGetCharityBalanceQuery } from "@/store/api/charities/query";

type CharitiesCardProps = {
  charityCard: CharityCard;
};

const CharitiesCard = ({ charityCard }: CharitiesCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { 
    data: charityBalance, 
    refetch: getCharityBalance
  } = useGetCharityBalanceQuery();

  function handleModalClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    getCharityBalance();
    e.stopPropagation();
    setModalOpen(true);
  }

  return (
    <>
      <CharityModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        setModalOpen={setModalOpen}
        CharityCardDetails={charityCard}
        CharityBalance={charityBalance}
      />
    
      <div
        className={classNames(
          "transition-all animate-fade-in-up group overflow-hidden divide-y divide-primary-2  duration-300 ease-in-out",
          "bg-neutral-1 flex flex-col justify-center items-center  flex-1 rounded-lg cursor-pointer hover:shadow-lg"
        )}
      >
        <div
          className={classNames(
            "flex h-[200px]  relative w-full py-4 gap-1 flex-col justify-center items-center"
          )}
        >
          <div className="w-16 h-16 object-contain">
            <img
              className=""
              src={String(charityCard.imageUri)}
              alt={String(charityCard.name)}
            />
          </div>

          <h2 className="text-center transition-all ease-in-out duration-500  text-base absolute z-10 bottom-2 translate-y-0 group-hover:top-32 transform group-hover:-translate-y-28 text-neutral-5 font-bold group-hover:text-neutral-1">
            {charityCard.name}
          </h2>
          <div className="overflow-hidden  text-neutral-1 flex justify-center items-center transition-all ease-in-out duration-250 w-full bottom-0 h-0 group-hover:h-[200px] group-hover:p-4  bg-primary-2   absolute">
            <p className="">{charityCard.description}</p>
          </div>
        </div>

        {/* Card CTA */}
        <div className="w-full flex flex-row justify-center items-center gap-3 p-4">
          <Button
            size="sm"
            className="!text-sm !font-normal whitespace-nowrap !py-2 !rounded"
          >
            <a href={`https://${charityCard?.website}` || ""} target="_blank">
              <div className="flex flex-row gap-1 justify-center items-center">
                <p>Learn More</p>
                <ArrowRightIcon className="w-4 font-extrabold h-4" />
              </div>
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="!text-sm !font-normal !py-2 !rounded"
            onClick={(e) => handleModalClick(e)}
          >
            <div className="flex flex-row gap-1 justify-center items-center">
              <p>Donate</p>
              <Dollar className="w-6 h-6 fill-primary-2 font-extrabold " />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CharitiesCard;
