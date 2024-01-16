/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.exchange";

export interface MsgCreatePair {
  creator: string;
  sourceDenom: string;
  targetDenom: string;
}

export interface MsgCreatePairResponse {}

export interface MsgSendBuyOrder {
  creator: string;
  amountDenom: string;
  amount: number;
  priceDenom: string;
  price: number;
}

export interface MsgSendBuyOrderResponse {}

export interface MsgSendSellOrder {
  creator: string;
  amountDenom: string;
  amount: number;
  priceDenom: string;
  price: number;
}

export interface MsgSendSellOrderResponse {}

function createBaseMsgCreatePair(): MsgCreatePair {
  return { creator: "", sourceDenom: "", targetDenom: "" };
}

export const MsgCreatePair = {
  encode(
    message: MsgCreatePair,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.sourceDenom !== "") {
      writer.uint32(18).string(message.sourceDenom);
    }
    if (message.targetDenom !== "") {
      writer.uint32(26).string(message.targetDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.sourceDenom = reader.string();
          break;
        case 3:
          message.targetDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePair {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      sourceDenom: isSet(object.sourceDenom) ? String(object.sourceDenom) : "",
      targetDenom: isSet(object.targetDenom) ? String(object.targetDenom) : "",
    };
  },

  toJSON(message: MsgCreatePair): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.sourceDenom !== undefined &&
      (obj.sourceDenom = message.sourceDenom);
    message.targetDenom !== undefined &&
      (obj.targetDenom = message.targetDenom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePair>, I>>(
    object: I
  ): MsgCreatePair {
    const message = createBaseMsgCreatePair();
    message.creator = object.creator ?? "";
    message.sourceDenom = object.sourceDenom ?? "";
    message.targetDenom = object.targetDenom ?? "";
    return message;
  },
};

function createBaseMsgCreatePairResponse(): MsgCreatePairResponse {
  return {};
}

export const MsgCreatePairResponse = {
  encode(
    _: MsgCreatePairResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePairResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreatePairResponse();
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

  fromJSON(_: any): MsgCreatePairResponse {
    return {};
  },

  toJSON(_: MsgCreatePairResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePairResponse>, I>>(
    _: I
  ): MsgCreatePairResponse {
    const message = createBaseMsgCreatePairResponse();
    return message;
  },
};

function createBaseMsgSendBuyOrder(): MsgSendBuyOrder {
  return { creator: "", amountDenom: "", amount: 0, priceDenom: "", price: 0 };
}

export const MsgSendBuyOrder = {
  encode(
    message: MsgSendBuyOrder,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amountDenom !== "") {
      writer.uint32(18).string(message.amountDenom);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int32(message.amount);
    }
    if (message.priceDenom !== "") {
      writer.uint32(34).string(message.priceDenom);
    }
    if (message.price !== 0) {
      writer.uint32(40).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendBuyOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendBuyOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amountDenom = reader.string();
          break;
        case 3:
          message.amount = reader.int32();
          break;
        case 4:
          message.priceDenom = reader.string();
          break;
        case 5:
          message.price = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendBuyOrder {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amountDenom: isSet(object.amountDenom) ? String(object.amountDenom) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
    };
  },

  toJSON(message: MsgSendBuyOrder): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.amountDenom !== undefined &&
      (obj.amountDenom = message.amountDenom);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
    message.price !== undefined && (obj.price = Math.round(message.price));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendBuyOrder>, I>>(
    object: I
  ): MsgSendBuyOrder {
    const message = createBaseMsgSendBuyOrder();
    message.creator = object.creator ?? "";
    message.amountDenom = object.amountDenom ?? "";
    message.amount = object.amount ?? 0;
    message.priceDenom = object.priceDenom ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseMsgSendBuyOrderResponse(): MsgSendBuyOrderResponse {
  return {};
}

export const MsgSendBuyOrderResponse = {
  encode(
    _: MsgSendBuyOrderResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSendBuyOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendBuyOrderResponse();
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

  fromJSON(_: any): MsgSendBuyOrderResponse {
    return {};
  },

  toJSON(_: MsgSendBuyOrderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendBuyOrderResponse>, I>>(
    _: I
  ): MsgSendBuyOrderResponse {
    const message = createBaseMsgSendBuyOrderResponse();
    return message;
  },
};

function createBaseMsgSendSellOrder(): MsgSendSellOrder {
  return { creator: "", amountDenom: "", amount: 0, priceDenom: "", price: 0 };
}

export const MsgSendSellOrder = {
  encode(
    message: MsgSendSellOrder,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amountDenom !== "") {
      writer.uint32(18).string(message.amountDenom);
    }
    if (message.amount !== 0) {
      writer.uint32(24).int32(message.amount);
    }
    if (message.priceDenom !== "") {
      writer.uint32(34).string(message.priceDenom);
    }
    if (message.price !== 0) {
      writer.uint32(40).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendSellOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendSellOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amountDenom = reader.string();
          break;
        case 3:
          message.amount = reader.int32();
          break;
        case 4:
          message.priceDenom = reader.string();
          break;
        case 5:
          message.price = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendSellOrder {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amountDenom: isSet(object.amountDenom) ? String(object.amountDenom) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
    };
  },

  toJSON(message: MsgSendSellOrder): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.amountDenom !== undefined &&
      (obj.amountDenom = message.amountDenom);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
    message.price !== undefined && (obj.price = Math.round(message.price));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendSellOrder>, I>>(
    object: I
  ): MsgSendSellOrder {
    const message = createBaseMsgSendSellOrder();
    message.creator = object.creator ?? "";
    message.amountDenom = object.amountDenom ?? "";
    message.amount = object.amount ?? 0;
    message.priceDenom = object.priceDenom ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseMsgSendSellOrderResponse(): MsgSendSellOrderResponse {
  return {};
}

export const MsgSendSellOrderResponse = {
  encode(
    _: MsgSendSellOrderResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSendSellOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendSellOrderResponse();
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

  fromJSON(_: any): MsgSendSellOrderResponse {
    return {};
  },

  toJSON(_: MsgSendSellOrderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendSellOrderResponse>, I>>(
    _: I
  ): MsgSendSellOrderResponse {
    const message = createBaseMsgSendSellOrderResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreatePair(request: MsgCreatePair): Promise<MsgCreatePairResponse>;
  SendBuyOrder(request: MsgSendBuyOrder): Promise<MsgSendBuyOrderResponse>;
  SendSellOrder(request: MsgSendSellOrder): Promise<MsgSendSellOrderResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreatePair = this.CreatePair.bind(this);
    this.SendBuyOrder = this.SendBuyOrder.bind(this);
    this.SendSellOrder = this.SendSellOrder.bind(this);
  }
  CreatePair(request: MsgCreatePair): Promise<MsgCreatePairResponse> {
    const data = MsgCreatePair.encode(request).finish();
    const promise = this.rpc.request("nuah.exchange.Msg", "CreatePair", data);
    return promise.then((data) =>
      MsgCreatePairResponse.decode(new _m0.Reader(data))
    );
  }

  SendBuyOrder(request: MsgSendBuyOrder): Promise<MsgSendBuyOrderResponse> {
    const data = MsgSendBuyOrder.encode(request).finish();
    const promise = this.rpc.request("nuah.exchange.Msg", "SendBuyOrder", data);
    return promise.then((data) =>
      MsgSendBuyOrderResponse.decode(new _m0.Reader(data))
    );
  }

  SendSellOrder(request: MsgSendSellOrder): Promise<MsgSendSellOrderResponse> {
    const data = MsgSendSellOrder.encode(request).finish();
    const promise = this.rpc.request(
      "nuah.exchange.Msg",
      "SendSellOrder",
      data
    );
    return promise.then((data) =>
      MsgSendSellOrderResponse.decode(new _m0.Reader(data))
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
