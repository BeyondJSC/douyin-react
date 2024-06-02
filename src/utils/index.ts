import dayjs from "dayjs"

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getResultByPaganition<T = unknown>(data: T[], pageNo: number, pageSize: number) {
  // 计算开始和结束索引
  const startIndex = (pageNo - 1) * pageSize
  const endIndex = pageNo * pageSize

  // 返回指定页码的数据
  return cloneDeep(data.slice(startIndex, endIndex))
}

export function cloneDeep<T = unknown>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function getFullImgaeUrl(fileName: string) {
  if (!fileName) return ''

  return `${import.meta.env.VITE_VUE_APP_BASE_PATH}/images/${fileName}`
}

export function formatNumber(num: number): string {
  if (!num) return ''

  if (num > 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  } else if (num > 10000) {
    return (num / 10000).toFixed(1) + '万'
  }

  return num.toString()
}

export function formatTime(num: number): string {
  if (!num) return '00:00'

  const minute = Math.floor(num / 60)
  const second = Math.floor(num % 60)

  return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

export function normalizeTime(time: number) {
  const date = dayjs(time * 1000)
  const now = dayjs()
  const duration = now.valueOf() - date.valueOf()

  let res = ''

  if (duration < 1000 * 60) {
    res = '刚刚'
  } else if (duration < 1000 * 60 * 60) {
    res = `${Math.floor(duration / (1000 * 60))}分钟前`
  } else if (duration < 1000 * 60 * 60 * 24) {
    res = `${Math.floor(duration / (1000 * 60 * 60))}小时前`
  } else if (duration < 1000 * 60 * 60 * 24 * 2) {
    res = '1天前'
  } else if (duration < 1000 * 60 * 60 * 24 * 3) {
    res = '2天前'
  } else if (duration < 1000 * 60 * 60 * 24 * 4) {
    res = '3天前'
  } else if (date.isSame(now, 'year')) {
    res = date.format('MM-DD')
  } else {
    res = date.format('YYYY-MM-DD')
  }

  return res
}

export function sampleSize<T = unknown>(arr: T[], num: number): T[] {
  const sample: T[] = []
  const indexSet = new Set<number>()

  while(sample.length < num) {
    const index = Math.floor(Math.random() * arr.length)
    if (indexSet.has(index)) {
      continue
    }
    indexSet.add(index)
    sample.push(arr[index])
  }

  return sample
}

export function copyStr(str: string) {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}