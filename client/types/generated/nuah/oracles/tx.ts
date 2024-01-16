/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.oracles";

export interface MsgCreateData {
  creator: string;
  index: string;
  key: string;
  value: string;
}

export interface MsgCreateDataResponse {}

export interface MsgUpdateData {
  creator: string;
  index: string;
  key: string;
  value: string;
}

export interface MsgUpdateDataResponse {}

export interface MsgDeleteData {
  creator: string;
  index: string;
}

export interface MsgDeleteDataResponse {}

function createBaseMsgCreateData(): MsgCreateData {
  return { creator: "", index: "", key: "", value: "" };
}

export const MsgCreateData = {
  encode(
    message: MsgCreateData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.index !== "") {
      writer.uint32(18).string(message.index);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.index = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        case 4:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateData {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      index: isSet(object.index) ? String(object.index) : "",
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: MsgCreateData): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.index !== undefined && (obj.index = message.index);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateData>, I>>(
    object: I
  ): MsgCreateData {
    const message = createBaseMsgCreateData();
    message.creator = object.creator ?? "";
    message.index = object.index ?? "";
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMsgCreateDataResponse(): MsgCreateDataResponse {
  return {};
}

export const MsgCreateDataResponse = {
  encode(
    _: MsgCreateDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateDataResponse {
    return {};
  },

  toJSON(_: MsgCreateDataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateDataResponse>, I>>(
    _: I
  ): MsgCreateDataResponse {
    const message = createBaseMsgCreateDataResponse();
    return message;
  },
};

function createBaseMsgUpdateData(): MsgUpdateData {
  return { creator: "", index: "", key: "", value: "" };
}

export const MsgUpdateData = {
  encode(
    message: MsgUpdateData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.index !== "") {
      writer.uint32(18).string(message.index);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.index = reader.string();
          break;
        case 3:
          message.key = reader.string();
          break;
        case 4:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateData {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      index: isSet(object.index) ? String(object.index) : "",
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: MsgUpdateData): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.index !== undefined && (obj.index = message.index);
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateData>, I>>(
    object: I
  ): MsgUpdateData {
    const message = createBaseMsgUpdateData();
    message.creator = object.creator ?? "";
    message.index = object.index ?? "";
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMsgUpdateDataResponse(): MsgUpdateDataResponse {
  return {};
}

export const MsgUpdateDataResponse = {
  encode(
    _: MsgUpdateDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateDataResponse {
    return {};
  },

  toJSON(_: MsgUpdateDataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateDataResponse>, I>>(
    _: I
  ): MsgUpdateDataResponse {
    const message = createBaseMsgUpdateDataResponse();
    return message;
  },
};

function createBaseMsgDeleteData(): MsgDeleteData {
  return { creator: "", index: "" };
}

export const MsgDeleteData = {
  encode(
    message: MsgDeleteData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.index !== "") {
      writer.uint32(18).string(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteData {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      index: isSet(object.index) ? String(object.index) : "",
    };
  },

  toJSON(message: MsgDeleteData): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteData>, I>>(
    object: I
  ): MsgDeleteData {
    const message = createBaseMsgDeleteData();
    message.creator = object.creator ?? "";
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseMsgDeleteDataResponse(): MsgDeleteDataResponse {
  return {};
}

export const MsgDeleteDataResponse = {
  encode(
    _: MsgDeleteDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteDataResponse {
    return {};
  },

  toJSON(_: MsgDeleteDataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteDataResponse>, I>>(
    _: I
  ): MsgDeleteDataResponse {
    const message = createBaseMsgDeleteDataResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateData(request: MsgCreateData): Promise<MsgCreateDataResponse>;
  UpdateData(request: MsgUpdateData): Promise<MsgUpdateDataResponse>;
  DeleteData(request: MsgDeleteData): Promise<MsgDeleteDataResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateData = this.CreateData.bind(this);
    this.UpdateData = this.UpdateData.bind(this);
    this.DeleteData = this.DeleteData.bind(this);
  }
  CreateData(request: MsgCreateData): Promise<MsgCreateDataResponse> {
    const data = MsgCreateData.encode(request).finish();
    const promise = this.rpc.request("nuah.oracles.Msg", "CreateData", data);
    return promise.then((data) =>
      MsgCreateDataResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateData(request: MsgUpdateData): Promise<MsgUpdateDataResponse> {
    const data = MsgUpdateData.encode(request).finish();
    const promise = this.rpc.request("nuah.oracles.Msg", "UpdateData", data);
    return promise.then((data) =>
      MsgUpdateDataResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteData(request: MsgDeleteData): Promise<MsgDeleteDataResponse> {
    const data = MsgDeleteData.encode(request).finish();
    const promise = this.rpc.request("nuah.oracles.Msg", "DeleteData", data);
    return promise.then((data) =>
      MsgDeleteDataResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
