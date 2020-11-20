import { getCtx, PageRows } from "@/utils/help";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { TablePaginationConfig } from "antd/lib/table";
import { cloneDeep, debounce, get } from "lodash";

export type ApiCrud<P, S> = (param: P) => Promise<S>;

// 常用增删查改
export interface BaseCrudAuto<T, P> {
  // 表格参数
  pageSize: number;
  pageIndex: number;
  pageTotal: number;
  pageList: T[];
  pageParam: P;
  pageLoading: boolean;
  pageUpdate: number;
  // 弹窗参数
  visible: boolean;
  editData: T;
}

export interface BaseCrudModule<T, P> {
  //接口
  ApiPageList: ApiCrud<P, PageRows<T>>;
  ApiEditItem: ApiCrud<T, any>;
  ApiDelItem: ApiCrud<any, any>;
  ApiAddItem: ApiCrud<T, any>;
}

export type BaseCrudState<T, P> = BaseCrudAuto<T, P> & BaseCrudModule<T, P>;

const { useCtx, Provider } = getCtx<BaseCrudState<any, any>>({
  pageIndex: 1,
  pageList: [],
  pageLoading: false,
  pageParam: {},
  pageSize: 10,
  pageTotal: 0,
  pageUpdate: 1,
  visible: false,
  editData: null,
} as any);

export const useCrudCtx = useCtx;
export const ProviderCrud: FC<{ value: BaseCrudModule<any, any> }> = Provider;

export function useCrudTableState() {
  const { state, update } = useCrudCtx([
    "pageSize",
    "pageLoading",
    "pageList",
    "pageIndex",
    "pageParam",
    "pageTotal",
    "pageUpdate",
  ]);
  const {
    pageSize,
    pageLoading,
    pageList,
    pageIndex,
    pageParam,
    pageTotal,
    pageUpdate,
  } = state;

  function updatePageList() {
    if (state.pageLoading) {
      return;
    }
    update((s) => {
      s.pageLoading = true;
    });
    const param = pageParam || {};
    state
      .ApiPageList({ size: pageSize, current: state.pageIndex, ...param })
      .then((res) => {
        if (res) {
          update((s) => {
            s.pageTotal = res.total ?? s.pageTotal;
            s.pageList = res.rows ?? s.pageList;
          });
        }
      })
      .finally(() => {
        update((s) => {
          s.pageLoading = false;
        });
      });
  }

  useEffect(
    function () {
      updatePageList();
    },
    [pageSize, pageIndex, pageParam, pageUpdate]
  );

  const autoResetIndex = useRef(1);

  useEffect(
    function () {
      // 用于删除-搜索等操作后没有数据的情况
      if (pageList.length === 0 && pageIndex > 1 && pageTotal > 1) {
        // 为避免多次请求接口 只执行一次操作并锁住
        if (autoResetIndex.current === 1) {
          autoResetIndex.current = 2;
          update((s) => {
            s.pageIndex = Math.ceil(pageTotal / pageSize);
          });
        }
      }
      if (pageList.length > 0) {
        //恢复正常后重置锁变量
        autoResetIndex.current = 1;
      }
    },
    [pageList, pageIndex, pageParam, pageSize]
  );

  const pagination: TablePaginationConfig = {
    onChange: (page, pageSize) => {
      update((s) => {
        s.pageIndex = page ?? s.pageIndex;
        s.pageSize = pageSize ?? s.pageSize;
      });
    },
    total: pageTotal,
    pageSize: pageSize,
    current: pageIndex,
  };

  return {
    data: pageList,
    pagination,
    loading: pageLoading,
    forceUpdate: updatePageList,
  };
}

// 列表操作
export function useCrudTableAction<T>() {
  const { state, update } = useCrudCtx([]);

  function editItem(item: T) {
    update((s) => {
      s.editData = item;
      s.visible = true;
    });
  }
  function deleteItem(id: any) {
    state
      .ApiDelItem(id)
      .then((_res) => {
        // showActionTip(_res);
      })
      .finally(() => {
        update((s) => {
          s.pageUpdate += 1;
        });
      });
  }
  return { deleteItem, editItem };
}
// 弹窗
export function useCrudModalState(iniEditData?: any) {
  const { state, update } = useCrudCtx(["visible", "editData"]);

  useEffect(() => {
    update((s) => {
      s.editData = cloneDeep(iniEditData);
    });
  }, [iniEditData]);

  function open(data?: any) {
    update((s) => {
      s.editData = data;
      s.visible = true;
    });
  }
  function close() {
    update((s) => {
      s.visible = false;
      s.editData = null;
      s.pageUpdate += 1;
    });
  }

  return {
    visible: state.visible,
    editItem: state.editData || iniEditData,
    open,
    close,
  };
}
// 筛选参数
export function useCrudParam(iniParam?: any) {
  const { update, state } = useCrudCtx(["pageLoading"]);
  const [param, setParam] = useState<any>(iniParam || {});
  const paramRef = useRef(param);
  paramRef.current = param;

  const submitFn = useCallback(
    debounce(function submit() {
      update((s) => {
        s.pageParam = Object.assign({}, paramRef.current);
      });
    }, 800),
    []
  );

  function onChange(key: string, value: any, disableAuto?: boolean) {
    param[key] = get(value, "target.value") || value;
    setParam(Object.assign({}, param));
    if (!disableAuto) {
      submitFn();
    }
  }

  return {
    param: param,
    onChange,
    submit: submitFn,
    disabled: state.pageLoading,
  };
}
