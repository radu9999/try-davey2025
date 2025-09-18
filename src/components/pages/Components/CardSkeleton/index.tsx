import classNames from "classnames";

type CardSkeletonProps = {
  size?: "sm" | "md" | "lg";
};

const CardSkeleton = ({ size = "lg" }: CardSkeletonProps) => {
  return (
    <div className=" mx-auto grid grid-cols-4 gap-4 w-full">
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className={classNames(
            "transition-all bg-gray-200 rounded  animate-pulse  group  duration-300 ease-in-out",
            size === "sm" && "h-32",
            size === "md" && "h-40",
            size === "lg" && "h-60"
          )}
        ></div>
      ))}
    </div>
  );
};

export default CardSkeleton;
