const calcColor = (amount, treshholds, direction) => {
  if (!amount) return "";

  if (direction === 1) {
    if (amount <= treshholds[1]) return "border-red";
    if (amount <= treshholds[2]) return "border-orange";
    if (amount > treshholds[2]) return "border-green";
  } else {
    if (amount >= treshholds[1]) return "border-red";
    if (amount >= treshholds[2]) return "border-orange";
    if (amount < treshholds[2]) return "border-green";
  }
};

export default calcColor;
