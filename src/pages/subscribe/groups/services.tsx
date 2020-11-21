import { axo, PageResult, Result, showActionTip } from "@/utils/help";
import { CheckGroup } from "@/pages/subscribe/groups/constants";
import { CheckItem } from "@/pages/subscribe/checks/constants";

export function add(param: CheckGroup): Result<number> {
  return axo.post("/groups/add?name=xh", param).then((res) => {
    showActionTip(res.data);
    return res.data;
  });
}

export function getItemList(param: any): PageResult<CheckGroup> {
  return axo.post("/groups/page", param).then((res) => {
    return res.data;
  });
}

export function deleteById(id: any): Result<any> {
  return axo.get("/groups/remove?id=" + id).then((res) => {
    showActionTip(res.data);
    return res.data;
  });
}

export function updateItem(item: CheckGroup): Result<boolean> {
  return axo
    .post("/groups/update", item)
    .then((res) => {
      showActionTip(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log("err", e);
    });
}

export function getAllCheckItems(): Result<CheckItem[]> {
  return axo.get("/checks/all").then((res) => {
    return res.data;
  });
}

export function getCheckItemsByGroupId(id: any): Result<number[]> {
  return axo.get("/checks/findByGroupId?groupId=" + id).then((res) => {
    return res.data;
  });
}

export function getItemById(id: any) {}
