package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"nuah/x/loan/types"
)

var _ = strconv.Itoa(0)

func CmdGetMadenRequests() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "get-maden-requests [from]",
		Short: "Query get-maden-requests",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqFrom := args[0]

			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetMadenRequestsRequest{

				From: reqFrom,
			}

			res, err := queryClient.GetMadenRequests(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
