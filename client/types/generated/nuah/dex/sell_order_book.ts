/* eslint-disable */
import { OrderBook } from "./order";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.dex";

export interface SellOrderBook {
  index: string;
  amountDenom: string;
  priceDenom: string;
  book?: OrderBook;
}

function createBaseSellOrderBook(): SellOrderBook {
  return { index: "", amountDenom: "", priceDenom: "", book: undefined };
}

export const SellOrderBook = {
  encode(
    message: SellOrderBook,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.amountDenom !== "") {
      writer.uint32(18).string(message.amountDenom);
    }
    if (message.priceDenom !== "") {
      writer.uint32(26).string(message.priceDenom);
    }
    if (message.book !== undefined) {
      OrderBook.encode(message.book, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SellOrderBook {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSellOrderBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.amountDenom = reader.string();
          break;
        case 3:
          message.priceDenom = reader.string();
          break;
        case 4:
          message.book = OrderBook.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SellOrderBook {
    return {
      index: isSet(object.index) ? String(object.index) : "",
      amountDenom: isSet(object.amountDenom) ? String(object.amountDenom) : "",
      priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
      book: isSet(object.book) ? OrderBook.fromJSON(object.book) : undefined,
    };
  },

  toJSON(message: SellOrderBook): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.amountDenom !== undefined &&
      (obj.amountDenom = message.amountDenom);
    message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
    message.book !== undefined &&
      (obj.book = message.book ? OrderBook.toJSON(message.book) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SellOrderBook>, I>>(
    object: I
  ): SellOrderBook {
    const message = createBaseSellOrderBook();
    message.index = object.index ?? "";
    message.amountDenom = object.amountDenom ?? "";
    message.priceDenom = object.priceDenom ?? "";
    message.book =
      object.book !== undefined && object.book !== null
        ? OrderBook.fromPartial(object.book)
        : undefined;
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
