import Colors from '../Themes/Colors'
import I18n from '../I18n'

export const PaymentConfig = {
  qrcode: {
    key: 'qrcode',
    icon: 'qrcode',
    title: '生成二维码',
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.text002,
  },
  scan: {
    key: 'scan',
    icon: 'barcode-scan',
    title: '扫一扫收款',
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.text002,
  }
};

export const KeyboardConfig = {
  one: {
    key: 'one',
    label: '1',
  },
  two: {
    key: 'two',
    label: '2',
  },
  three: {
    key: 'three',
    label: '3',
  },
  four: {
    key: 'four',
    label: '4',
  },
  five: {
    key: 'five',
    label: '5',
  },
  six: {
    key: 'six',
    label: '6',
  },
  seven: {
    key: 'seven',
    label: '7',
  },
  eight: {
    key: 'eight',
    label: '8',
  },
  nine: {
    key: 'nine',
    label: '9',
  },
  point: {
    key: 'point',
    label: '.',
  },
  zero: {
    key: 'zero',
    label: '0',
  },
  delete: {
    key: 'delete',
    label: 'x',
  }
};

export const LoginConfig = {
  username: {
    key: 'username',
    icon: 'user',
    placeholder: '请输入用户名',
    returnKey: "next"
  },
  password: {
    key: 'password',
    icon: 'unlock',
    placeholder: '请输入密码',
    returnKey: "done"
  }
};

export const MenuConfig = {
  language: {
    key: 'language',
    icon: 'user',
    title: I18n.t('MenuLanguage'),
    screen: 'LanguageScreen'
  },
  currency: {
    key: 'currency',
    icon: 'user',
    title: I18n.t('MenuCurrency'),
    screen: 'CurrencyScreen'
  },
  update: {
    key: 'update',
    icon: 'user',
    title: I18n.t('MenuUpdate'),
    screen: 'UpdateScreen'
  },
  about: {
    key: 'about',
    icon: 'user',
    title: I18n.t('MenuAbout'),
    screen: 'InfoScreen'
  },
  logout: {
    key: 'logout',
    icon: 'user',
    title: I18n.t('MenuLogout'),
    screen: undefined
  }
};

export const LanguageConfig = {
  zh: {
    key: 'zh',
    title: '简体中文',
    locale: 'zh'

  },
  english: {
    key: 'english',
    title: 'English',
    locale: 'en'
  }
};

export const CurrencyConfig = {
  CNY: {
    fiatType: 1,
    symbol: '￥',
    fiatSymbol: 'CNY',
    title: '人民币(CNY)'
  },
  USD: {
    fiatType: 2,
    symbol: '$',
    fiatSymbol: 'USD',
    title: '美元(USD)'
  },
  HKD: {
    fiatType: 3,
    symbol: '$',
    fiatSymbol: 'HKD',
    title: '港币(HKD)'
  },
  JPY: {
    fiatType: 4,
    symbol: '$',
    fiatSymbol: 'JPY',
    title: '日元(JPY)'
  },
  KRW: {
    fiatType: 5,
    symbol: '$',
    fiatSymbol: 'KRW',
    title: '韩币(KRW)',
  },
  SGD: {
    fiatType: 6,
    symbol: '$',
    fiatSymbol: 'SGD',
    title: '新加坡币(SGD)',
  }
};
