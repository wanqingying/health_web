import { getCtx } from "@/utils/help";
import { FormInstance } from "antd/lib/form";
import { FC } from "react";
import { CheckItem } from "@/pages/subscribe/checks/constants";

export interface FormContextOuter {
  form: FormInstance;
  iniValues: any;
}

export interface FormContextBase {
  checkItems: CheckItem[];
}
const iniState: FormContextBase = {
  checkItems: [],
};

export type FormContext = FormContextBase & FormContextOuter;

const { Provider, useCtx } = getCtx<FormContext>(iniState as any);

export const ProviderForm: FC<{ value: FormContextOuter }> = Provider;
export const userFormCtx = useCtx;

export function useForm() {
  const { state } = userFormCtx(["form"]);
  // return {form};
}
