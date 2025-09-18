import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const errorHandler: Middleware = () => (next) => (action: any) => {
  if (isRejectedWithValue(action)) 
  {
    console.log(action)

    if(action.payload.status === "FETCH_ERROR")
    {
      toast.error("Internal Server Error", { position: "top-center" });
    }
    else if(action.payload.status == 400)
    {
      if(action.payload.data)
      {
        if(action.payload.data.detail)
        {
          toast.error(action.payload.data.detail, { position: "top-center" });
        }
        else
        {
          toast.error(action.payload.data.title, { position: "top-center" });
        }
      }
    }
    else if(action.payload.status == 404)
    {
      toast.error(action.payload.data.title, { position: "top-center" });
    }
  }

  return next(action);
};
