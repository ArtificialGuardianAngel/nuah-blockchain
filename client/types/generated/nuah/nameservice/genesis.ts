/* eslint-disable */
import { Params } from "./params";
import Long from "long";
import { Whois } from "./whois";
import { WhoisByValue } from "./whois_by_value";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.nameservice";

/** GenesisState defines the nameservice module's genesis state. */
export interface GenesisState {
  params?: Params;
  whoisList: Whois[];
  whoisByValueList: WhoisByValue[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, whoisList: [], whoisByValueList: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.whoisList) {
      Whois.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.whoisByValueList) {
      WhoisByValue.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.whoisList.push(Whois.decode(reader, reader.uint32()));
          break;
        case 3:
          message.whoisByValueList.push(
            WhoisByValue.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      whoisList: Array.isArray(object?.whoisList)
        ? object.whoisList.map((e: any) => Whois.fromJSON(e))
        : [],
      whoisByValueList: Array.isArray(object?.whoisByValueList)
        ? object.whoisByValueList.map((e: any) => WhoisByValue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.whoisList) {
      obj.whoisList = message.whoisList.map((e) =>
        e ? Whois.toJSON(e) : undefined
      );
    } else {
      obj.whoisList = [];
    }
    if (message.whoisByValueList) {
      obj.whoisByValueList = message.whoisByValueList.map((e) =>
        e ? WhoisByValue.toJSON(e) : undefined
      );
    } else {
      obj.whoisByValueList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = createBaseGenesisState();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    message.whoisList =
      object.whoisList?.map((e) => Whois.fromPartial(e)) || [];
    message.whoisByValueList =
      object.whoisByValueList?.map((e) => WhoisByValue.fromPartial(e)) || [];
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
