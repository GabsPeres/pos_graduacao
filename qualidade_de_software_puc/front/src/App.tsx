import { Admin, Resource, ShowGuesser } from "react-admin";
import { UserEdit, UserList, UserCreate } from "./user";

import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("http://127.0.0.1:3000");

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="Users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      show={ShowGuesser}
    />
  </Admin>
);
