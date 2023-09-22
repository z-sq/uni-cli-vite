import { request } from "@/utils/request";

/** 获取当前的用户 GET /api/user/currentUser */
export async function currentUser() {
  return request("/api/user/currentUser", {
    method: "GET",
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin() {
  return request("/api/user/logout", {
    method: "POST",
  });
}

/** 登录接口 POST /api/user/login */
export async function login(data: any) {
  return request("/api/user/login", {
    method: "POST",
    data,
  });
}
