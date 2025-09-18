import { MemberProfile } from "@/api/modernCommuneApi";
import Icon from "@/components/Icons";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import Select from "@/components/UI/Select";
import { Form, Formik, FormikHelpers } from "formik";
import { useMemo, useState } from "react";
import DetailElementWrapper from "../DetailElementWrapper";
import ImageTextCard from "../ImageTextCard";
import DetailElement from "../ProfileDetails/DetailElement";
import { city_options_new, country_options_new } from "../data";
import { EditMemberProfile } from "../type";

type EditProfileProps = {
  handleSetEdit: (value: boolean) => void;
  profile: MemberProfile;
  onSubmit: (
    values: EditMemberProfile,
    formikHelpers: FormikHelpers<EditMemberProfile>
  ) => void;
  loading?: boolean;
};

interface StatesProps {
  label: string;
  value: string;
  id: string;
}

const EPInput = Input<EditMemberProfile>;
const EPSelect = Select<EditMemberProfile>;

const EditProfileDetails = ({
  handleSetEdit,
  profile,
  onSubmit,
  loading,
}: EditProfileProps) => {
  const [states, setStates] = useState<StatesProps[]>([]);
  const editProfileValues: EditMemberProfile = useMemo(() => {
    return {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address?.street || "",
      city: profile.address?.city || "",
      state: profile.address?.state || "",
      postalCode: profile.address?.postalCode || "",
      country: profile.address?.country || "",
    };
  }, [profile]);

  const getState = async (idArg: string) => {
    const statesArr = city_options_new.filter((city) => city.id === idArg);
    setStates(statesArr);
  };

  return (
    <Formik<EditMemberProfile>
      initialValues={editProfileValues}
      onSubmit={onSubmit}
    >
      {({ submitForm, setValues, values }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            {/* section 1 */}
            <div className="flex-[2] flex flex-col gap-4">
              <DetailElement title="Username" value={profile.username || ""} />
              <DetailElementWrapper title="First Name">
                <EPInput className="!py-3" name="firstName" />
              </DetailElementWrapper>
              <DetailElementWrapper title="Email">
                <EPInput className="!py-3" name="email" />
              </DetailElementWrapper>
            </div>
            {/* section 2 */}
            <div className="flex-[2] flex flex-col gap-4">
              <DetailElement
                title="Promo Code"
                value={profile.promoCode || ""}
              />
              <DetailElementWrapper title="Last Name">
                <EPInput className="!py-3" name="lastName" />
              </DetailElementWrapper>
              <DetailElementWrapper title="Phone">
                <EPInput className="!py-3" name="phone" type="number" />
              </DetailElementWrapper>
            </div>
            {/* section 3 */}
            <div className="flex-1 flex flex-col gap-4 justify-center">
              <ImageTextCard
                href={profile.level?.imageUri || ""}
                title={profile.level?.name || ""}
              />
              <div className="flex flex-col gap-2 h-full">
                <Button
                  type="button"
                  onClick={submitForm}
                  className="h-full rounded-[4px]"
                  loading={loading}
                >
                  <Icon icon="save-icon" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSetEdit(false)}
                  className="h-full rounded-[4px]"
                >
                  <Icon icon="cancel-icon" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <DetailElementWrapper title="Address">
            <EPInput className="!py-3" name="address" />
          </DetailElementWrapper>
          <div className="flex flex-row gap-4">
            <div className="flex-1 flex flex-col gap-4">
              <DetailElementWrapper title="Country">
                {profile.address?.country ? (
                  <EPSelect
                    name="country"
                    options={country_options_new}
                    classNameProps="!w-full"
                    classNameOptionsProps="!w-full"
                    value={{
                      label:
                        values?.country ||
                        (profile.address && profile.address?.country),
                      value:
                        values?.country ||
                        (profile.address && profile.address?.country),
                    }}
                    onValueChange={(value) => {
                      setValues({
                        ...values,
                        country: value.value,
                        state: "",
                      });
                      getState(value.id);
                    }}
                  />
                ) : (
                  <EPSelect
                    name="country"
                    options={country_options_new}
                    classNameProps="!w-full"
                    classNameOptionsProps="!w-full"
                    onValueChange={(value) => {
                      setValues({
                        ...values,
                        country: value.value,
                        state: "",
                      });
                      getState(value.id);
                    }}
                  />
                )}
              </DetailElementWrapper>

              <DetailElementWrapper title="State">
                {profile.address?.state ? (
                  <EPSelect
                    classNameProps="w-full"
                    classNameOptionsProps="w-full"
                    name="state"
                    options={states}
                    value={{
                      label: profile.address && profile.address?.state,
                      value: profile.address && profile.address?.state,
                    }}
                  />
                ) : (
                  <EPSelect
                    classNameProps="w-full"
                    classNameOptionsProps="w-full"
                    name="state"
                    options={states}
                  />
                )}
              </DetailElementWrapper>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <DetailElementWrapper title="City">
                <EPInput className="!py-3" name="city" />
              </DetailElementWrapper>
              <DetailElementWrapper title="Postal Code">
                <EPInput className="!py-3" name="postalCode" />
              </DetailElementWrapper>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileDetails;
