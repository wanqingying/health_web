// 检查组


export interface CheckGroup {
  id?: number;
  code: string;
  helpcode:string;
  name: string;
  sex: number;
  attention: string;
  remark: string;
}
export const IniCheckItem: CheckGroup = {
  code: "xy_code",
  name: "常规测试组",
  sex: 1,
  helpcode: "x",
  attention: "五注意事项",
  remark: "检查头皮屑",
};

export const ECheckGroupFields = {
  code: "code",
  name: "name",
  sex: 'sez',
  helpCode: "helpCode",
  attention: "attention",
  remark: "remark",
};
export const ECheckGroupLabels={
  code: "编号",
  name: "名称",
  sex: '适用性别',
  helpcode: "助记名",
  attention: "项目说明",
  remark: "注意事项",
}
