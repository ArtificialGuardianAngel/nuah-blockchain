/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "nuah.requests";

export interface MsgCreateRequest {
  creator: string;
  to: string;
  amount: Coin | undefined;
  details: string;
}

export interface MsgCreateRequestResponse {
}

function createBaseMsgCreateRequest(): MsgCreateRequest {
  return { creator: "", to: "", amount: undefined, details: "" };
}

export const MsgCreateRequest = {
  encode(message: MsgCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.details !== "") {
      writer.uint32(34).string(message.details);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.to = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.details = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateRequest {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      to: isSet(object.to) ? String(object.to) : "",
      amount: isSet(object.amount) ? Coin.fromJSON(object.amount) : undefined,
      details: isSet(object.details) ? String(object.details) : "",
    };
  },

  toJSON(message: MsgCreateRequest): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.to !== undefined && (obj.to = message.to);
    message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.details !== undefined && (obj.details = message.details);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRequest>, I>>(object: I): MsgCreateRequest {
    const message = createBaseMsgCreateRequest();
    message.creator = object.creator ?? "";
    message.to = object.to ?? "";
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Coin.fromPartial(object.amount)
      : undefined;
    message.details = object.details ?? "";
    return message;
  },
};

function createBaseMsgCreateRequestResponse(): MsgCreateRequestResponse {
  return {};
}

export const MsgCreateRequestResponse = {
  encode(_: MsgCreateRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRequestResponse();
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

  fromJSON(_: any): MsgCreateRequestResponse {
    return {};
  },

  toJSON(_: MsgCreateRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateRequestResponse>, I>>(_: I): MsgCreateRequestResponse {
    const message = createBaseMsgCreateRequestResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateRequest(request: MsgCreateRequest): Promise<MsgCreateRequestResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateRequest = this.CreateRequest.bind(this);
  }
  CreateRequest(request: MsgCreateRequest): Promise<MsgCreateRequestResponse> {
    const data = MsgCreateRequest.encode(request).finish();
    const promise = this.rpc.request("nuah.requests.Msg", "CreateRequest", data);
    return promise.then((data) => MsgCreateRequestResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
