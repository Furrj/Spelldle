package routes

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/internal/routing/consts"
	"spelldle.com/server/internal/routing/utils"
	"spelldle.com/server/shared/dbHandler"
	"spelldle.com/server/shared/types"
)

func RegisterGuest(db *dbHandler.DBHandler) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// insert User
		userID, err := db.InsertUser()
		if err != nil {
			ctx.Status(http.StatusInternalServerError)
			fmt.Printf("Error inserting user: %+v\n", err)
			return
		}

		// create and insert game session
		gameSession, err := utils.SpawnFirstGameSession(userID, db)
		fmt.Printf("created game session: %+v\n", gameSession)
		if err := db.InsertGameSession(gameSession); err != nil {
			ctx.Status(http.StatusInternalServerError)
			fmt.Printf("error spawning game session: %+v", err)
			return
		}

		// create user data
		userData := types.UserData{
			FirstName:     "GUEST",
			LastName:      "GUEST",
			Username:      fmt.Sprintf("guest#%d", userID),
			Password:      "GUEST",
			Salt:          "GUEST",
			Role:          "G",
			GameSessionID: gameSession.GameSessionID,
			UserID:        userID,
		}

		// Insert UserData
		if err := db.InsertUserData(userData); err != nil {
			ctx.Status(http.StatusInternalServerError)
			fmt.Printf("Error inserting user: %+v\n", err)
			return
		}

		// update user gameSessionID
		if err := db.UpdateUserGameSessionIDByUserID(gameSession.GameSessionID, userID); err != nil {
			ctx.Status(http.StatusInternalServerError)
			fmt.Printf("Error updating user gameSessionID: %+v\n", err)
			return
		}

		// generate JWT
		accessToken, err := auth.CreateJWTFromUserID(userID)
		if err != nil {
			ctx.Status(http.StatusInternalServerError)
			return
		}

		setCookieHandler(ctx, accessToken)
		ctx.Status(http.StatusCreated)
	}
}

func setCookieHandler(ctx *gin.Context, jwt string) {
	cookieName := consts.CookieKeyGuest
	cookieValue := jwt
	// maxAge := 2592000 // one month
	// TODO: change in prod
	path := "/"
	domain := "localhost"
	secure := true
	httpOnly := true

	cookie := http.Cookie{
		Name:     cookieName,
		Value:    cookieValue,
		Expires:  time.Now().Add(24 * 30 * time.Hour),
		Path:     path,
		Domain:   domain,
		Secure:   secure,
		HttpOnly: httpOnly,
		SameSite: http.SameSiteStrictMode,
	}

	// ctx.SetCookie(cookieName, cookieValue, maxAge, path, domain, secure, httpOnly)
	http.SetCookie(ctx.Writer, &cookie)
}
