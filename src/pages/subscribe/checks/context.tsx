import { getCtx } from "@/utils/help";
import React, { useCallback, useEffect } from "react";
import { getItemList } from "./services";
import { debounce } from "lodash";
import { TablePaginationConfig } from "antd/lib/table";

export interface PageState {
  visible: boolean;
  data: any;
  updateList: number;
  search: string;
  loadingList: boolean;
}

const iniState: PageState = {
  visible: false,
  data: null,
  updateList: 1,
  search: "",
  loadingList: false,
};

const { Provider, useCtx } = getCtx<PageState>(iniState);
export const usePageCtx = useCtx;
export const ProviderPage = Provider;

export function useTableData() {
  const { state, update } = usePageCtx(["search", "updateList","loadingList"]);
  const [data, setData] = React.useState<any>([]);
  const [size, setSize] = React.useState(10);
  const [current, setCurrent] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  useEffect(
    function () {
      if (state.loadingList) {
        return;
      }
      update((s) => {
        s.loadingList = true;
      });
      getItemList({ size, current, search: state.search })
        .then((res) => {
          if (res) {
            setTotal(res.total);
            setData(res.rows);
          }
        })
        .finally(() => {
          update((s) => {
            s.loadingList = false;
          });
        });
    },
    [state.search, state.updateList, current, size]
  );

  const pagination: TablePaginationConfig = {
    onChange: (page, pageSize) => {
      setCurrent(page);
      setSize(pageSize || (size as number));
    },
    total: total,
    pageSize: size,
    current: current,
  };

  return { data: data, pagination, loading: state.loadingList };
}

export function useSearch() {
  const { update, state } = usePageCtx(["loadingList"]);
  const [search, setSearch] = React.useState("");
  const change = useCallback(
    debounce((v: string) => {
      update((s) => {
        s.search = v;
      });
    }, 800),
    []
  );

  return {
    value: search,
    onChange: setSearch,
    onSearch: change,
    loading: state.loadingList,
  };
}
