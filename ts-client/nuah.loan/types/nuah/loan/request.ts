/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.loan";

export interface RequestBookItem {
  idCount: number;
  requests: Request[];
}

export interface Request {
  id: number;
  creator: string;
  amount: number;
  denom: string;
  accepted: number;
}

function createBaseRequestBookItem(): RequestBookItem {
  return { idCount: 0, requests: [] };
}

export const RequestBookItem = {
  encode(message: RequestBookItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idCount !== 0) {
      writer.uint32(8).int32(message.idCount);
    }
    for (const v of message.requests) {
      Request.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestBookItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestBookItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.idCount = reader.int32();
          break;
        case 2:
          message.requests.push(Request.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestBookItem {
    return {
      idCount: isSet(object.idCount) ? Number(object.idCount) : 0,
      requests: Array.isArray(object?.requests) ? object.requests.map((e: any) => Request.fromJSON(e)) : [],
    };
  },

  toJSON(message: RequestBookItem): unknown {
    const obj: any = {};
    message.idCount !== undefined && (obj.idCount = Math.round(message.idCount));
    if (message.requests) {
      obj.requests = message.requests.map((e) => e ? Request.toJSON(e) : undefined);
    } else {
      obj.requests = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestBookItem>, I>>(object: I): RequestBookItem {
    const message = createBaseRequestBookItem();
    message.idCount = object.idCount ?? 0;
    message.requests = object.requests?.map((e) => Request.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRequest(): Request {
  return { id: 0, creator: "", amount: 0, denom: "", accepted: 0 };
}

export const Request = {
  encode(message: Request, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int32(message.amount);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    if (message.accepted !== 0) {
      writer.uint32(40).int32(message.accepted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.amount = reader.int32();
          break;
        case 4:
          message.denom = reader.string();
          break;
        case 5:
          message.accepted = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Request {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      denom: isSet(object.denom) ? String(object.denom) : "",
      accepted: isSet(object.accepted) ? Number(object.accepted) : 0,
    };
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.denom !== undefined && (obj.denom = message.denom);
    message.accepted !== undefined && (obj.accepted = Math.round(message.accepted));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = createBaseRequest();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? 0;
    message.denom = object.denom ?? "";
    message.accepted = object.accepted ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
