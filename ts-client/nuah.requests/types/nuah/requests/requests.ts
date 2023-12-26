/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.requests";

export interface Requests {
  id: number;
  from: string;
  to: string;
  amount: string;
  details: string;
}

function createBaseRequests(): Requests {
  return { id: 0, from: "", to: "", amount: "", details: "" };
}

export const Requests = {
  encode(message: Requests, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.from !== "") {
      writer.uint32(18).string(message.from);
    }
    if (message.to !== "") {
      writer.uint32(26).string(message.to);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    if (message.details !== "") {
      writer.uint32(42).string(message.details);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Requests {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequests();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.from = reader.string();
          break;
        case 3:
          message.to = reader.string();
          break;
        case 4:
          message.amount = reader.string();
          break;
        case 5:
          message.details = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Requests {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      from: isSet(object.from) ? String(object.from) : "",
      to: isSet(object.to) ? String(object.to) : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
      details: isSet(object.details) ? String(object.details) : "",
    };
  },

  toJSON(message: Requests): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.from !== undefined && (obj.from = message.from);
    message.to !== undefined && (obj.to = message.to);
    message.amount !== undefined && (obj.amount = message.amount);
    message.details !== undefined && (obj.details = message.details);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Requests>, I>>(object: I): Requests {
    const message = createBaseRequests();
    message.id = object.id ?? 0;
    message.from = object.from ?? "";
    message.to = object.to ?? "";
    message.amount = object.amount ?? "";
    message.details = object.details ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
