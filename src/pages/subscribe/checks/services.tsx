import { axo, Result } from "@/utils/help";
import { CheckItem } from "@/pages/subscribe/checks/constants";

export function addCheckItem(param: CheckItem): Result<number> {
  return axo.post("/checks/add?name=xh", param).then((res) => {
    return res.data;
  });
}
