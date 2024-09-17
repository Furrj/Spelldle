package middleware

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"spelldle.com/server/internal/auth"
	"spelldle.com/server/internal/routing/consts"
)

func (mw *MiddlewareHandler) HandleCookie() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if _, exists := mw.JWTValidatedRoutes[ctx.FullPath()]; !exists {
			fmt.Println("Skipping middleware")
			ctx.Next()
			return
		}

		fmt.Println("Running handle cookie")
		cookieValue, err := ctx.Cookie(consts.CookieKeyGuest)
		if err != nil {
			fmt.Println("No cookie found")
			ctx.Status(http.StatusInternalServerError)
			ctx.Abort()
			return
		}

		token, err := auth.ParseAndValidateJWT(cookieValue, []byte(os.Getenv("JWT_SECRET")))
		if err != nil {
			if errors.Is(err, jwt.ErrTokenMalformed) {
				fmt.Printf("%+v\n", err)
			} else {
				fmt.Printf("Error parsing token: %+v\n", err)
			}
			ctx.Status(http.StatusUnauthorized)
			ctx.Abort()
			return
		}

		userIdAsString, err := token.Claims.GetSubject()
		if err != nil {
			fmt.Printf("Error getting subject claim from token: %+v\n", err)
			ctx.Status(http.StatusUnauthorized)
			ctx.Abort()
			return
		}
		fmt.Printf("SUB: %+v\n", userIdAsString)
		expiry, err := token.Claims.GetExpirationTime()
		if err != nil {
			fmt.Printf("error getting expiry: %+v\n", err)
		} else {
			fmt.Printf("EXPIRY: %+v\n", expiry)
		}

		// userID, err := stringToUint(userIdAsString)
		// if err != nil {
		// 	fmt.Println("Error parsing userID to uint")
		// 	ctx.JSON(http.StatusUnauthorized, invalidResponse)
		// 	ctx.Abort()
		// 	return
		// }

		ctx.Status(http.StatusOK)
		ctx.Abort()
	}
}
