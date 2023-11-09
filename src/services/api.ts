import { request } from "@/utils/request";

/** MOCK数据 */
type MockRandom = Record<string, any> & {
  id?: number;
  image?: string;
  name?: string;
  cname?: string;
  mobile?: string;
  email?: string;
  date?: string;
  datetime?: string;
  id_card?: string;
  ip?: string;
  url?: string;
  county?: string;
  csentence?: string;
  boolean?: boolean;
};

/** 获取规则列表 GET /api/rule */
export async function getRule(params: API.PageParams) {
  return request<API.PageList<MockRandom>>(`/api/rule`, {
    method: "GET",
    params,
  });
}

/** 新建规则 POST /api/rule */
export async function addRule() {
  return request<MockRandom>(`/api/rule`, {
    method: "POST",
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule() {
  return request<MockRandom>(`/api/rule`, {
    method: "PUT",
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule() {
  return request(`/api/rule`, {
    method: "DELETE",
  });
}
