import * as config from '../../../public/static/config/serverConfig.json'

export const mobileResultCode = {
  SUCCESS: '200',
  NEED_ROLE_SELECT: '20012',
  MISSING_PARAMETER: '400',
  LOGIN_NOT: '401',
  INVALID_PARAMETER: '402',
  INVALID_LOGIN_INFORMATION: '403',
  INVALID_INTERFACE: '404',
  INTERNAL_ERROR: '500',
  NO_DATA: '20010',
  NO_JURISDICTION: '20011'
}
const modelInfoArray = config.menu

export const getInfoByModelId = (modelId) => {
  return modelInfoArray.filter(model => model.name === modelId)[0]
}
