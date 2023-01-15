import { request, type HttpRequestConfig } from '@/utils/request';

/** 获取规则列表 GET /api/rule */
export async function getRule(params: API.PageParams, options?: HttpRequestConfig) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params,
    ...(options || {})
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: HttpRequestConfig) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {})
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: HttpRequestConfig) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {})
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: HttpRequestConfig) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {})
  });
}
