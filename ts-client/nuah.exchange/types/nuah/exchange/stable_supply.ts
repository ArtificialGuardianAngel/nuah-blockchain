/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.exchange";

export interface StableSupply {
  id: number;
  denom: string;
  supply: number;
  inUse: number;
}

function createBaseStableSupply(): StableSupply {
  return { id: 0, denom: "", supply: 0, inUse: 0 };
}

export const StableSupply = {
  encode(message: StableSupply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.supply !== 0) {
      writer.uint32(24).uint64(message.supply);
    }
    if (message.inUse !== 0) {
      writer.uint32(32).uint64(message.inUse);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StableSupply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStableSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.supply = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.inUse = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StableSupply {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      denom: isSet(object.denom) ? String(object.denom) : "",
      supply: isSet(object.supply) ? Number(object.supply) : 0,
      inUse: isSet(object.inUse) ? Number(object.inUse) : 0,
    };
  },

  toJSON(message: StableSupply): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.denom !== undefined && (obj.denom = message.denom);
    message.supply !== undefined && (obj.supply = Math.round(message.supply));
    message.inUse !== undefined && (obj.inUse = Math.round(message.inUse));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StableSupply>, I>>(object: I): StableSupply {
    const message = createBaseStableSupply();
    message.id = object.id ?? 0;
    message.denom = object.denom ?? "";
    message.supply = object.supply ?? 0;
    message.inUse = object.inUse ?? 0;
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
