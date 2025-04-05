import { FastifyBaseLogger } from "fastify";
import proxmoxApi from "proxmox-api";

export const proxmoxAPI = (() => {
  let initialized = false;
  let host: string;
  let tokenId: string;
  let tokenSecret: string;

  const init = ({
    host: initHost,
    tokenId: initTokenId,
    tokenSecret: initTokenSecret,
    logger,
  }: {
    host: string;
    tokenId: string;
    tokenSecret: string;
    logger: FastifyBaseLogger;
  }) => {
    if (initialized) {
      throw new Error("ProxmoxAPI is already initialized");
    }

    if (!initHost.trim()) {
      logger.error("LAZCO_PVE_CLUSTER_HOST is not set");
    } else if (!initTokenId.trim()) {
      logger.error("LAZCO_PVE_CLUSTER_API_TOKEN_ID is not set");
    } else if (!initTokenSecret.trim()) {
      logger.error("LAZCO_PVE_CLUSTER_API_TOKEN_SECRET is not set");
    } else {
      host = initHost;
      tokenId = initTokenId;
      tokenSecret = initTokenSecret;

      initialized = true;
    }
  };

  const instance = () => {
    if (!initialized) {
      throw new Error("ProxmoxAPI is not initialized");
    }

    return proxmoxApi({
      host,
      tokenID: tokenId,
      tokenSecret,
    });
  };

  return { init, instance };
})();
