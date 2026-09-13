import { defineHandler } from "nitro";

export default defineHandler(async () => {
  return {
    message: "Server is working!",
    timestamp: new Date().toISOString()
  };
});