import I18n from '../I18n';

export function transformApiError(code) {
  switch (parseInt(code)) {
    case 501:
      return {
        code,
        msg: I18n.t('Api501Error')
      }
    case 502:
      return {
        code,
        msg: I18n.t('Api502Error')
      }
    case 503:
      return {
        code,
        msg: I18n.t('Api503Error')
      }
    case 504:
      return {
        code,
        msg: I18n.t('Api504Error')
      }
    case 505:
      return {
        code,
        msg: I18n.t('Api505Error')
      }
    case 506:
      return {
        code,
        msg: I18n.t('Api506Error')
      }
    case 50001:
      return {
        code,
        msg: I18n.t('Api50001Error')
      }

    default:
      return undefined
  }
}
