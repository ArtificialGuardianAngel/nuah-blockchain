/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.loan";

export interface MsgCreateRequest {
  creator: string;
  to: string;
  amount: number;
  denom: string;
}

export interface MsgCreateRequestResponse {}

export interface MsgCreateRequestBook {
  creator: string;
  to: string;
}

export interface MsgCreateRequestBookResponse {}

export interface MsgAcceptRequest {
  creator: string;
  id: number;
}

export interface MsgAcceptRequestResponse {}

export interface MsgDeclineRequest {
  creator: string;
  id: number;
}

export interface MsgDeclineRequestResponse {}

function createBaseMsgCreateRequest(): MsgCreateRequest {
  return { creator: "", to: "", amount: 0, denom: "" };
}

export const MsgCreateRequest = {
  encode(
    message: MsgCreateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int32(message.amount);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.to = reader.string();
          break;
        case 3:
          message.amount = reader.int32();
          break;
        case 4:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      to: isSet(object.to) ? String(object.to) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      denom: isSet(object.denom) ? String(object.denom) : "",
    };
  },

  toJSON(message: MsgCreateRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.to !== undefined && (obj.to = message.to);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.denom !== undefined && (obj.denom = message.denom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRequest>, I>>(
    object: I
  ): MsgCreateRequest {
    const message = createBaseMsgCreateRequest();
    message.creator = object.creator ?? "";
    message.to = object.to ?? "";
    message.amount = object.amount ?? 0;
    message.denom = object.denom ?? "";
    return message;
  },
};

function createBaseMsgCreateRequestResponse(): MsgCreateRequestResponse {
  return {};
}

export const MsgCreateRequestResponse = {
  encode(
    _: MsgCreateRequestResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRequestResponse();
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

  fromJSON(_: any): MsgCreateRequestResponse {
    return {};
  },

  toJSON(_: MsgCreateRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRequestResponse>, I>>(
    _: I
  ): MsgCreateRequestResponse {
    const message = createBaseMsgCreateRequestResponse();
    return message;
  },
};

function createBaseMsgCreateRequestBook(): MsgCreateRequestBook {
  return { creator: "", to: "" };
}

export const MsgCreateRequestBook = {
  encode(
    message: MsgCreateRequestBook,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateRequestBook {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRequestBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.to = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRequestBook {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      to: isSet(object.to) ? String(object.to) : "",
    };
  },

  toJSON(message: MsgCreateRequestBook): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.to !== undefined && (obj.to = message.to);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRequestBook>, I>>(
    object: I
  ): MsgCreateRequestBook {
    const message = createBaseMsgCreateRequestBook();
    message.creator = object.creator ?? "";
    message.to = object.to ?? "";
    return message;
  },
};

function createBaseMsgCreateRequestBookResponse(): MsgCreateRequestBookResponse {
  return {};
}

export const MsgCreateRequestBookResponse = {
  encode(
    _: MsgCreateRequestBookResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateRequestBookResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRequestBookResponse();
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

  fromJSON(_: any): MsgCreateRequestBookResponse {
    return {};
  },

  toJSON(_: MsgCreateRequestBookResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRequestBookResponse>, I>>(
    _: I
  ): MsgCreateRequestBookResponse {
    const message = createBaseMsgCreateRequestBookResponse();
    return message;
  },
};

function createBaseMsgAcceptRequest(): MsgAcceptRequest {
  return { creator: "", id: 0 };
}

export const MsgAcceptRequest = {
  encode(
    message: MsgAcceptRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcceptRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcceptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAcceptRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgAcceptRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAcceptRequest>, I>>(
    object: I
  ): MsgAcceptRequest {
    const message = createBaseMsgAcceptRequest();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgAcceptRequestResponse(): MsgAcceptRequestResponse {
  return {};
}

export const MsgAcceptRequestResponse = {
  encode(
    _: MsgAcceptRequestResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgAcceptRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcceptRequestResponse();
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

  fromJSON(_: any): MsgAcceptRequestResponse {
    return {};
  },

  toJSON(_: MsgAcceptRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAcceptRequestResponse>, I>>(
    _: I
  ): MsgAcceptRequestResponse {
    const message = createBaseMsgAcceptRequestResponse();
    return message;
  },
};

function createBaseMsgDeclineRequest(): MsgDeclineRequest {
  return { creator: "", id: 0 };
}

export const MsgDeclineRequest = {
  encode(
    message: MsgDeclineRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeclineRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeclineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeclineRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: MsgDeclineRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeclineRequest>, I>>(
    object: I
  ): MsgDeclineRequest {
    const message = createBaseMsgDeclineRequest();
    message.creator = object.creator ?? "";
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseMsgDeclineRequestResponse(): MsgDeclineRequestResponse {
  return {};
}

export const MsgDeclineRequestResponse = {
  encode(
    _: MsgDeclineRequestResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeclineRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeclineRequestResponse();
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

  fromJSON(_: any): MsgDeclineRequestResponse {
    return {};
  },

  toJSON(_: MsgDeclineRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeclineRequestResponse>, I>>(
    _: I
  ): MsgDeclineRequestResponse {
    const message = createBaseMsgDeclineRequestResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateRequest(request: MsgCreateRequest): Promise<MsgCreateRequestResponse>;
  CreateRequestBook(
    request: MsgCreateRequestBook
  ): Promise<MsgCreateRequestBookResponse>;
  AcceptRequest(request: MsgAcceptRequest): Promise<MsgAcceptRequestResponse>;
  DeclineRequest(
    request: MsgDeclineRequest
  ): Promise<MsgDeclineRequestResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateRequest = this.CreateRequest.bind(this);
    this.CreateRequestBook = this.CreateRequestBook.bind(this);
    this.AcceptRequest = this.AcceptRequest.bind(this);
    this.DeclineRequest = this.DeclineRequest.bind(this);
  }
  CreateRequest(request: MsgCreateRequest): Promise<MsgCreateRequestResponse> {
    const data = MsgCreateRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.loan.Msg", "CreateRequest", data);
    return promise.then((data) =>
      MsgCreateRequestResponse.decode(new _m0.Reader(data))
    );
  }

  CreateRequestBook(
    request: MsgCreateRequestBook
  ): Promise<MsgCreateRequestBookResponse> {
    const data = MsgCreateRequestBook.encode(request).finish();
    const promise = this.rpc.request(
      "nuah.loan.Msg",
      "CreateRequestBook",
      data
    );
    return promise.then((data) =>
      MsgCreateRequestBookResponse.decode(new _m0.Reader(data))
    );
  }

  AcceptRequest(request: MsgAcceptRequest): Promise<MsgAcceptRequestResponse> {
    const data = MsgAcceptRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.loan.Msg", "AcceptRequest", data);
    return promise.then((data) =>
      MsgAcceptRequestResponse.decode(new _m0.Reader(data))
    );
  }

  DeclineRequest(
    request: MsgDeclineRequest
  ): Promise<MsgDeclineRequestResponse> {
    const data = MsgDeclineRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.loan.Msg", "DeclineRequest", data);
    return promise.then((data) =>
      MsgDeclineRequestResponse.decode(new _m0.Reader(data))
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
