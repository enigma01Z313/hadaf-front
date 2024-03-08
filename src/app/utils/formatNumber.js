const formatReadableNumber = (number) => {
  if (!number) return "";

  const arr = String(number).split("");
  const arr2 = arr.reverse();
  const arr3 = [];

  arr2.forEach((v, i) => {
    if (i !== 0 && i % 3 === 0) arr3.push(",");
    arr3.push(v);
  });

  return arr3.reverse().join('');
};

export default formatReadableNumber;
