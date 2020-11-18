export interface CheckItem {
  id?: number;
  code: string;
  name: string;
  sex: number;
  age: number;
  price: number;
  type: number;
  attention: string;
  remark: string;
}
export const IniCheckItem: CheckItem = {
  code: "x_code",
  name: "测试",
  sex: 1,
  age: 18,
  price: 668,
  type: 2,
  attention: "五注意事项",
  remark: "检查头皮屑",
};

export const CheckItemFields = {
  id: "id",
  code: "code",
  name: "name",
  sex: "sex",
  age: "age",
  price: "price",
  type: "type",
  attention: "attention",
  remark: "remark",
};
