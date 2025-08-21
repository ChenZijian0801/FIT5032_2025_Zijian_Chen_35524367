// functions/users.js

/**
 * 这个云函数现在只用于演示 API 调用是成功的。
 * 真正的数据将从前端的 JSON 文件加载。
 */
export async function onRequestGet(context) {
  const status = {
    api: "online",
    message: "User API is running."
  };

  return new Response(JSON.stringify(status), {
    headers: { 'Content-Type': 'application/json' },
  });
}