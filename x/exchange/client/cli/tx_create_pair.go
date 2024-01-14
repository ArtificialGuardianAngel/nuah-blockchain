package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"nuah/x/exchange/types"
)

var _ = strconv.Itoa(0)

func CmdCreatePair() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-pair [source-denom] [target-denom]",
		Short: "Broadcast message create-pair",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argSourceDenom := args[0]
			argTargetDenom := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreatePair(
				clientCtx.GetFromAddress().String(),
				argSourceDenom,
				argTargetDenom,
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
