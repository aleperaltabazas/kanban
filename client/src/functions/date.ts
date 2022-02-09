import { DateTime } from "luxon";

export const compareLuxonDates = (d1: DateTime, d2: DateTime) =>
  d1.toMillis() - d2.toMillis();
