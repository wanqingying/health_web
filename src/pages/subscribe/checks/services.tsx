import { axo, PageResult, Result, showActionTip } from "@/utils/help";
import { CheckItem } from "@/pages/subscribe/checks/constants";

export function addCheckItem(param: CheckItem): Result<number> {
  return axo.post("/checks/add?name=xh", param).then((res) => {
    showActionTip(res.data);
    return res.data;
  });
}

export function getItemList(param: any): PageResult<CheckItem> {
  return axo.post("/checks/list", param).then((res) => {
    return res.data;
  });
}

export function deleteById(id: any): Result<any> {
  return axo.get("/checks/delete?id=" + id).then((res) => {
    showActionTip(res.data);
    return res.data;
  });
}

export function updateItem(item: CheckItem): Result<boolean> {
  return axo
    .post("/checks/update", item)
    .then((res) => {
      showActionTip(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log("err", e);
    });
}

export function getItemById(id: any) {}
