/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.exchange";

export interface StableSupply {
  id: Long;
  denom: string;
  supply: Long;
  inUse: Long;
}

function createBaseStableSupply(): StableSupply {
  return { id: Long.UZERO, denom: "", supply: Long.UZERO, inUse: Long.UZERO };
}

export const StableSupply = {
  encode(
    message: StableSupply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (!message.supply.isZero()) {
      writer.uint32(24).uint64(message.supply);
    }
    if (!message.inUse.isZero()) {
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
          message.id = reader.uint64() as Long;
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.supply = reader.uint64() as Long;
          break;
        case 4:
          message.inUse = reader.uint64() as Long;
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
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      denom: isSet(object.denom) ? String(object.denom) : "",
      supply: isSet(object.supply) ? Long.fromValue(object.supply) : Long.UZERO,
      inUse: isSet(object.inUse) ? Long.fromValue(object.inUse) : Long.UZERO,
    };
  },

  toJSON(message: StableSupply): unknown {
    const obj: any = {};
    message.id !== undefined &&
      (obj.id = (message.id || Long.UZERO).toString());
    message.denom !== undefined && (obj.denom = message.denom);
    message.supply !== undefined &&
      (obj.supply = (message.supply || Long.UZERO).toString());
    message.inUse !== undefined &&
      (obj.inUse = (message.inUse || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StableSupply>, I>>(
    object: I
  ): StableSupply {
    const message = createBaseStableSupply();
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.UZERO;
    message.denom = object.denom ?? "";
    message.supply =
      object.supply !== undefined && object.supply !== null
        ? Long.fromValue(object.supply)
        : Long.UZERO;
    message.inUse =
      object.inUse !== undefined && object.inUse !== null
        ? Long.fromValue(object.inUse)
        : Long.UZERO;
    return message;
  },
};

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
