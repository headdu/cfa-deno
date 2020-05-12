import HotCache from "../lib/hotCache.ts";
import { getPlaylists, getPlaylistItems } from "../api/youtube.ts";

const playlistsHotCache = new HotCache();
const playlistItemsHotCache = new HotCache();

playlistsHotCache.cache.set('TEST_KEY', 'TEST_SUCCESS')
playlistsHotCache.updateMap.set('TEST_KEY', new Date().toISOString())
playlistItemsHotCache.cache.set("TEST_KEY", "TEST_SUCCESS");
playlistItemsHotCache.updateMap.set("TEST_KEY", new Date().toISOString());

function setCors(res: any) {
  console.log(res)
  if (!res.headers) {
    res.headers = new Headers()
  }
  res.headers.append("access-control-allow-origin", "*");
  res.headers.append(
    "access-control-allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Range"
  );
  return res
}

const routes = [
  {
    method: "GET",
    path: "/",
    handler: async (request: any, h: any) => {
      return setCors(h.response('success'))
    },
  },
  {
    method: "GET",
    path: "/playlists",
    handler: async (request: any, h: any) => {
      console.log("received a request to get playlists");
      const id = request.searchParams.get("id");
      console.log("ID is " + id);
      if (!id) {
        throw new Error(
          JSON.stringify({
            error: "Internal Server Error",
            message: "Internal Server Error",
            status: 400,
          })
        );
      }
      try {
        const remoteGetter = async () => {
          return await getPlaylists(id);
        };
        const playlists = await playlistsHotCache.getData(id, remoteGetter)
        return setCors(h.response(playlists));
      } catch (err) {
        throw new Error("500");
      }
    },
  },
  {
    method: "GET",
    path: "/playlistItems",
    handler: async (request: any, h: any) => {
      console.log("Received a request to get playlist items");
      const id = request.searchParams.get("id");
      console.log("ID is " + id);
      if (!id) {
        throw new Error(
          JSON.stringify({
            error: "Internal Server Error",
            message: "Internal Server Error",
            status: 400,
          })
        );
      }
      try {
        const remoteGetter = async () => {
          return await getPlaylistItems(id);
        };
        return setCors(h.response(await playlistItemsHotCache.getData(id, remoteGetter)));
      } catch (err) {
        throw new Error("500");
      }
    },
  },
];

export default routes;
