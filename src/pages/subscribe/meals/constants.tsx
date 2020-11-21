// 检查组


export interface MealItem {
  id?: number;
  code: string;
  helpcode: string;
  name: string;
  sex: number;
  age: number;
  price: number;
  attention: string;
  remark: string;
  img: string;
}
export const IniCheckItem: MealItem = {
  code: "xy_code",
  name: "常规测试组",
  sex: 1,
  helpcode: "x",
  attention: "五注意事项",
  remark: "检查头皮屑",
  age: 18,
  img: "",
  price: 168,
};

export const EMealFields = {
  code: "code",
  helpcode: "helpcode",
  name: "name",
  sex: "sex",
  age: "age",
  price: "price",
  attention: "attention",
  remark: "remark",
  img: "img",
};
export const EMealLabels = {
  code: "套餐编号",
  name: "套餐名称",
  sex: "适用性别",
  helpcode: "助记名",
  attention: "注意事项",
  remark: "项目说明",
  age: "适用年龄",
  price: "价格",
  img: "图片",
};
