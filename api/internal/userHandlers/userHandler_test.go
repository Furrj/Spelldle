package userHandlers

import (
	"testing"
	"time"

	"spelldle.com/server/internal/schemas"
)

func TestUserHandler(t *testing.T) {
	t.Run("GenerateSessionData", func(t *testing.T) {
		newSessionData := GenerateNewUserSessionData(1)
		if !testSessionDataProps(t, newSessionData) {
			t.Error("Error generating new session data\n")
		}
	})
}

func testSessionDataProps(t *testing.T, sessionData schemas.UserSessionData) bool {
	t.Helper()
	if sessionData.UserID < 1 || sessionData.Expires < uint64(time.Now().Unix()+7776000) {
		return false
	}
	if len(sessionData.SessionKey) != 36 {
		return false
	}
	return true
}
