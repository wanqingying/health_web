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
