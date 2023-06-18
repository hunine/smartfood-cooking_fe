export class PaginationHelper {
  public objectToString(obj: any, prefix = '') {
    let str = '';

    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        str += this.objectToString(obj[key], `${prefix}${key}.`);
      } else {
        str += `${prefix}${key}=${obj[key]}&`;
      }
    }

    return str;
  }
}
