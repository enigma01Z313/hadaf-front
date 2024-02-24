import {
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
} from "date-fns-jalali-3";

import { startOfHistory } from "@/app/configs";

const calcCurrentorder = (continus) => {
  const ordersMethods = {
    daily: () =>
      eachDayOfInterval({
        start: startOfHistory,
        end: new Date(),
      }),
    weekly: () =>
      eachWeekOfInterval({
        start: startOfHistory,
        end: new Date(),
      }),
    monthly: () =>
      eachMonthOfInterval({
        start: startOfHistory,
        end: new Date(),
      }),
    seasonal: () =>
      eachQuarterOfInterval({
        start: startOfHistory,
        end: new Date(),
      }),
    yearly: () =>
      eachYearOfInterval({
        start: startOfHistory,
        end: new Date(),
      }),
  };

  const tmpArr = ordersMethods[continus]();
  const currentOrder = tmpArr.length;

  return currentOrder;
};

export default calcCurrentorder;
