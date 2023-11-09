declare namespace API {
  /** 与后端约定的响应数据格式 */
  interface Response<T = any> {
    /** 业务上的请求是否成功 */
    success?: boolean;
    /** 业务约定的错误码 */
    errCode?: string | number;
    /** 业务上的错误信息 */
    errMsg?: string;
    /** 业务数据 */
    data: T;
  }

  /** 请求参数 */
  interface PageParams {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  }

  /** 列表数据 */
  interface PageList<T = any> {
    list?: T[];
    /** 列表的内容总数 */
    total?: number;
  }
}
