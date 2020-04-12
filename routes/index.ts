import HotCache from "../lib/hotCache.ts";
import { getPlaylists, getPlaylistItems } from "../api/youtube.ts";

const playlistsHotCache = new HotCache();
const playlistItemsHotCache = new HotCache();

playlistsHotCache.cache.set('TEST_KEY', 'TEST_SUCCESS')
playlistsHotCache.updateMap.set('TEST_KEY', new Date().toISOString())
playlistItemsHotCache.cache.set("TEST_KEY", "TEST_SUCCESS");
playlistItemsHotCache.updateMap.set("TEST_KEY", new Date().toISOString());

const routes = [
  {
    method: "GET",
    path: "/",
    handler: async (request: any) => {
      return 'success'
    },
  },
  {
    method: "GET",
    path: "/playlists",
    handler: async (request: any) => {
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
        return await playlistsHotCache.getData(id, remoteGetter);
      } catch (err) {
        throw new Error("500");
      }
    },
  },
  {
    method: "GET",
    path: "/playlistItems",
    handler: async (request: any) => {
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
        return await playlistItemsHotCache.getData(id, remoteGetter);
      } catch (err) {
        throw new Error("500");
      }
    },
  },
];

export default routes;
