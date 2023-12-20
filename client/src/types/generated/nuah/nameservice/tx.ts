/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.nameservice";

export interface MsgSetName {
  creator: string;
  name: string;
  value: string;
}

export interface MsgSetNameResponse {}

export interface MsgTransferName {
  creator: string;
  name: string;
  value: string;
}

export interface MsgTransferNameResponse {}

export interface MsgDeleteName {
  creator: string;
  name: string;
}

export interface MsgDeleteNameResponse {}

export interface MsgCheckName {
  creator: string;
  name: string;
}

export interface MsgCheckNameResponse {
  isFound: string;
}

function createBaseMsgSetName(): MsgSetName {
  return { creator: "", name: "", value: "" };
}

export const MsgSetName = {
  encode(
    message: MsgSetName,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetName {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: MsgSetName): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetName>, I>>(
    object: I
  ): MsgSetName {
    const message = createBaseMsgSetName();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMsgSetNameResponse(): MsgSetNameResponse {
  return {};
}

export const MsgSetNameResponse = {
  encode(
    _: MsgSetNameResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetNameResponse();
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

  fromJSON(_: any): MsgSetNameResponse {
    return {};
  },

  toJSON(_: MsgSetNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetNameResponse>, I>>(
    _: I
  ): MsgSetNameResponse {
    const message = createBaseMsgSetNameResponse();
    return message;
  },
};

function createBaseMsgTransferName(): MsgTransferName {
  return { creator: "", name: "", value: "" };
}

export const MsgTransferName = {
  encode(
    message: MsgTransferName,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferName {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      value: isSet(object.value) ? String(object.value) : "",
    };
  },

  toJSON(message: MsgTransferName): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferName>, I>>(
    object: I
  ): MsgTransferName {
    const message = createBaseMsgTransferName();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseMsgTransferNameResponse(): MsgTransferNameResponse {
  return {};
}

export const MsgTransferNameResponse = {
  encode(
    _: MsgTransferNameResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgTransferNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferNameResponse();
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

  fromJSON(_: any): MsgTransferNameResponse {
    return {};
  },

  toJSON(_: MsgTransferNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgTransferNameResponse>, I>>(
    _: I
  ): MsgTransferNameResponse {
    const message = createBaseMsgTransferNameResponse();
    return message;
  },
};

function createBaseMsgDeleteName(): MsgDeleteName {
  return { creator: "", name: "" };
}

export const MsgDeleteName = {
  encode(
    message: MsgDeleteName,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteName {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: MsgDeleteName): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteName>, I>>(
    object: I
  ): MsgDeleteName {
    const message = createBaseMsgDeleteName();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMsgDeleteNameResponse(): MsgDeleteNameResponse {
  return {};
}

export const MsgDeleteNameResponse = {
  encode(
    _: MsgDeleteNameResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteNameResponse();
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

  fromJSON(_: any): MsgDeleteNameResponse {
    return {};
  },

  toJSON(_: MsgDeleteNameResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeleteNameResponse>, I>>(
    _: I
  ): MsgDeleteNameResponse {
    const message = createBaseMsgDeleteNameResponse();
    return message;
  },
};

function createBaseMsgCheckName(): MsgCheckName {
  return { creator: "", name: "" };
}

export const MsgCheckName = {
  encode(
    message: MsgCheckName,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCheckName {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCheckName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCheckName {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: MsgCheckName): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCheckName>, I>>(
    object: I
  ): MsgCheckName {
    const message = createBaseMsgCheckName();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseMsgCheckNameResponse(): MsgCheckNameResponse {
  return { isFound: "" };
}

export const MsgCheckNameResponse = {
  encode(
    message: MsgCheckNameResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.isFound !== "") {
      writer.uint32(10).string(message.isFound);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCheckNameResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCheckNameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isFound = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCheckNameResponse {
    return {
      isFound: isSet(object.isFound) ? String(object.isFound) : "",
    };
  },

  toJSON(message: MsgCheckNameResponse): unknown {
    const obj: any = {};
    message.isFound !== undefined && (obj.isFound = message.isFound);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCheckNameResponse>, I>>(
    object: I
  ): MsgCheckNameResponse {
    const message = createBaseMsgCheckNameResponse();
    message.isFound = object.isFound ?? "";
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  SetName(request: MsgSetName): Promise<MsgSetNameResponse>;
  TransferName(request: MsgTransferName): Promise<MsgTransferNameResponse>;
  DeleteName(request: MsgDeleteName): Promise<MsgDeleteNameResponse>;
  CheckName(request: MsgCheckName): Promise<MsgCheckNameResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SetName = this.SetName.bind(this);
    this.TransferName = this.TransferName.bind(this);
    this.DeleteName = this.DeleteName.bind(this);
    this.CheckName = this.CheckName.bind(this);
  }
  SetName(request: MsgSetName): Promise<MsgSetNameResponse> {
    const data = MsgSetName.encode(request).finish();
    const promise = this.rpc.request("nuah.nameservice.Msg", "SetName", data);
    return promise.then((data) =>
      MsgSetNameResponse.decode(new _m0.Reader(data))
    );
  }

  TransferName(request: MsgTransferName): Promise<MsgTransferNameResponse> {
    const data = MsgTransferName.encode(request).finish();
    const promise = this.rpc.request(
      "nuah.nameservice.Msg",
      "TransferName",
      data
    );
    return promise.then((data) =>
      MsgTransferNameResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteName(request: MsgDeleteName): Promise<MsgDeleteNameResponse> {
    const data = MsgDeleteName.encode(request).finish();
    const promise = this.rpc.request(
      "nuah.nameservice.Msg",
      "DeleteName",
      data
    );
    return promise.then((data) =>
      MsgDeleteNameResponse.decode(new _m0.Reader(data))
    );
  }

  CheckName(request: MsgCheckName): Promise<MsgCheckNameResponse> {
    const data = MsgCheckName.encode(request).finish();
    const promise = this.rpc.request("nuah.nameservice.Msg", "CheckName", data);
    return promise.then((data) =>
      MsgCheckNameResponse.decode(new _m0.Reader(data))
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
