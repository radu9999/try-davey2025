import { AwardCard } from "@/api/modernCommuneApi";
import ImageTextCard from "../ImageTextCard";
import ProfileSectionWrapper from "../ProfileSectionWrapper";

type ImageTextListProps = {
  list: AwardCard[];
  title: string;
};

const ImageTextList = ({ list, title }: ImageTextListProps) => {
  return (
    <ProfileSectionWrapper title={title}>
      <div className="flex flex-row gap-4 flex-wrap">
        {list.map((item) => (
          <ImageTextCard
            key={item.name}
            href={String(item.imageUri)}
            title={String(item.name)}
          />
        ))}
      </div>
    </ProfileSectionWrapper>
  );
};

export default ImageTextList;
