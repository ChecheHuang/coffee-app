import { create } from "zustand";
import type { MachineState } from "@/types/machine";

export const useMachineStore = create<MachineState>(() => ({
  isConnected: true,
  connectionType: "wifi",
  waterLevel: 78,
  beanLevel: 45,
  wasteCount: 3,
  wasteCapacity: 12,
  descaleStatus: "ok",
  firmwareVersion: "v2.3.1",
  isLatestFirmware: true,
  model: "BrewMaster Pro X1",
  serialNumber: "SN-20250815-ABCD",
  purchaseDate: new Date("2025-08-15").getTime(),
  warrantyEndDate: new Date("2026-08-15").getTime(),
}));
