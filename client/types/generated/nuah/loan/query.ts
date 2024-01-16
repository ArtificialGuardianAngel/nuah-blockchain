/* eslint-disable */
import { Params } from "./params";
import { RequestBook } from "./request_book";
import {
  PageRequest,
  PageResponse,
} from "../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "nuah.loan";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

export interface QueryGetRequestBookRequest {
  index: string;
}

export interface QueryGetRequestBookResponse {
  requestBook?: RequestBook;
}

export interface QueryAllRequestBookRequest {
  pagination?: PageRequest;
}

export interface QueryAllRequestBookResponse {
  requestBook: RequestBook[];
  pagination?: PageResponse;
}

export interface QueryGetMadenRequestsRequest {
  from: string;
}

export interface QueryGetMadenRequestsResponse {
  requests: RequestBook[];
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

function createBaseQueryGetRequestBookRequest(): QueryGetRequestBookRequest {
  return { index: "" };
}

export const QueryGetRequestBookRequest = {
  encode(
    message: QueryGetRequestBookRequest,
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
  ): QueryGetRequestBookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRequestBookRequest();
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

  fromJSON(object: any): QueryGetRequestBookRequest {
    return {
      index: isSet(object.index) ? String(object.index) : "",
    };
  },

  toJSON(message: QueryGetRequestBookRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRequestBookRequest>, I>>(
    object: I
  ): QueryGetRequestBookRequest {
    const message = createBaseQueryGetRequestBookRequest();
    message.index = object.index ?? "";
    return message;
  },
};

function createBaseQueryGetRequestBookResponse(): QueryGetRequestBookResponse {
  return { requestBook: undefined };
}

export const QueryGetRequestBookResponse = {
  encode(
    message: QueryGetRequestBookResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.requestBook !== undefined) {
      RequestBook.encode(
        message.requestBook,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetRequestBookResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetRequestBookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestBook = RequestBook.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRequestBookResponse {
    return {
      requestBook: isSet(object.requestBook)
        ? RequestBook.fromJSON(object.requestBook)
        : undefined,
    };
  },

  toJSON(message: QueryGetRequestBookResponse): unknown {
    const obj: any = {};
    message.requestBook !== undefined &&
      (obj.requestBook = message.requestBook
        ? RequestBook.toJSON(message.requestBook)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetRequestBookResponse>, I>>(
    object: I
  ): QueryGetRequestBookResponse {
    const message = createBaseQueryGetRequestBookResponse();
    message.requestBook =
      object.requestBook !== undefined && object.requestBook !== null
        ? RequestBook.fromPartial(object.requestBook)
        : undefined;
    return message;
  },
};

function createBaseQueryAllRequestBookRequest(): QueryAllRequestBookRequest {
  return { pagination: undefined };
}

export const QueryAllRequestBookRequest = {
  encode(
    message: QueryAllRequestBookRequest,
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
  ): QueryAllRequestBookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRequestBookRequest();
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

  fromJSON(object: any): QueryAllRequestBookRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllRequestBookRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRequestBookRequest>, I>>(
    object: I
  ): QueryAllRequestBookRequest {
    const message = createBaseQueryAllRequestBookRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryAllRequestBookResponse(): QueryAllRequestBookResponse {
  return { requestBook: [], pagination: undefined };
}

export const QueryAllRequestBookResponse = {
  encode(
    message: QueryAllRequestBookResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.requestBook) {
      RequestBook.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryAllRequestBookResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllRequestBookResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requestBook.push(RequestBook.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAllRequestBookResponse {
    return {
      requestBook: Array.isArray(object?.requestBook)
        ? object.requestBook.map((e: any) => RequestBook.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAllRequestBookResponse): unknown {
    const obj: any = {};
    if (message.requestBook) {
      obj.requestBook = message.requestBook.map((e) =>
        e ? RequestBook.toJSON(e) : undefined
      );
    } else {
      obj.requestBook = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllRequestBookResponse>, I>>(
    object: I
  ): QueryAllRequestBookResponse {
    const message = createBaseQueryAllRequestBookResponse();
    message.requestBook =
      object.requestBook?.map((e) => RequestBook.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryGetMadenRequestsRequest(): QueryGetMadenRequestsRequest {
  return { from: "" };
}

export const QueryGetMadenRequestsRequest = {
  encode(
    message: QueryGetMadenRequestsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== "") {
      writer.uint32(10).string(message.from);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetMadenRequestsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMadenRequestsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMadenRequestsRequest {
    return {
      from: isSet(object.from) ? String(object.from) : "",
    };
  },

  toJSON(message: QueryGetMadenRequestsRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetMadenRequestsRequest>, I>>(
    object: I
  ): QueryGetMadenRequestsRequest {
    const message = createBaseQueryGetMadenRequestsRequest();
    message.from = object.from ?? "";
    return message;
  },
};

function createBaseQueryGetMadenRequestsResponse(): QueryGetMadenRequestsResponse {
  return { requests: [] };
}

export const QueryGetMadenRequestsResponse = {
  encode(
    message: QueryGetMadenRequestsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.requests) {
      RequestBook.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetMadenRequestsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetMadenRequestsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requests.push(RequestBook.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetMadenRequestsResponse {
    return {
      requests: Array.isArray(object?.requests)
        ? object.requests.map((e: any) => RequestBook.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryGetMadenRequestsResponse): unknown {
    const obj: any = {};
    if (message.requests) {
      obj.requests = message.requests.map((e) =>
        e ? RequestBook.toJSON(e) : undefined
      );
    } else {
      obj.requests = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetMadenRequestsResponse>, I>>(
    object: I
  ): QueryGetMadenRequestsResponse {
    const message = createBaseQueryGetMadenRequestsResponse();
    message.requests =
      object.requests?.map((e) => RequestBook.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of RequestBook items. */
  RequestBook(
    request: QueryGetRequestBookRequest
  ): Promise<QueryGetRequestBookResponse>;
  RequestBookAll(
    request: QueryAllRequestBookRequest
  ): Promise<QueryAllRequestBookResponse>;
  /** Queries a list of GetMadenRequests items. */
  GetMadenRequests(
    request: QueryGetMadenRequestsRequest
  ): Promise<QueryGetMadenRequestsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.RequestBook = this.RequestBook.bind(this);
    this.RequestBookAll = this.RequestBookAll.bind(this);
    this.GetMadenRequests = this.GetMadenRequests.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.loan.Query", "Params", data);
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  RequestBook(
    request: QueryGetRequestBookRequest
  ): Promise<QueryGetRequestBookResponse> {
    const data = QueryGetRequestBookRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.loan.Query", "RequestBook", data);
    return promise.then((data) =>
      QueryGetRequestBookResponse.decode(new _m0.Reader(data))
    );
  }

  RequestBookAll(
    request: QueryAllRequestBookRequest
  ): Promise<QueryAllRequestBookResponse> {
    const data = QueryAllRequestBookRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.loan.Query", "RequestBookAll", data);
    return promise.then((data) =>
      QueryAllRequestBookResponse.decode(new _m0.Reader(data))
    );
  }

  GetMadenRequests(
    request: QueryGetMadenRequestsRequest
  ): Promise<QueryGetMadenRequestsResponse> {
    const data = QueryGetMadenRequestsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nuah.loan.Query",
      "GetMadenRequests",
      data
    );
    return promise.then((data) =>
      QueryGetMadenRequestsResponse.decode(new _m0.Reader(data))
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
