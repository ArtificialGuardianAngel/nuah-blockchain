package cli

import (
	"strconv"

	"nuah/x/loan/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"

	"github.com/spf13/cast"
)

var _ = strconv.Itoa(0)

func CmdCreateRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-request [to] [amount] [denom]",
		Short: "Broadcast message create-request",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argTo := args[0]
			argAmount, err := cast.ToInt32E(args[1])
			if err != nil {
				return err
			}
			argDenom := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateRequest(
				clientCtx.GetFromAddress().String(),
				argTo,
				argAmount,
				argDenom,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
