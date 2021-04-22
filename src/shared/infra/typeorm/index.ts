import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "172.18.0.2"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};