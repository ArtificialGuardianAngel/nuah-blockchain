/* eslint-disable */
import { Params } from "./params";
import { SellOrderBook } from "./sell_order_book";
import {
  PageRequest,
  PageResponse,
} from "../../cosmos/base/query/v1beta1/pagination";
import { BuyOrderBook } from "./buy_order_book";
import { DenomTrace } from "./denom_trace";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.dex";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetSellOrderBookRequest {
  index: string;
}

export interface QueryGetSellOrderBookResponse {
  sellOrderBook?: SellOrderBook;
}

export interface QueryAllSellOrderBookRequest {
  pagination?: PageRequest;
}

export interface QueryAllSellOrderBookResponse {
  sellOrderBook: SellOrderBook[];
  pagination?: PageResponse;
}

export interface QueryGetBuyOrderBookRequest {
  index: string;
}

export interface QueryGetBuyOrderBookResponse {
  buyOrderBook?: BuyOrderBook;
}

export interface QueryAllBuyOrderBookRequest {
  pagination?: PageRequest;
}

export interface QueryAllBuyOrderBookResponse {
  buyOrderBook: BuyOrderBook[];
  pagination?: PageResponse;
}

export interface QueryGetDenomTraceRequest {
  index: string;
}

export interface QueryGetDenomTraceResponse {
  denomTrace?: DenomTrace;
}

export interface QueryAllDenomTraceRequest {
  pagination?: PageRequest;
}

export interface QueryAllDenomTraceResponse {
  denomTrace: DenomTrace[];
  pagination?: PageResponse;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I
  ): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I
  ): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseQueryGetSellOrderBookRequest(): QueryGetSellOrderBookRequest {
  return { index: "" };
}

export const QueryGetSellOrderBookRequest = {
  encode(
    message: QueryGetSellOrderBookRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetSellOrderBookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSellOrderBookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSellOrderBookRequest {
    return {
      index: isSet(object.index) ? String(object.index) : "",
    };
  },

  toJSON(message: QueryGetSellOrderBookRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSellOrderBookRequest>, I>>(
    object: I
  ): QueryGetSellOrderBookRequest {
    const message = createBaseQueryGetSellOrderBookRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetSellOrderBookResponse(): QueryGetSellOrderBookResponse {
  return { sellOrderBook: undefined };
}

export const QueryGetSellOrderBookResponse = {
  encode(
    message: QueryGetSellOrderBookResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sellOrderBook !== undefined) {
      SellOrderBook.encode(
        message.sellOrderBook,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetSellOrderBookResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetSellOrderBookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sellOrderBook = SellOrderBook.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetSellOrderBookResponse {
    return {
      sellOrderBook: isSet(object.sellOrderBook)
        ? SellOrderBook.fromJSON(object.sellOrderBook)
        : undefined,
    };
  },

  toJSON(message: QueryGetSellOrderBookResponse): unknown {
    const obj: any = {};
    message.sellOrderBook !== undefined &&
      (obj.sellOrderBook = message.sellOrderBook
        ? SellOrderBook.toJSON(message.sellOrderBook)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetSellOrderBookResponse>, I>>(
    object: I
  ): QueryGetSellOrderBookResponse {
    const message = createBaseQueryGetSellOrderBookResponse();
    message.sellOrderBook =
      object.sellOrderBook !== undefined && object.sellOrderBook !== null
        ? SellOrderBook.fromPartial(object.sellOrderBook)
        : undefined;
    return message;
  },
};

function createBaseQueryAllSellOrderBookRequest(): QueryAllSellOrderBookRequest {
  return { pagination: undefined };
}

export const QueryAllSellOrderBookRequest = {
  encode(
    message: QueryAllSellOrderBookRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllSellOrderBookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSellOrderBookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSellOrderBookRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllSellOrderBookRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSellOrderBookRequest>, I>>(
    object: I
  ): QueryAllSellOrderBookRequest {
    const message = createBaseQueryAllSellOrderBookRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAllSellOrderBookResponse(): QueryAllSellOrderBookResponse {
  return { sellOrderBook: [], pagination: undefined };
}

export const QueryAllSellOrderBookResponse = {
  encode(
    message: QueryAllSellOrderBookResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.sellOrderBook) {
      SellOrderBook.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllSellOrderBookResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllSellOrderBookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sellOrderBook.push(
            SellOrderBook.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllSellOrderBookResponse {
    return {
      sellOrderBook: Array.isArray(object?.sellOrderBook)
        ? object.sellOrderBook.map((e: any) => SellOrderBook.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllSellOrderBookResponse): unknown {
    const obj: any = {};
    if (message.sellOrderBook) {
      obj.sellOrderBook = message.sellOrderBook.map((e) =>
        e ? SellOrderBook.toJSON(e) : undefined
      );
    } else {
      obj.sellOrderBook = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllSellOrderBookResponse>, I>>(
    object: I
  ): QueryAllSellOrderBookResponse {
    const message = createBaseQueryAllSellOrderBookResponse();
    message.sellOrderBook =
      object.sellOrderBook?.map((e) => SellOrderBook.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetBuyOrderBookRequest(): QueryGetBuyOrderBookRequest {
  return { index: "" };
}

export const QueryGetBuyOrderBookRequest = {
  encode(
    message: QueryGetBuyOrderBookRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetBuyOrderBookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBuyOrderBookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBuyOrderBookRequest {
    return {
      index: isSet(object.index) ? String(object.index) : "",
    };
  },

  toJSON(message: QueryGetBuyOrderBookRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBuyOrderBookRequest>, I>>(
    object: I
  ): QueryGetBuyOrderBookRequest {
    const message = createBaseQueryGetBuyOrderBookRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetBuyOrderBookResponse(): QueryGetBuyOrderBookResponse {
  return { buyOrderBook: undefined };
}

export const QueryGetBuyOrderBookResponse = {
  encode(
    message: QueryGetBuyOrderBookResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.buyOrderBook !== undefined) {
      BuyOrderBook.encode(
        message.buyOrderBook,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetBuyOrderBookResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetBuyOrderBookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderBook = BuyOrderBook.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBuyOrderBookResponse {
    return {
      buyOrderBook: isSet(object.buyOrderBook)
        ? BuyOrderBook.fromJSON(object.buyOrderBook)
        : undefined,
    };
  },

  toJSON(message: QueryGetBuyOrderBookResponse): unknown {
    const obj: any = {};
    message.buyOrderBook !== undefined &&
      (obj.buyOrderBook = message.buyOrderBook
        ? BuyOrderBook.toJSON(message.buyOrderBook)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetBuyOrderBookResponse>, I>>(
    object: I
  ): QueryGetBuyOrderBookResponse {
    const message = createBaseQueryGetBuyOrderBookResponse();
    message.buyOrderBook =
      object.buyOrderBook !== undefined && object.buyOrderBook !== null
        ? BuyOrderBook.fromPartial(object.buyOrderBook)
        : undefined;
    return message;
  },
};

function createBaseQueryAllBuyOrderBookRequest(): QueryAllBuyOrderBookRequest {
  return { pagination: undefined };
}

export const QueryAllBuyOrderBookRequest = {
  encode(
    message: QueryAllBuyOrderBookRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllBuyOrderBookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBuyOrderBookRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBuyOrderBookRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllBuyOrderBookRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllBuyOrderBookRequest>, I>>(
    object: I
  ): QueryAllBuyOrderBookRequest {
    const message = createBaseQueryAllBuyOrderBookRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAllBuyOrderBookResponse(): QueryAllBuyOrderBookResponse {
  return { buyOrderBook: [], pagination: undefined };
}

export const QueryAllBuyOrderBookResponse = {
  encode(
    message: QueryAllBuyOrderBookResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.buyOrderBook) {
      BuyOrderBook.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllBuyOrderBookResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllBuyOrderBookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderBook.push(
            BuyOrderBook.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBuyOrderBookResponse {
    return {
      buyOrderBook: Array.isArray(object?.buyOrderBook)
        ? object.buyOrderBook.map((e: any) => BuyOrderBook.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllBuyOrderBookResponse): unknown {
    const obj: any = {};
    if (message.buyOrderBook) {
      obj.buyOrderBook = message.buyOrderBook.map((e) =>
        e ? BuyOrderBook.toJSON(e) : undefined
      );
    } else {
      obj.buyOrderBook = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllBuyOrderBookResponse>, I>>(
    object: I
  ): QueryAllBuyOrderBookResponse {
    const message = createBaseQueryAllBuyOrderBookResponse();
    message.buyOrderBook =
      object.buyOrderBook?.map((e) => BuyOrderBook.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetDenomTraceRequest(): QueryGetDenomTraceRequest {
  return { index: "" };
}

export const QueryGetDenomTraceRequest = {
  encode(
    message: QueryGetDenomTraceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetDenomTraceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDenomTraceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDenomTraceRequest {
    return {
      index: isSet(object.index) ? String(object.index) : "",
    };
  },

  toJSON(message: QueryGetDenomTraceRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDenomTraceRequest>, I>>(
    object: I
  ): QueryGetDenomTraceRequest {
    const message = createBaseQueryGetDenomTraceRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetDenomTraceResponse(): QueryGetDenomTraceResponse {
  return { denomTrace: undefined };
}

export const QueryGetDenomTraceResponse = {
  encode(
    message: QueryGetDenomTraceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.denomTrace !== undefined) {
      DenomTrace.encode(message.denomTrace, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetDenomTraceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetDenomTraceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomTrace = DenomTrace.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDenomTraceResponse {
    return {
      denomTrace: isSet(object.denomTrace)
        ? DenomTrace.fromJSON(object.denomTrace)
        : undefined,
    };
  },

  toJSON(message: QueryGetDenomTraceResponse): unknown {
    const obj: any = {};
    message.denomTrace !== undefined &&
      (obj.denomTrace = message.denomTrace
        ? DenomTrace.toJSON(message.denomTrace)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetDenomTraceResponse>, I>>(
    object: I
  ): QueryGetDenomTraceResponse {
    const message = createBaseQueryGetDenomTraceResponse();
    message.denomTrace =
      object.denomTrace !== undefined && object.denomTrace !== null
        ? DenomTrace.fromPartial(object.denomTrace)
        : undefined;
    return message;
  },
};

function createBaseQueryAllDenomTraceRequest(): QueryAllDenomTraceRequest {
  return { pagination: undefined };
}

export const QueryAllDenomTraceRequest = {
  encode(
    message: QueryAllDenomTraceRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllDenomTraceRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomTraceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomTraceRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllDenomTraceRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDenomTraceRequest>, I>>(
    object: I
  ): QueryAllDenomTraceRequest {
    const message = createBaseQueryAllDenomTraceRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAllDenomTraceResponse(): QueryAllDenomTraceResponse {
  return { denomTrace: [], pagination: undefined };
}

export const QueryAllDenomTraceResponse = {
  encode(
    message: QueryAllDenomTraceResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.denomTrace) {
      DenomTrace.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAllDenomTraceResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllDenomTraceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomTrace.push(DenomTrace.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllDenomTraceResponse {
    return {
      denomTrace: Array.isArray(object?.denomTrace)
        ? object.denomTrace.map((e: any) => DenomTrace.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllDenomTraceResponse): unknown {
    const obj: any = {};
    if (message.denomTrace) {
      obj.denomTrace = message.denomTrace.map((e) =>
        e ? DenomTrace.toJSON(e) : undefined
      );
    } else {
      obj.denomTrace = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllDenomTraceResponse>, I>>(
    object: I
  ): QueryAllDenomTraceResponse {
    const message = createBaseQueryAllDenomTraceResponse();
    message.denomTrace =
      object.denomTrace?.map((e) => DenomTrace.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of SellOrderBook items. */
  SellOrderBook(
    request: QueryGetSellOrderBookRequest
  ): Promise<QueryGetSellOrderBookResponse>;
  SellOrderBookAll(
    request: QueryAllSellOrderBookRequest
  ): Promise<QueryAllSellOrderBookResponse>;
  /** Queries a list of BuyOrderBook items. */
  BuyOrderBook(
    request: QueryGetBuyOrderBookRequest
  ): Promise<QueryGetBuyOrderBookResponse>;
  BuyOrderBookAll(
    request: QueryAllBuyOrderBookRequest
  ): Promise<QueryAllBuyOrderBookResponse>;
  /** Queries a list of DenomTrace items. */
  DenomTrace(
    request: QueryGetDenomTraceRequest
  ): Promise<QueryGetDenomTraceResponse>;
  DenomTraceAll(
    request: QueryAllDenomTraceRequest
  ): Promise<QueryAllDenomTraceResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.SellOrderBook = this.SellOrderBook.bind(this);
    this.SellOrderBookAll = this.SellOrderBookAll.bind(this);
    this.BuyOrderBook = this.BuyOrderBook.bind(this);
    this.BuyOrderBookAll = this.BuyOrderBookAll.bind(this);
    this.DenomTrace = this.DenomTrace.bind(this);
    this.DenomTraceAll = this.DenomTraceAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.dex.Query", "Params", data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  SellOrderBook(
    request: QueryGetSellOrderBookRequest
  ): Promise<QueryGetSellOrderBookResponse> {
    const data = QueryGetSellOrderBookRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.dex.Query", "SellOrderBook", data);
    return promise.then((data) =>
      QueryGetSellOrderBookResponse.decode(new _m0.Reader(data))
    );
  }

  SellOrderBookAll(
    request: QueryAllSellOrderBookRequest
  ): Promise<QueryAllSellOrderBookResponse> {
    const data = QueryAllSellOrderBookRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nuah.dex.Query",
      "SellOrderBookAll",
      data
    );
    return promise.then((data) =>
      QueryAllSellOrderBookResponse.decode(new _m0.Reader(data))
    );
  }

  BuyOrderBook(
    request: QueryGetBuyOrderBookRequest
  ): Promise<QueryGetBuyOrderBookResponse> {
    const data = QueryGetBuyOrderBookRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.dex.Query", "BuyOrderBook", data);
    return promise.then((data) =>
      QueryGetBuyOrderBookResponse.decode(new _m0.Reader(data))
    );
  }

  BuyOrderBookAll(
    request: QueryAllBuyOrderBookRequest
  ): Promise<QueryAllBuyOrderBookResponse> {
    const data = QueryAllBuyOrderBookRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.dex.Query", "BuyOrderBookAll", data);
    return promise.then((data) =>
      QueryAllBuyOrderBookResponse.decode(new _m0.Reader(data))
    );
  }

  DenomTrace(
    request: QueryGetDenomTraceRequest
  ): Promise<QueryGetDenomTraceResponse> {
    const data = QueryGetDenomTraceRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.dex.Query", "DenomTrace", data);
    return promise.then((data) =>
      QueryGetDenomTraceResponse.decode(new _m0.Reader(data))
    );
  }

  DenomTraceAll(
    request: QueryAllDenomTraceRequest
  ): Promise<QueryAllDenomTraceResponse> {
    const data = QueryAllDenomTraceRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.dex.Query", "DenomTraceAll", data);
    return promise.then((data) =>
      QueryAllDenomTraceResponse.decode(new _m0.Reader(data))
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
