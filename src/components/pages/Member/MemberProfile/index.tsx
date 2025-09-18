import { usePutMemberProfileMutation } from "@/store/api/member/mutation";
import { useGetMemberProfileQuery } from "@/store/api/member/query";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import EditProfileDetails from "./EditProfileDetails";
import ImageTextList from "./ImageTextList";
import MemberSkeleton from "./MemberSkeleton";
import ProfileDetails from "./ProfileDetails";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import { EditMemberProfile } from "./type";

const MemberProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get Profile
  const {
    data: memberProfile,
    isLoading: memberProfileLoading,
    refetch
  } = useGetMemberProfileQuery(undefined, {refetchOnMountOrArgChange: true});

  // Update Profile
  const [updateProfile, { isLoading: updateLoading }] =
    usePutMemberProfileMutation();

  const isEdit = searchParams.get("isEdit");
  const handleSetEdit = (value: boolean) => {
    setSearchParams({ isEdit: String(value) });
  };

  const handleUpdateProfile = async (values: EditMemberProfile) => {
    try {
      const response = await updateProfile({
        memberProfile: {
          ...memberProfile,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: `${values.phone}`,
          address: {
            id: memberProfile?.address?.id,
            street: values.address,
            city: values.city,
            country: values.country,
            postalCode: values?.postalCode,
            state: values?.state,
            unit: memberProfile?.address?.unit,
          },
        },
      });
      if ("data" in response) {
        await refetch();
        handleSetEdit(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col gap-3">
      {!memberProfileLoading ? (
        <>
          {memberProfile && (
            <ProfileSectionWrapper title="Member Details:">
              <div className="bg-neutral-1 rounded-lg w-full h-fit p-4">
                {isEdit === "true" ? (
                  <EditProfileDetails
                    profile={memberProfile}
                    handleSetEdit={handleSetEdit}
                    onSubmit={handleUpdateProfile}
                    loading={updateLoading}
                  />
                ) : (
                  <ProfileDetails
                    profile={memberProfile}
                    handleSetEdit={handleSetEdit}
                  />
                )}
              </div>
            </ProfileSectionWrapper>
          )}

          {memberProfile?.badgeAwards && (
            <ImageTextList 
              list={memberProfile?.badgeAwards} 
              title="Badges:" 
            />
          )}

          {memberProfile?.challengeAwards && (
            <ImageTextList
              list={memberProfile?.challengeAwards}
              title="Challenges:"
            />
          )}
        </>
      ) : (
        <>
          <MemberSkeleton />
        </>
      )}
    </div>
  );
};

export default MemberProfilePage;
