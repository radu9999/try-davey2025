type ProfileSectionWrapperProps = {
  children: React.ReactNode;
  title: string;
};

const ProfileSectionWrapper = ({
  children,
  title,
}: ProfileSectionWrapperProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-neutral-4 font-poppins text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

export default ProfileSectionWrapper;
