import { API_URL } from "../Constants/ApiConstant";

export function postRate(callback, data) {
  const token = localStorage.getItem("token");
  fetch(`${API_URL}/postrate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(callback);
}
