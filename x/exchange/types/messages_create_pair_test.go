package types

import (
	"testing"

	"nuah/testutil/sample"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"
)

func TestMsgSendCreatePair_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgSendCreatePair
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgSendCreatePair{
				Creator:          "invalid_address",
				TimeoutTimestamp: 100,
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "invalid port",
			msg: MsgSendCreatePair{
				Creator:          sample.AccAddress(),
				TimeoutTimestamp: 100,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid channel",
			msg: MsgSendCreatePair{
				Creator:          sample.AccAddress(),
				TimeoutTimestamp: 100,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "invalid timeout",
			msg: MsgSendCreatePair{
				Creator:          sample.AccAddress(),
				TimeoutTimestamp: 0,
			},
			err: sdkerrors.ErrInvalidRequest,
		}, {
			name: "valid message",
			msg: MsgSendCreatePair{
				Creator:          sample.AccAddress(),
				TimeoutTimestamp: 100,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
