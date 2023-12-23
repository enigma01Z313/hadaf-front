const getTheUser = () => {
  const theUserStr = localStorage.getItem("user");
  if (!theUserStr) return {};

  const theUser = JSON.parse(theUserStr);
  return theUser;
};

export default getTheUser;
