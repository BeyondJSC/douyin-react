import { Request } from '../plugins/request'

const instance = new Request({
  baseURL: import.meta.env.VITE_VUE_APP_BASE_DOMAIN,
  headers: {
    'Accept-Language': 'zh-CN',
  },
  businessErrorCatch(failRes) {
    if (failRes.code === 'error') {
      // ElMessage({
      //   message: failRes.message,
      //   type: 'warning'
      // })
    }
  },
  errorCatch() {
    return true
  }
})

export const requestInstacne = instance