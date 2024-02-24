const calcDiff = (cur, pre, direction) => {
  if (
    typeof cur === typeof undefined ||
    typeof pre === typeof undefined ||
    cur === "" ||
    pre === ""
  )
    return "-";

  const tmp = Math.floor(((cur - pre) / pre) * 100);
  return direction === 2 ? tmp * -1 : tmp;
};

export default calcDiff;
