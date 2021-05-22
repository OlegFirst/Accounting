export const ROUTER_PATH = [
  {
    title: 'Рахунки',
    url: '/'
  },
  {
    title: 'Доходи',
    url: '/incomes'
  },
  {
    title: 'Статті витрат',
    url: '/costs'
  },
  {
    title: 'Бюджет',
    url: '/graph'
  }
];

export const AUTHENTICATION = {
  name: {
    length: 8,
    pattern: /[a-zA-Z]{1,}/
  },
  password: {
    length: 8,
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,}/
  }
};

// Server settings
//export const hostName = 'http://www.account.zp.ua/magisterstka/index.php/';
export const hostName = 'http://localhost/magisterstka/index.php/';