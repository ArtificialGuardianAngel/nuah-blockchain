/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.exchange";

export interface MsgSendCreatePair {
  sourceDenom: string;
  targetDenom: string;
  creator: string;
  /**
   * string port             = 2;
   * string channelID        = 3;
   */
  timeoutTimestamp: number;
}

export interface MsgSendCreatePairResponse {
}

export interface MsgSendSellOrder {
  amountDenom: string;
  amount: number;
  priceDenom: string;
  price: number;
  creator: string;
  /**
   * string port             = 2;
   * string channelID        = 3;
   */
  timeoutTimestamp: number;
}

export interface MsgSendSellOrderResponse {
  info: string;
}

export interface MsgSendBuyOrder {
  amountDenom: string;
  amount: number;
  priceDenom: string;
  price: number;
  creator: string;
  /**
   * string port             = 2;
   * string channelID        = 3;
   */
  timeoutTimestamp: number;
}

export interface MsgSendBuyOrderResponse {
}

export interface MsgCancelSellOrder {
  creator: string;
  /**
   * string port        = 2;
   * string channel     = 3;
   */
  amountDenom: string;
  priceDenom: string;
  orderID: number;
}

export interface MsgCancelSellOrderResponse {
}

export interface MsgCancelBuyOrder {
  creator: string;
  /**
   * string port        = 2;
   * string channel     = 3;
   */
  amountDenom: string;
  priceDenom: string;
  orderID: number;
}

export interface MsgCancelBuyOrderResponse {
}

function createBaseMsgSendCreatePair(): MsgSendCreatePair {
  return { sourceDenom: "", targetDenom: "", creator: "", timeoutTimestamp: 0 };
}

export const MsgSendCreatePair = {
  encode(message: MsgSendCreatePair, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceDenom !== "") {
      writer.uint32(26).string(message.sourceDenom);
    }
    if (message.targetDenom !== "") {
      writer.uint32(34).string(message.targetDenom);
    }
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.timeoutTimestamp !== 0) {
      writer.uint32(16).uint64(message.timeoutTimestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendCreatePair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendCreatePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 3:
          message.sourceDenom = reader.string();
          break;
        case 4:
          message.targetDenom = reader.string();
          break;
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.timeoutTimestamp = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendCreatePair {
    return {
      sourceDenom: isSet(object.sourceDenom) ? String(object.sourceDenom) : "",
      targetDenom: isSet(object.targetDenom) ? String(object.targetDenom) : "",
      creator: isSet(object.creator) ? String(object.creator) : "",
      timeoutTimestamp: isSet(object.timeoutTimestamp) ? Number(object.timeoutTimestamp) : 0,
    };
  },

  toJSON(message: MsgSendCreatePair): unknown {
    const obj: any = {};
    message.sourceDenom !== undefined && (obj.sourceDenom = message.sourceDenom);
    message.targetDenom !== undefined && (obj.targetDenom = message.targetDenom);
    message.creator !== undefined && (obj.creator = message.creator);
    message.timeoutTimestamp !== undefined && (obj.timeoutTimestamp = Math.round(message.timeoutTimestamp));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendCreatePair>, I>>(object: I): MsgSendCreatePair {
    const message = createBaseMsgSendCreatePair();
    message.sourceDenom = object.sourceDenom ?? "";
    message.targetDenom = object.targetDenom ?? "";
    message.creator = object.creator ?? "";
    message.timeoutTimestamp = object.timeoutTimestamp ?? 0;
    return message;
  },
};

function createBaseMsgSendCreatePairResponse(): MsgSendCreatePairResponse {
  return {};
}

export const MsgSendCreatePairResponse = {
  encode(_: MsgSendCreatePairResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendCreatePairResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendCreatePairResponse();
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

  fromJSON(_: any): MsgSendCreatePairResponse {
    return {};
  },

  toJSON(_: MsgSendCreatePairResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendCreatePairResponse>, I>>(_: I): MsgSendCreatePairResponse {
    const message = createBaseMsgSendCreatePairResponse();
    return message;
  },
};

function createBaseMsgSendSellOrder(): MsgSendSellOrder {
  return { amountDenom: "", amount: 0, priceDenom: "", price: 0, creator: "", timeoutTimestamp: 0 };
}

export const MsgSendSellOrder = {
  encode(message: MsgSendSellOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amountDenom !== "") {
      writer.uint32(26).string(message.amountDenom);
    }
    if (message.amount !== 0) {
      writer.uint32(32).int32(message.amount);
    }
    if (message.priceDenom !== "") {
      writer.uint32(42).string(message.priceDenom);
    }
    if (message.price !== 0) {
      writer.uint32(48).int32(message.price);
    }
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.timeoutTimestamp !== 0) {
      writer.uint32(16).uint64(message.timeoutTimestamp);
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
        case 3:
          message.amountDenom = reader.string();
          break;
        case 4:
          message.amount = reader.int32();
          break;
        case 5:
          message.priceDenom = reader.string();
          break;
        case 6:
          message.price = reader.int32();
          break;
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.timeoutTimestamp = longToNumber(reader.uint64() as Long);
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
      amountDenom: isSet(object.amountDenom) ? String(object.amountDenom) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      timeoutTimestamp: isSet(object.timeoutTimestamp) ? Number(object.timeoutTimestamp) : 0,
    };
  },

  toJSON(message: MsgSendSellOrder): unknown {
    const obj: any = {};
    message.amountDenom !== undefined && (obj.amountDenom = message.amountDenom);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
    message.price !== undefined && (obj.price = Math.round(message.price));
    message.creator !== undefined && (obj.creator = message.creator);
    message.timeoutTimestamp !== undefined && (obj.timeoutTimestamp = Math.round(message.timeoutTimestamp));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendSellOrder>, I>>(object: I): MsgSendSellOrder {
    const message = createBaseMsgSendSellOrder();
    message.amountDenom = object.amountDenom ?? "";
    message.amount = object.amount ?? 0;
    message.priceDenom = object.priceDenom ?? "";
    message.price = object.price ?? 0;
    message.creator = object.creator ?? "";
    message.timeoutTimestamp = object.timeoutTimestamp ?? 0;
    return message;
  },
};

function createBaseMsgSendSellOrderResponse(): MsgSendSellOrderResponse {
  return { info: "" };
}

export const MsgSendSellOrderResponse = {
  encode(message: MsgSendSellOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== "") {
      writer.uint32(10).string(message.info);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendSellOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSendSellOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.info = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSendSellOrderResponse {
    return { info: isSet(object.info) ? String(object.info) : "" };
  },

  toJSON(message: MsgSendSellOrderResponse): unknown {
    const obj: any = {};
    message.info !== undefined && (obj.info = message.info);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendSellOrderResponse>, I>>(object: I): MsgSendSellOrderResponse {
    const message = createBaseMsgSendSellOrderResponse();
    message.info = object.info ?? "";
    return message;
  },
};

function createBaseMsgSendBuyOrder(): MsgSendBuyOrder {
  return { amountDenom: "", amount: 0, priceDenom: "", price: 0, creator: "", timeoutTimestamp: 0 };
}

export const MsgSendBuyOrder = {
  encode(message: MsgSendBuyOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amountDenom !== "") {
      writer.uint32(26).string(message.amountDenom);
    }
    if (message.amount !== 0) {
      writer.uint32(32).int32(message.amount);
    }
    if (message.priceDenom !== "") {
      writer.uint32(42).string(message.priceDenom);
    }
    if (message.price !== 0) {
      writer.uint32(48).int32(message.price);
    }
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.timeoutTimestamp !== 0) {
      writer.uint32(16).uint64(message.timeoutTimestamp);
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
        case 3:
          message.amountDenom = reader.string();
          break;
        case 4:
          message.amount = reader.int32();
          break;
        case 5:
          message.priceDenom = reader.string();
          break;
        case 6:
          message.price = reader.int32();
          break;
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.timeoutTimestamp = longToNumber(reader.uint64() as Long);
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
      amountDenom: isSet(object.amountDenom) ? String(object.amountDenom) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      creator: isSet(object.creator) ? String(object.creator) : "",
      timeoutTimestamp: isSet(object.timeoutTimestamp) ? Number(object.timeoutTimestamp) : 0,
    };
  },

  toJSON(message: MsgSendBuyOrder): unknown {
    const obj: any = {};
    message.amountDenom !== undefined && (obj.amountDenom = message.amountDenom);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
    message.price !== undefined && (obj.price = Math.round(message.price));
    message.creator !== undefined && (obj.creator = message.creator);
    message.timeoutTimestamp !== undefined && (obj.timeoutTimestamp = Math.round(message.timeoutTimestamp));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSendBuyOrder>, I>>(object: I): MsgSendBuyOrder {
    const message = createBaseMsgSendBuyOrder();
    message.amountDenom = object.amountDenom ?? "";
    message.amount = object.amount ?? 0;
    message.priceDenom = object.priceDenom ?? "";
    message.price = object.price ?? 0;
    message.creator = object.creator ?? "";
    message.timeoutTimestamp = object.timeoutTimestamp ?? 0;
    return message;
  },
};

function createBaseMsgSendBuyOrderResponse(): MsgSendBuyOrderResponse {
  return {};
}

export const MsgSendBuyOrderResponse = {
  encode(_: MsgSendBuyOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendBuyOrderResponse {
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

  fromPartial<I extends Exact<DeepPartial<MsgSendBuyOrderResponse>, I>>(_: I): MsgSendBuyOrderResponse {
    const message = createBaseMsgSendBuyOrderResponse();
    return message;
  },
};

function createBaseMsgCancelSellOrder(): MsgCancelSellOrder {
  return { creator: "", amountDenom: "", priceDenom: "", orderID: 0 };
}

export const MsgCancelSellOrder = {
  encode(message: MsgCancelSellOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amountDenom !== "") {
      writer.uint32(18).string(message.amountDenom);
    }
    if (message.priceDenom !== "") {
      writer.uint32(26).string(message.priceDenom);
    }
    if (message.orderID !== 0) {
      writer.uint32(32).int32(message.orderID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSellOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSellOrder();
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
          message.priceDenom = reader.string();
          break;
        case 4:
          message.orderID = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelSellOrder {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amountDenom: isSet(object.amountDenom) ? String(object.amountDenom) : "",
      priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
      orderID: isSet(object.orderID) ? Number(object.orderID) : 0,
    };
  },

  toJSON(message: MsgCancelSellOrder): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.amountDenom !== undefined && (obj.amountDenom = message.amountDenom);
    message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
    message.orderID !== undefined && (obj.orderID = Math.round(message.orderID));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelSellOrder>, I>>(object: I): MsgCancelSellOrder {
    const message = createBaseMsgCancelSellOrder();
    message.creator = object.creator ?? "";
    message.amountDenom = object.amountDenom ?? "";
    message.priceDenom = object.priceDenom ?? "";
    message.orderID = object.orderID ?? 0;
    return message;
  },
};

function createBaseMsgCancelSellOrderResponse(): MsgCancelSellOrderResponse {
  return {};
}

export const MsgCancelSellOrderResponse = {
  encode(_: MsgCancelSellOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelSellOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSellOrderResponse();
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

  fromJSON(_: any): MsgCancelSellOrderResponse {
    return {};
  },

  toJSON(_: MsgCancelSellOrderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelSellOrderResponse>, I>>(_: I): MsgCancelSellOrderResponse {
    const message = createBaseMsgCancelSellOrderResponse();
    return message;
  },
};

function createBaseMsgCancelBuyOrder(): MsgCancelBuyOrder {
  return { creator: "", amountDenom: "", priceDenom: "", orderID: 0 };
}

export const MsgCancelBuyOrder = {
  encode(message: MsgCancelBuyOrder, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amountDenom !== "") {
      writer.uint32(18).string(message.amountDenom);
    }
    if (message.priceDenom !== "") {
      writer.uint32(26).string(message.priceDenom);
    }
    if (message.orderID !== 0) {
      writer.uint32(32).int32(message.orderID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelBuyOrder {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelBuyOrder();
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
          message.priceDenom = reader.string();
          break;
        case 4:
          message.orderID = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelBuyOrder {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amountDenom: isSet(object.amountDenom) ? String(object.amountDenom) : "",
      priceDenom: isSet(object.priceDenom) ? String(object.priceDenom) : "",
      orderID: isSet(object.orderID) ? Number(object.orderID) : 0,
    };
  },

  toJSON(message: MsgCancelBuyOrder): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.amountDenom !== undefined && (obj.amountDenom = message.amountDenom);
    message.priceDenom !== undefined && (obj.priceDenom = message.priceDenom);
    message.orderID !== undefined && (obj.orderID = Math.round(message.orderID));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelBuyOrder>, I>>(object: I): MsgCancelBuyOrder {
    const message = createBaseMsgCancelBuyOrder();
    message.creator = object.creator ?? "";
    message.amountDenom = object.amountDenom ?? "";
    message.priceDenom = object.priceDenom ?? "";
    message.orderID = object.orderID ?? 0;
    return message;
  },
};

function createBaseMsgCancelBuyOrderResponse(): MsgCancelBuyOrderResponse {
  return {};
}

export const MsgCancelBuyOrderResponse = {
  encode(_: MsgCancelBuyOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelBuyOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelBuyOrderResponse();
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

  fromJSON(_: any): MsgCancelBuyOrderResponse {
    return {};
  },

  toJSON(_: MsgCancelBuyOrderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelBuyOrderResponse>, I>>(_: I): MsgCancelBuyOrderResponse {
    const message = createBaseMsgCancelBuyOrderResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  SendCreatePair(request: MsgSendCreatePair): Promise<MsgSendCreatePairResponse>;
  SendSellOrder(request: MsgSendSellOrder): Promise<MsgSendSellOrderResponse>;
  SendBuyOrder(request: MsgSendBuyOrder): Promise<MsgSendBuyOrderResponse>;
  CancelSellOrder(request: MsgCancelSellOrder): Promise<MsgCancelSellOrderResponse>;
  CancelBuyOrder(request: MsgCancelBuyOrder): Promise<MsgCancelBuyOrderResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SendCreatePair = this.SendCreatePair.bind(this);
    this.SendSellOrder = this.SendSellOrder.bind(this);
    this.SendBuyOrder = this.SendBuyOrder.bind(this);
    this.CancelSellOrder = this.CancelSellOrder.bind(this);
    this.CancelBuyOrder = this.CancelBuyOrder.bind(this);
  }
  SendCreatePair(request: MsgSendCreatePair): Promise<MsgSendCreatePairResponse> {
    const data = MsgSendCreatePair.encode(request).finish();
    const promise = this.rpc.request("nuah.exchange.Msg", "SendCreatePair", data);
    return promise.then((data) => MsgSendCreatePairResponse.decode(new _m0.Reader(data)));
  }

  SendSellOrder(request: MsgSendSellOrder): Promise<MsgSendSellOrderResponse> {
    const data = MsgSendSellOrder.encode(request).finish();
    const promise = this.rpc.request("nuah.exchange.Msg", "SendSellOrder", data);
    return promise.then((data) => MsgSendSellOrderResponse.decode(new _m0.Reader(data)));
  }

  SendBuyOrder(request: MsgSendBuyOrder): Promise<MsgSendBuyOrderResponse> {
    const data = MsgSendBuyOrder.encode(request).finish();
    const promise = this.rpc.request("nuah.exchange.Msg", "SendBuyOrder", data);
    return promise.then((data) => MsgSendBuyOrderResponse.decode(new _m0.Reader(data)));
  }

  CancelSellOrder(request: MsgCancelSellOrder): Promise<MsgCancelSellOrderResponse> {
    const data = MsgCancelSellOrder.encode(request).finish();
    const promise = this.rpc.request("nuah.exchange.Msg", "CancelSellOrder", data);
    return promise.then((data) => MsgCancelSellOrderResponse.decode(new _m0.Reader(data)));
  }

  CancelBuyOrder(request: MsgCancelBuyOrder): Promise<MsgCancelBuyOrderResponse> {
    const data = MsgCancelBuyOrder.encode(request).finish();
    const promise = this.rpc.request("nuah.exchange.Msg", "CancelBuyOrder", data);
    return promise.then((data) => MsgCancelBuyOrderResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
