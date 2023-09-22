import Mockjs from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "./_util";

export default [
  {
    url: "/api/user/currentUser",
    timeout: 1000,
    method: "get",
    response: () => {
      const dataSource = Mockjs.mock({
        avatarUrl: "//picsum.photos/80",
        nickName: "@cname()",
        userName: "@name()",
        gender: 1,
      });
      return resultSuccess(dataSource);
    },
  },
  {
    url: "/api/user/login",
    timeout: 1000,
    method: "post",
    response: (req: { body: { username?: string; password?: string } }) => {
      const { username, password } = req.body;
      if (username && password) {
        return resultSuccess();
      } else {
        return resultError();
      }
    },
  },
  {
    url: "/api/user/logout",
    timeout: 1000,
    method: "post",
    response: resultSuccess,
  },
] as MockMethod[];
