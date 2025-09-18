import Icon from "@/components/Icons";
import { ROUTES } from "@/constants/routes";
import * as Accordion from "@radix-ui/react-accordion";
import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SideBarItemType } from "../../type";
import ItemTitle from "./ItemTitle";

const SideBarItem = ({
  item,
  isExpanded,
}: {
  item: SideBarItemType;
  isExpanded: boolean;
}) => {
  const [activeDrop, setActiveDrop] = useState<string>("");

  const location = useLocation();

  return (
    <>
      {item.children ? (
        <>
          {isExpanded ? (
            <div className="w-fit bg-neutral-1 rounded-lg overflow-hidden">
              <Accordion.Root type="single" collapsible>
                <Accordion.Item value={item?.title as string} className="">
                  <Accordion.Header className="">
                    <Accordion.Trigger className="w-full group">
                      <ItemTitle
                        isDrop={true}
                        title={item?.title}
                        icon={item.icon}
                        isExpanded={isExpanded}
                        isActive={location.pathname.includes(
                          item.path as string
                        )}
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="flex flex-col bg-neutral-1 transition-all ease-in-out duration-300 data-[state=open]:animate-slideDown  overflow-hidden">
                    {item?.children?.map((subItem) => {
                      return (
                        <Link to={String(subItem.path)} key={subItem?.title}>
                          <ItemTitle
                            isDropChild={true}
                            isDrop={false}
                            icon={subItem.icon}
                            isExpanded={isExpanded}
                            title={subItem.title}
                            isActive={
                              location.pathname === "/"
                                ? Boolean(subItem.path === ROUTES.HOME)
                                : Boolean(
                                    location.pathname === `/${subItem.path}`
                                  )
                            }
                          />
                        </Link>
                      );
                    })}
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          ) : (
            <div
              className="w-full relative z-[200]"
              // onClick={() => setValue(item?.title as string)}
              onMouseEnter={() => setActiveDrop(item?.title as string)}
              onMouseLeave={() => setActiveDrop("")}
            >
              <Accordion.Root
                type="single"
                collapsible
                value={activeDrop}
                // onValueChange={setValue}
              >
                {/* <Accordion.Item value={item?.title as string}> */}
                <Accordion.Item value={item?.title as string}>
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={classNames(
                        "w-12 h-12 group bg-neutral-1 rounded-lg data-[state=close]:rounded-r-md data-[state=open]:rounded-r-none flex justify-center items-center data-[state=open]:bg-primary-2 data-[state=open]:text-neutral-1",
                        location.pathname.includes(item.path as string) &&
                          "bg-primary-2 text-neutral-1 fill-neutral-1"
                      )}
                    >
                      <div className=" ">
                        <Icon
                          icon={item.icon}
                          className={classNames(
                            "transition-all ease-in-out duration-300 group-data-[state=open]:fill-neutral-1",
                            isExpanded ? "w-6 h-6" : "w-6 h-6"
                          )}
                        />
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content>
                    <div className="absolute left-12 top-0 flex flex-col   rounded-b-lg rounded-tr-lg overflow-hidden ">
                      <div className="px-2 pt-2 pb-[7px] h-12 flex items-center justify-between bg-primary-2 text-neutral-1">
                        <p>{item?.title}</p>
                        <CaretDownIcon className="w-8 h-8" />
                      </div>
                      <div className="bg-neutral-1 ml-2 h-[200px] overflow-y-auto sidebarScroll">
                        {item?.children?.map((i) => {
                          return (
                            <Link to={String(i.path)} key={i?.title}>
                              <ItemTitle
                                isDrop={false}
                                icon={i.icon}
                                isExpanded={true}
                                title={i.title}
                                isDropChild={true}
                                isActive={
                                  location.pathname === "/"
                                    ? Boolean(i.path === ROUTES.HOME)
                                    : Boolean(
                                        location.pathname === `/${i.path}`
                                      )
                                }
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </div>
          )}
        </>
      ) : (
        <Link to={String(item.path)} className="relative group">
          <ItemTitle
            isDrop={false}
            icon={item.icon}
            isExpanded={isExpanded}
            title={item.title}
            isActive={
              location.pathname === "/"
                ? Boolean(item.path === ROUTES.HOME)
                : Boolean(location.pathname === `/${item.path}`)
            }
          />
          {!isExpanded && (
            <div
              className={classNames(
                "absolute bg-primary-2 left-14 px-2 text-neutral-1 h-fit text-sm p-1 rounded-lg whitespace-nowrap hidden group-hover:block animate-slide-right-and-fade-in bottom-0 "
              )}
            >
              {item.title}
            </div>
          )}
        </Link>
      )}
    </>
  );
};

export default SideBarItem;
