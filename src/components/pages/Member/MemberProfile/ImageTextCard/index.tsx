import chakraIcon from "@/assets/images/chakraIcon.png";

type ImageTextCardProps = {
  href: string;
  title: string;
};

const ImageTextCard = ({ href, title }: ImageTextCardProps) => {
  return (
    <div className="bg-neutral-1 max-w-[280px] flex flex-row gap-4 h-full w-full p-4 justify-start items-center rounded-[4px] border border-primary-2 overflow-hidden">
      <div className="w-16 h-16 aspect-square rounded-[4px] overflow-hidden object-cover flex justify-center items-center">
        <img
          src={href}
          alt="profile"
          className=""
          onError={(e) => (e.currentTarget.src = chakraIcon)}
        />
      </div>
      <p className="text-base text-primary-2 font-bold">{title}</p>
    </div>
  );
};

export default ImageTextCard;
