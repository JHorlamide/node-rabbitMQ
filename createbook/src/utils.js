export function onError(error) {
  console.error(`Failed to start server:\n${error.stack}`);
  process.exit(1);
}
