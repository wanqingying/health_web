import { getAxo, PageResult, Result, showActionTip } from "@/utils/help";
import { MealItem } from "./constants";

const axo = getAxo("/meals");

export function add(param: MealItem): Result<number> {
  return axo.post("/add?name=xh", param).then((res) => {
    showActionTip(res.data);
    return res.data;
  });
}

export function getItemList(param: any): PageResult<MealItem> {
  return axo.post("/page", param).then((res) => {
    return res.data;
  });
}

export function deleteById(id: any): Result<any> {
  return axo.get("/remove?id=" + id).then((res) => {
    showActionTip(res.data);
    return res.data;
  });
}

export function updateItem(item: MealItem): Result<boolean> {
  return axo
    .post("/update", item)
    .then((res) => {
      showActionTip(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log("err", e);
    });
}

export function getAllCheckItems(): Result<MealItem[]> {
  return axo.get("/all").then((res) => {
    return res.data;
  });
}

export function getGroupsByMealId(id: any): Result<number[]> {
  return axo.get("/findGroupIdsByMealId?id=" + id).then((res) => {
    return res.data;
  });
}

export function getItemById(id: any) {}
