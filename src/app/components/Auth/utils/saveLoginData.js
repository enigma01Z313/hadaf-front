const saveLoginData = ({ accessToken, refreshToken, user, meta }) => {
  console.log("saving login data");
  console.log(user);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refresToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("meta", JSON.stringify(meta));
};

export default saveLoginData;
