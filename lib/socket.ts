let socket: WebSocket | null = null;

export function getSocket(): WebSocket {
  if (!socket) {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!url) {
      throw new Error("NEXT_PUBLIC_SOCKET_URL is not defined");
    }
    socket = new WebSocket(url);
  }
  return socket;
}
