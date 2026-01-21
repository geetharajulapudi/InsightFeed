import { v4 as uuidv4 } from "uuid";

// Function to get or create a unique user UUID stored in localStorage.
export function getUserUUID() {
  let uuid = localStorage.getItem("user_uuid");

  // If no UUID exists, generate a new one and store it.
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("user_uuid", uuid);
  }
  return uuid;
}
