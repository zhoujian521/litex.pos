/**
 * 获取法币类型的标识符
 *
 * @param {*} fiat
 */
export function getFiatSymbol(fiat) {
  console.log('============getFiatSymbol========================');
  console.log(fiat);
  console.log('============getFiatSymbol========================');
  switch (fiat) {
    case 'CNY':
      return '￥';
    case 'USD':
      return '$';

    default:
      return '$';
  }
}
