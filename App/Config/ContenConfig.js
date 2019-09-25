import Colors from '../Themes/Colors'

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
    key:'one',
    label: '1',
  },
  two: {
    key:'two',
    label: '2',
  },
  three: {
    key:'three',
    label: '3',
  },
  four: {
    key:'four',
    label: '4',
  },
  five: {
    key:'five',
    label: '5',
  },
  six: {
    key:'six',
    label: '6',
  },
  seven: {
    key:'seven',
    label: '7',
  },
  eight: {
    key:'eight',
    label: '8',
  },
  nine: {
    key:'nine',
    label: '9',
  },
  point: {
    key:'point',
    label: '.',
  },
  zero: {
    key:'zero',
    label: '0',
  },
  delete: {
    key:'delete',
    label: 'x',
  }
};
