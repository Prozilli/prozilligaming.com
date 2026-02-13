import { onRequestDelete as __api_prismai___path___ts_onRequestDelete } from "/Users/widlersanon/Projects/prozilligaming.com/functions/api/prismai/[[path]].ts"
import { onRequestGet as __api_prismai___path___ts_onRequestGet } from "/Users/widlersanon/Projects/prozilligaming.com/functions/api/prismai/[[path]].ts"
import { onRequestOptions as __api_prismai___path___ts_onRequestOptions } from "/Users/widlersanon/Projects/prozilligaming.com/functions/api/prismai/[[path]].ts"
import { onRequestPost as __api_prismai___path___ts_onRequestPost } from "/Users/widlersanon/Projects/prozilligaming.com/functions/api/prismai/[[path]].ts"
import { onRequestPut as __api_prismai___path___ts_onRequestPut } from "/Users/widlersanon/Projects/prozilligaming.com/functions/api/prismai/[[path]].ts"

export const routes = [
    {
      routePath: "/api/prismai/:path*",
      mountPath: "/api/prismai",
      method: "DELETE",
      middlewares: [],
      modules: [__api_prismai___path___ts_onRequestDelete],
    },
  {
      routePath: "/api/prismai/:path*",
      mountPath: "/api/prismai",
      method: "GET",
      middlewares: [],
      modules: [__api_prismai___path___ts_onRequestGet],
    },
  {
      routePath: "/api/prismai/:path*",
      mountPath: "/api/prismai",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_prismai___path___ts_onRequestOptions],
    },
  {
      routePath: "/api/prismai/:path*",
      mountPath: "/api/prismai",
      method: "POST",
      middlewares: [],
      modules: [__api_prismai___path___ts_onRequestPost],
    },
  {
      routePath: "/api/prismai/:path*",
      mountPath: "/api/prismai",
      method: "PUT",
      middlewares: [],
      modules: [__api_prismai___path___ts_onRequestPut],
    },
  ]