import React, { useEffect, useContext, createContext } from "react";
import { isEqual, cloneDeep, pick } from "lodash";
import axios from "axios";
import { RouteItem } from "../configs/routes";
import {message} from "antd";

export const axo = axios.create({
  withCredentials: true,
  url: "http://localhost:3000",
});

export interface ResultX<T> {
  data: T;
  err: string;
  flag: boolean;
  message: string;
}
export type Result<T> = Promise<ResultX<T>>;
export interface PageRows<T> {
  total:number
  rows:Array<T>
}
export type PageResult<T> = Promise<PageRows<T>>;
export type Service<P, S> = (param: P) => Result<S>;

export function showActionTip(res: ResultX<any>) {
  if (res?.flag) {
    message.success(res.message);
  } else {
    message.error(res.message);
  }
}



class CtxState<T> {
  state: T;
  constructor(iniState: T) {
    this.state = iniState;
  }
  updates: { fn: any; keys: string[] }[] = [];
  update = (fn: (state: T) => any) => {
    const preState = cloneDeep(this.state);
    if (typeof fn === "function") {
      fn(this.state);
    }
    this.updates.forEach((item) => {
      const { fn, keys } = item;
      if (Array.isArray(keys)) {
        const pre = pick(preState, keys);
        const next = pick(this.state, keys);
        if (!isEqual(pre, next)) {
          fn();
        }
      }
    });
  };
}
export function getCtx<T>(
  iniState?: T
): {
  Provider: any;
  useCtx: (
    keys?: (keyof T)[]
  ) => {
    state: T;
    update: (fn: (state: T) => T | any) => void;
  };
} {
  const Ctx = createContext<CtxState<T>>({} as any);
  function Provider(props: { value?: T; children?: any }) {
    const state = new CtxState<T>(Object.assign({}, iniState, props.value));
    return <Ctx.Provider value={state}>{props.children}</Ctx.Provider>;
  }
  function useCtx(keys?: (keyof T)[]) {
    const ctx = useContext(Ctx);
    const [count, setCount] = React.useState(0);
    const countRef = React.useRef(count);
    const fnRef = React.useRef(function () {
      setCount(countRef.current + 1);
    });
    countRef.current = count;
    useEffect(
      function () {
        ctx.updates.push({ fn: fnRef.current, keys: keys as string[] });
        return function () {
          // eslint-disable-next-line
          ctx.updates = ctx.updates.filter((item) => item.fn !== fnRef.current);
        };
      },
      // eslint-disable-next-line
      [fnRef.current]
    );
    return { state: ctx.state, update: ctx.update };
  }
  return { Provider, useCtx };
}

export function matchRoutePath(
  routes: RouteItem[],
  path: string,
  pre?: RouteItem[]
): RouteItem[] {
  const match = pre || [];
  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    if (r.path === path) {
      return [...match, r];
    }
    if (r.routes) {
      const ms = matchRoutePath(r.routes, path, [...match, r]);
      if (ms.length > 0) {
        return ms;
      }
    }
  }
  return [];
}
