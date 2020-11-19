import {axo, PageResult, Result} from "@/utils/help";
import { CheckItem } from "@/pages/subscribe/checks/constants";

export function addCheckItem(param: CheckItem): Result<number> {
  return axo.post("/checks/add?name=xh", param).then((res) => {
    return res.data;
  });
}

export function getItemList(param: any):PageResult<CheckItem> {
  return axo.post("/checks/list", param).then((res) => {
    console.log("res", res);
    return res.data
  });
}
