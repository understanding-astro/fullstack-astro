/**
 * @param t ISO 8601 string
 * e.g., from '2023-05-28T09:11:18.376Z' to "11:11:18 AM"
 */

export const simpleISOStringParser = (t: string) => {
  try {
    const dateTimeFormat = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return dateTimeFormat.format(new Date(t));
  } catch (error) {
    return t;
  }
};
