export interface MachineState {
  readonly isConnected: boolean;
  readonly connectionType: "ble" | "wifi" | "none";
  readonly waterLevel: number; // 0-100%
  readonly beanLevel: number; // 0-100%
  readonly wasteCount: number; // 渣盒目前量
  readonly wasteCapacity: number; // 渣盒容量
  readonly descaleStatus: "ok" | "needed" | "overdue";
  readonly firmwareVersion: string;
  readonly isLatestFirmware: boolean;
  readonly model: string;
  readonly serialNumber: string;
  readonly purchaseDate: number;
  readonly warrantyEndDate: number;
}
