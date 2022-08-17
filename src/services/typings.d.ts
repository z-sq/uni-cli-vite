declare namespace API {
  /** 请求参数 */
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  /** MOCK数据 */
  type RuleListItem = {
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

  /** MOCK列表数据 */
  type RuleList = {
    list?: RuleListItem[];
    total?: number;
  };
}
