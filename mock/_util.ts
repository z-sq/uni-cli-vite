import { Recordable } from 'vite-plugin-mock';

/** 业务处理成功响应体规范 */
export function resultSuccess<T = Recordable>(data: T, { errMsg = 'ok' } = {}) {
  return {
    success: true,
    data,
    errCode: 0,
    errMsg
  };
}

/** 业务处理失败响应体规范 */
export function resultError(
  errMsg = 'Request failed',
  { errCode = -1, data = null } = {}
) {
  return {
    success: false,
    data,
    errCode,
    errMsg
  };
}

export function pagination<T = any>(
  current: number,
  pageSize: number,
  array: T[]
): T[] {
  const offset = (current - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}

/** 分页列表响应体规范 */
export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { errMsg = 'ok' } = {}
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      list: pageData,
      total: list.length
    }),
    errMsg
  };
}
