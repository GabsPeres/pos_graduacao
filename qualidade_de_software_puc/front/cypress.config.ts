import { defineConfig } from "cypress";
import axios from "axios";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async "db:erase"() {
          const { data } = await axios.delete(`http://localhost:3000/users`);
          return data;
        },

        async "db:create"(event) {
          const { data } = await axios.post(
            "http://localhost:3000/users",
            event
          );
          return data;
        },

        async "db:find"(query) {
          const { data } = await axios.get(
            `http://localhost:3000/users?email=${query.email}`
          );
          return data[0];
        },

        async "db:update"(user) {
          const { data } = await axios.put(
            "http://localhost:3000/users",
            user
          );
          return data;
        },
      });
    },
  },
});