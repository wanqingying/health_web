export const LayoutList = {
  base: "base",
};

// 检查类型
export const ECheckTypesMap = new Map<number, string>();
ECheckTypesMap.set(1, "检查");
ECheckTypesMap.set(2, "检验");
export const ECheckTypes = Array.from(ECheckTypesMap.entries()).map(([k, v]) => {
  return { label: v, value: k };
});

// 性别
export const ESexTypeMap = new Map<number, string>();
ESexTypeMap.set(0, "男/女");
ESexTypeMap.set(1, "男");
ESexTypeMap.set(2, "女");
export const ESexTypes = Array.from(ESexTypeMap.entries()).map(([k, v]) => {
  return { label: v, value: k };
});
