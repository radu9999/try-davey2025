import Icon from "@/components/Icons";

interface MemberQuestionsStatusProps {
  status: string;
  text?: boolean;
  modalText?: boolean;
}

const MemberQuestionsStatus = ({
  status,
  text,
  modalText,
}: MemberQuestionsStatusProps) => {
  switch (status) {
    case "Correct":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-alerts-success-2 bg-alerts-success-1">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-alerts-success-2 bg-alerts-success-1 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="rounded-tick" className="fill-alerts-success-2" />
          )}
        </>
      );
    case "Incorrect":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-alerts-error-2 bg-alerts-error-1">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-alerts-error-2 bg-alerts-error-1 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="rounded-cross" className="fill-alerts-error-2" />
          )}
        </>
      );
    case "Resolved":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-primary-2 bg-primary-1">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-primary-2 bg-primary-1 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="resolved" className="" />
          )}
        </>
      );
    case "Disputed":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-neutral-3 bg-neutral-2">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-neutral-3 bg-neutral-2 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="disputed" className="fill-neutral-3" />
          )}
        </>
      );
    case "Skipped":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-primary-4 bg-primary-1 ">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-primary-4 bg-primary-1 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="skipped" className="fill-primary-4" />
          )}
        </>
      );
    case "Timeout":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-alerts-warning-2 bg-alerts-warning-1">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-alerts-warning-2 bg-alerts-warning-1 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="timeUps" className="fill-alerts-warning-2" />
          )}
        </>
      );
    case "None":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-alerts-error-3 bg-alerts-error-1">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-alerts-error-3 bg-alerts-error-1 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="none" className="" />
          )}
        </>
      );
    case "In Progress":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-alerts-warning-5 bg-primary-1">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center whitespace-nowrap py-1 text-neutral-5 font-normal px-[10px] border border-alerts-warning-5 bg-primary-1 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="inprogress" className="" />
          )}
        </>
      );
    case "Reanswered":
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-alerts-success-3 bg-primary-5">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border border-alerts-success-3 bg-primary-5 rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="reanswered" className="" />
          )}
        </>
      );

    default:
      return (
        <>
          {modalText ? (
            <p className="capitalize py-1 px-[10px] border rounded-lg  border-alerts-warning-5 bg-primary-1">
              <span className="font-bold text-sm text-neutral-4">
                Status :{" "}
              </span>
              <span className="font-normal text-sm text-neutral-4">
                {status}
              </span>
            </p>
          ) : text ? (
            <p className="capitalize text-center py-1 text-neutral-5 font-normal px-[10px] border  rounded-lg">
              {status}
            </p>
          ) : (
            <Icon icon="inprogress" className="" />
          )}
        </>
      );
  }
};

export default MemberQuestionsStatus;
