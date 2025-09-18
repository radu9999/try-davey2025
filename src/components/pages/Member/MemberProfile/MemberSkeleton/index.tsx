const MemberSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-300 animate-pulse rounded-lg w-full h-12"></div>
      <div className="flex flex-row gap-4">
        {/* section 1 */}
        <div className="flex-[2] flex flex-col gap-4">
          <SkeletonDiv />
          <SkeletonDiv />
          <SkeletonDiv />
        </div>
        {/* section 2 */}
        <div className="flex-[2] flex flex-col gap-4">
          <SkeletonDiv />
          <SkeletonDiv />
          <SkeletonDiv />
        </div>
        {/* section 3 */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="bg-gray-300 animate-pulse rounded-lg w-full h-full"></div>
          <div className="bg-gray-300 animate-pulse rounded-lg w-full h-full"></div>
        </div>
      </div>
      <SkeletonDiv />
      <div className="flex flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <SkeletonDiv />
          <SkeletonDiv />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <SkeletonDiv />
          <SkeletonDiv />
        </div>
      </div>
    </div>
  );
};

export default MemberSkeleton;

const SkeletonDiv = () => {
  return (
    <div className="bg-gray-300 animate-pulse rounded-lg w-full h-12"></div>
  );
};
