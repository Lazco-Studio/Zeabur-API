export async function createVmsService(option: CreateVmsServiceOption) {
  return {
    option,
    ip: "127.0.0.1",
    managedId: "123",
  };
}

export type CreateVmsServiceOption = {
  name: "string";
  region: VmsRegion;
  plan: VmsPlan;
  password: "string";
  labels: Record<string, string>;
};

export enum VmsRegion {
  TPE1 = "tpe1",
}

export enum VmsPlan {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}
