import { mock, Random } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultPageSuccess, resultError } from './_util';

// 拓展mockjs
Random.extend({
  phone: function (): string {
    var phonePrefixs = ['132', '135', '189']; // 自己写前缀哈
    return this.pick(phonePrefixs) + mock(/\d{8}/); // Number()
  }
});

export default [
  {
    url: '/api/rule',
    timeout: 1000,
    method: 'get',
    response: (req: { query: { current: number; pageSize: number } }) => {
      const { current: page, pageSize } = req.query;
      const { list } = mock({
        'list|100': [
          {
            id: '@increment()',
            image: '@image()',
            name: '@name()',
            cname: '@cname()',
            mobile: '@phone()',
            email: '@email(xx.com)',
            date: '@date()',
            datetime: '@datetime()',
            id_card: '@id()',
            ip: '@ip()',
            url: '@url(http)',
            county: '@county(true)',
            csentence: '@csentence()',
            boolean: '@boolean()'
          }
        ]
      });
      return resultPageSuccess(page, pageSize, list);
    }
  },
  {
    url: '/api/rule/:id',
    timeout: 1000,
    method: 'get',
    response: () => {
      const dataSource = mock({
        id: '@increment()',
        image: '@image()',
        name: '@name()',
        cname: '@cname()',
        mobile: '@phone()',
        email: '@email(xx.com)',
        date: '@date()',
        datetime: '@datetime()',
        id_card: '@id()',
        ip: '@ip()',
        url: '@url(http)',
        county: '@county(true)',
        csentence: '@csentence()',
        boolean: '@boolean()'
      });
      return resultSuccess(dataSource);
    }
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    }
  },
  {
    url: '/api/500',
    statusCode: 500,
    response: resultError()
  },
  {
    url: '/api/404',
    statusCode: 404,
    response: resultError('No message available')
  }
] as MockMethod[];
