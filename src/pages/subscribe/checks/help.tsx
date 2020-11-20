import {  ResultX } from "@/utils/help";
import { message } from "antd";

export function showActionTip(res: ResultX<any>) {
  if (res.flag) {
    message.success(res.message);
  } else {
    message.error(res.message);
  }
}
