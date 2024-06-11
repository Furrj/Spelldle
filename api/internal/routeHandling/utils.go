package routeHandling

import "spelldle.com/server/internal/types"

func CreateResponseRegisterLogin(
	valid bool,
	userID types.UserID,
	userDataAccount types.UserDataAccount,
	userDataPersonal types.UserDataPersonal,
	userDataTokens types.UserDataTokens,
) types.ResponseRegisterLogin {
	return types.ResponseRegisterLogin{
		Valid:  valid,
		UserId: userID,
		UserDataAccount: types.ResponseUserDataAccount{
			Username: userDataAccount.Username,
		},
		UserDataPersonal: userDataPersonal,
		UserDataTokens:   userDataTokens,
	}
}
