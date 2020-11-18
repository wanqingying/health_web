import { axo } from "@/utils/help";

export function addItem(param: any) {
  return axo.post("/checks/add", param).then((res) => {
    console.log("res", res);
  });
}

export function test(param:any) {
  return axo.post("/checks/test", param).then((res) => {
    console.log("test ", res);
  });
}
