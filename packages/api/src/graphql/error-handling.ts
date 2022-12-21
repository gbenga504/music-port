import { objectType } from "nexus";

export const GraphQLError = objectType({
  name: "PlaylistError",
  definition(t) {
    t.string("name", { description: "Name of the error" });
    t.string("message", { description: "Message sent with the error" });
  },
});
