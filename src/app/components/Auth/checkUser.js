const remainedValid = () => {
  return false;
  const currentTime = new Date().getTime();
  const createdTime = localStorage.getItem("api_key_created_at");

  if (!createdTime) return false;
  if (currentTime - createdTime > 60 * 60 * 1000) return false; //60 minutes 60 second 1000 milisecondds
  return true;
};

export default async function checkUser() {
  const googleToken = localStorage.getItem("google_token");
  const api_key = localStorage.getItem("api_key");

  if (remainedValid()) return true;

  if (!googleToken) return false;
  if (googleToken === "") return false;

  const checkUserUrl = "/api/auth/google";

  const res = await fetch(checkUserUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ googleToken }),
  });
  if (!res.ok) return false;

  const data = await res.json();
  // console.log('------------------------------');
  // if(!data.api_key === false) return false;

  const apiKey = data.api_key;

  if (apiKey) {
    localStorage.setItem("api_key", apiKey);
    localStorage.setItem("api_key_created_at", new Date().getTime());
    return true;
  }
  return false;
}
