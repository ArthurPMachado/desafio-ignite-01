export function getQueryParams(query) {
  return query
    .substr(1) // remove question mark
    .split('&')
    .reduce((queryParams, param) => {
      const [ key, value ] = param.split('=')

      queryParams[key] = value

      return queryParams
    }, {})
}
