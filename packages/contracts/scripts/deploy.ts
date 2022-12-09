// polygon evm needs to specify gas limit manually
async function main() {
  const deployments = {};
  console.log("deployements", deployments);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
