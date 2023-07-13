const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;

/*
 * It allows to extract the value and the unit of measurement for the time.
 * For example, indicating a string like "1s" or "1 second" or "3 hour"
 * the regex extracts a group made up of [1, "s"], [1, "second"] or [3, "hour"]
 */
const REGEX =
  /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;

export default (str: string): number => {
  const matched = REGEX.exec(str);

  if (!matched) {
    throw new TypeError('Invalid time period format');
  }

  const value = parseFloat(matched[1]!);
  const unit = matched[2]!.toLowerCase();

  switch (unit) {
    case 'sec':
    case 'secs':
    case 'second':
    case 'seconds':
    case 's':
      return Math.round(value);
    case 'minute':
    case 'minutes':
    case 'min':
    case 'mins':
    case 'm':
      return Math.round(value * minute);
    case 'hour':
    case 'hours':
    case 'hr':
    case 'hrs':
    case 'h':
      return Math.round(value * hour);
    case 'day':
    case 'days':
    case 'd':
      return Math.round(value * day);
    case 'week':
    case 'weeks':
    case 'w':
      return Math.round(value * week);
    // years matched
    default:
      return Math.round(value * year);
  }
};
