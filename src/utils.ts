/**
 * @param str
 * 将字符串的首字母转换为大写
 */
export const upperFirst = (str: string): string => {
  return str.replace(/^\S/, s => s.toUpperCase())
}