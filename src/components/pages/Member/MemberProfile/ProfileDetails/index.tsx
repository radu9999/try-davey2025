import { MemberProfile } from "@/api/modernCommuneApi";
import Icon from "@/components/Icons";
import Button from "@/components/UI/Button";
import ImageTextCard from "../ImageTextCard";
import DetailElement from "./DetailElement";

type ProfileDetailsProps = {
  handleSetEdit: (value: boolean) => void;
  profile: MemberProfile;
};

const ProfileDetails = ({ handleSetEdit, profile }: ProfileDetailsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        {/* section 1 */}
        <div className="flex-[2] flex flex-col gap-4">
          <DetailElement title="Username" value={profile?.username || ""} />
          <DetailElement title="First Name" value={profile?.firstName || ""} />
          <DetailElement title="Email" value={profile?.email || ""} />
        </div>
        {/* section 2 */}
        <div className="flex-[2] flex flex-col gap-4">
          <DetailElement title="Promo Code" value={profile.promoCode || ""} />
          <DetailElement title="Last Name" value={profile.lastName || ""} />
          <DetailElement title="Phone" value={profile.phone || ""} />
        </div>
        {/* section 3 */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <ImageTextCard
            href={profile.level?.imageUri || ""}
            title={profile?.level?.name || ""}
          />
          <Button
            onClick={() => handleSetEdit(true)}
            className="h-full !rounded-[4px]"
          >
            <div className="flex w-full justify-center items-center flex-row gap-2">
              <Icon icon="edit" className="w-5 h-5 fill-neutral-1" />
              <p>Edit Profile</p>
            </div>
          </Button>
        </div>
      </div>
      <DetailElement title="Address" value={profile.address?.street || ""} />
      <div className="flex flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <DetailElement
            title="Country"
            value={profile?.address?.country || ""}
          />
          <DetailElement title="State" value={profile.address?.state || ""} />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <DetailElement title="City" value={profile.address?.city || ""} />
          <DetailElement
            title="Postal Code"
            value={profile?.address?.postalCode || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
