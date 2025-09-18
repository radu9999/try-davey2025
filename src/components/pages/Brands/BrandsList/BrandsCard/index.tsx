import { BrandCard } from "@/api/modernCommuneApi";
import ballIcon from "@/assets/images/ballIcon.png";
import EnvelopeDark from "@/components/Icons/EnvelopeDark";
import IIcon from "@/components/Icons/IIcon";
import LocationPin from "@/components/Icons/LocationPin";
import MobileIcon from "@/components/Icons/MobileIcon";
import UserIcon from "@/components/Icons/User";
import WebIcon from "@/components/Icons/WebIcon";
import Tooltip from "@/components/UI/Tooltip";
import { Link } from "react-router-dom";

type BrandsCardProps = {
  brandCard: BrandCard;
};

const BrandsCard = ({ brandCard }: BrandsCardProps) => {
  return (
    <div className="p-6 hover:shadow-lg bg-neutral-1 justify-between rounded-lg flex flex-col gap-2 animate-fade-in-up transition-all duration-300 ease-in-out">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            src={String(brandCard.imageUri) || ""}
            alt={`${brandCard.name} Logo`}
            className="w-7 h-7 rounded-full"
            onError={(e) => (e.currentTarget.src = ballIcon)}
          />
          <p className="text-base text-black font-bold">{brandCard.name}</p>
        </div>

        <div className="flex items-center">
          <div className="cursor-pointer">
            <Tooltip
              side="top"
              label={brandCard?.description || "No Details Available"}
              className="w-[250px]"
            >
              <div>
                <IIcon />
              </div>
            </Tooltip>
          </div>
          <div className="px-2 py-[2px] bg-primary-2 text-white text-sm font-normal rounded-[4px]">
            Message
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-center">
            <UserIcon />
            <p className="whitespace-nowrap text-xs font-normal text-neutral-4">
              {brandCard.contactName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5">
              <EnvelopeDark />
            </div>
            <p className="break-all text-xs font-normal text-neutral-4">
              {brandCard.contactEmail}
            </p>
          </div>

          <div className="flex items-center">
            <MobileIcon />
            <p className="whitespace-nowrap text-xs font-normal text-neutral-4">
              {brandCard.contactPhone}
            </p>
          </div>
        </div>

        <div className="flex">
          <LocationPin />
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center">
              <p className="whitespace-nowrap text-xs font-normal text-neutral-4">
                {brandCard.address?.street}
              </p>
            </div>
            <p className="whitespace-nowrap text-xs font-normal text-neutral-4">
              {brandCard.address?.city}
            </p>
            <p className="whitespace-nowrap text-xs font-normal text-neutral-4">
              {`${brandCard.address?.state}, ${brandCard.address?.country}`}
            </p>
          </div>
        </div>
      </div>

      <Link to={`https://${brandCard.website}`} target="_blank">
        <div className="bg-primary-3 flex items-center justify-center py-1">
          <WebIcon />
          <p className="text-white text-xs font-normal">{brandCard.website}</p>
        </div>
      </Link>
    </div>
  );
};

export default BrandsCard;
