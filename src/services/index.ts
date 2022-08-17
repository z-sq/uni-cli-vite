import request from '@/common/request';

/** 接口示例 GET /api/rule */
export async function getRule(
  body: API.PageParams,
  options?: { [key: string]: any }
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    data: body,
    ...(options || {})
  });
}
