package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"nuah/x/loan/types"
)

var _ = strconv.Itoa(0)

func CmdCreateRequestBook() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-request-book [to] [amount] [denom]",
		Short: "Broadcast message create-request-book",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argTo := args[0]
			argAmount := args[1]
			argDenom := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateRequestBook(
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
