/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.dex";

export interface OrderBook {
  idCount: number;
  orders: Order[];
}

export interface Order {
  id: number;
  creator: string;
  amount: number;
  price: number;
}

function createBaseOrderBook(): OrderBook {
  return { idCount: 0, orders: [] };
}

export const OrderBook = {
  encode(message: OrderBook, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.idCount !== 0) {
      writer.uint32(8).int32(message.idCount);
    }
    for (const v of message.orders) {
      Order.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderBook {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.idCount = reader.int32();
          break;
        case 2:
          message.orders.push(Order.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OrderBook {
    return {
      idCount: isSet(object.idCount) ? Number(object.idCount) : 0,
      orders: Array.isArray(object?.orders) ? object.orders.map((e: any) => Order.fromJSON(e)) : [],
    };
  },

  toJSON(message: OrderBook): unknown {
    const obj: any = {};
    message.idCount !== undefined && (obj.idCount = Math.round(message.idCount));
    if (message.orders) {
      obj.orders = message.orders.map((e) => e ? Order.toJSON(e) : undefined);
    } else {
      obj.orders = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OrderBook>, I>>(object: I): OrderBook {
    const message = createBaseOrderBook();
    message.idCount = object.idCount ?? 0;
    message.orders = object.orders?.map((e) => Order.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOrder(): Order {
  return { id: 0, creator: "", amount: 0, price: 0 };
}

export const Order = {
  encode(message: Order, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int32(message.amount);
    }
    if (message.price !== 0) {
      writer.uint32(32).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Order {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrder();
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
          message.price = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Order {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      price: isSet(object.price) ? Number(object.price) : 0,
    };
  },

  toJSON(message: Order): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.creator !== undefined && (obj.creator = message.creator);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.price !== undefined && (obj.price = Math.round(message.price));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Order>, I>>(object: I): Order {
    const message = createBaseOrder();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? 0;
    message.price = object.price ?? 0;
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
