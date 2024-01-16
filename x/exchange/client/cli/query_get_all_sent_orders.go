package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"nuah/x/exchange/types"
)

var _ = strconv.Itoa(0)

func CmdGetAllSentOrders() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "get-all-sent-orders [from]",
		Short: "Query get-all-sent-orders",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqFrom := args[0]

			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetAllSentOrdersRequest{

				From: reqFrom,
			}

			res, err := queryClient.GetAllSentOrders(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
