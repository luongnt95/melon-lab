import * as R from 'ramda';
import queryString from 'query-string';

export const parseUrl = R.memoize((url) => queryString.parseUrl(url));
export const extractQueryParam = R.curryN(2, (name, url) => {
  const parsed = parseUrl(url);
  return parsed.query && parsed.query[name];
});