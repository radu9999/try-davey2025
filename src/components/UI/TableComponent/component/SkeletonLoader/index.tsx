const SkeletonLoader = ({ tableFields }: { tableFields: number }) => {
  return (
    <tbody className="animate-pulse">
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          {[...Array(tableFields)].map((field) => (
            <td
              key={field}
              className="px-3   mx-5 h-1/3 py-5 bg-white  text-sm font-normal"
            >
              <div className="h-7   bg-slate-200 rounded col-span-2"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
export default SkeletonLoader;
