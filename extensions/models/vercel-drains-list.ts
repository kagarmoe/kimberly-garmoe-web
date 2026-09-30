// ponytail: adds `list` to the pulled @swamp/vercel/drains type, which only
// offers a single-match `lookup`. Writes one "state" record per drain, keyed by
// drain id, so a specific drain can then be adopted.
import { z } from "npm:zod@4.3.6";
import { listAll } from "../../.swamp/pulled-extensions/@swamp/vercel/drains/models/_lib/vercel.ts";

export const extension = {
  type: "@swamp/vercel/drains/drains",
  methods: [
    {
      list: {
        description: "List every drain on the team and write each as a state record named by id",
        arguments: z.object({}),
        // deno-lint-ignore no-explicit-any
        execute: async (_args: Record<string, never>, context: any) => {
          const g = context.globalArgs;
          const items = await listAll("/v1/drains", "none", { token: g.token }, {
            teamId: g.teamId,
            slug: g.slug,
          });
          const dataHandles = [];
          for (const item of items) {
            dataHandles.push(await context.writeResource("state", String(item.id), item));
          }
          return { dataHandles };
        },
      },
    },
  ],
};
