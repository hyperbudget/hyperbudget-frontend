import moment from "moment";

declare const BACKEND_URL;

export const api_url = (path: string): string => {
    return `${BACKEND_URL}${path}`;
}

/**
 * Treats a date as if it were a UTC date; drop the timezone, or assume the
 * timezone is +00:00. This is helpful as clients that do `new Date('some
 * date')` always get the date in their local timezone and then horrible things
 * happen.
 * @param {Date} date - The date object
 * @returns {Date} - A UTC date.
 */
export const treatDateAsUTC = (date: Date): Date => moment(date).utcOffset(0).toDate();

/**
 * Converts a string like '201801' to a Date objnect.
 * @param {string} date
 */
export const convertDateStringToDate = (date: string): Date => {
  let [, y, m] = date.match(/(\d{4})(\d{2})/);
  let currentMonthMoment = moment(`${y}-${m}-01T00:00:00+00:00`);
  return currentMonthMoment.toDate();
}

/**
 * Turns off responsive mode
*/
export const deResponsifyPage = (): void => {
  const vp = document.querySelector('meta[name="viewport"]');
  // hack to get rid of responsive view
  if (vp && vp.getAttribute('content') !== '') {
    vp.setAttribute('content', '');
  }
}

export const responsifyPage = (): void => {
  const vp = document.querySelector('meta[name="viewport"]');
  if (vp) {
    vp.setAttribute('content', 'width=device-width, initial-scale=1, shrink-to-fit=no');
  }
}
