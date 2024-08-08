export default function consoleAssertEnvVars() {
  // console assert existence of env variables, helpful for detecting this issue in docker
  console.assert(
    process.env.DATABASE_URL ?? false,
    "Env variable DATABASE_URL was not found."
  );
  console.assert(
    process.env.DIRECT_URL ?? false,
    "Env variable DIRECT_URL was not found."
  );
  console.assert(
    process.env.API_NINJAS_KEY ?? false,
    "Env variable DATABASE_URL was not found."
  );
}
