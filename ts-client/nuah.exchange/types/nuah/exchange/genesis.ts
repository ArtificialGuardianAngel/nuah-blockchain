/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { BuyOrderBook } from "./buy_order_book";
import { Params } from "./params";
import { SellOrderBook } from "./sell_order_book";
import { TokenInfo } from "./token_info";

export const protobufPackage = "nuah.exchange";

/** GenesisState defines the exchange module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  sellOrderBookList: SellOrderBook[];
  buyOrderBookList: BuyOrderBook[];
  tokenInfoList: TokenInfo[];
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, sellOrderBookList: [], buyOrderBookList: [], tokenInfoList: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.sellOrderBookList) {
      SellOrderBook.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.buyOrderBookList) {
      BuyOrderBook.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.tokenInfoList) {
      TokenInfo.encode(v!, writer.uint32(34).fork()).ldelim();
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
          message.sellOrderBookList.push(SellOrderBook.decode(reader, reader.uint32()));
          break;
        case 3:
          message.buyOrderBookList.push(BuyOrderBook.decode(reader, reader.uint32()));
          break;
        case 4:
          message.tokenInfoList.push(TokenInfo.decode(reader, reader.uint32()));
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
      sellOrderBookList: Array.isArray(object?.sellOrderBookList)
        ? object.sellOrderBookList.map((e: any) => SellOrderBook.fromJSON(e))
        : [],
      buyOrderBookList: Array.isArray(object?.buyOrderBookList)
        ? object.buyOrderBookList.map((e: any) => BuyOrderBook.fromJSON(e))
        : [],
      tokenInfoList: Array.isArray(object?.tokenInfoList)
        ? object.tokenInfoList.map((e: any) => TokenInfo.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.sellOrderBookList) {
      obj.sellOrderBookList = message.sellOrderBookList.map((e) => e ? SellOrderBook.toJSON(e) : undefined);
    } else {
      obj.sellOrderBookList = [];
    }
    if (message.buyOrderBookList) {
      obj.buyOrderBookList = message.buyOrderBookList.map((e) => e ? BuyOrderBook.toJSON(e) : undefined);
    } else {
      obj.buyOrderBookList = [];
    }
    if (message.tokenInfoList) {
      obj.tokenInfoList = message.tokenInfoList.map((e) => e ? TokenInfo.toJSON(e) : undefined);
    } else {
      obj.tokenInfoList = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.sellOrderBookList = object.sellOrderBookList?.map((e) => SellOrderBook.fromPartial(e)) || [];
    message.buyOrderBookList = object.buyOrderBookList?.map((e) => BuyOrderBook.fromPartial(e)) || [];
    message.tokenInfoList = object.tokenInfoList?.map((e) => TokenInfo.fromPartial(e)) || [];
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
