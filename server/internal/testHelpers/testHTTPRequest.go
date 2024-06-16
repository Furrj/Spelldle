package testHelpers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"

	"github.com/gin-gonic/gin"
)

func TestHTTPRequest[P any, R any](payload *P, response *R, routeHandler func(ctx *gin.Context)) error {
	marshalled, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("error marshalling payload: %+vn", err)
	}

	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	_, router := gin.CreateTestContext(w)

	r, err := http.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(marshalled))
	if err != nil {
		return fmt.Errorf("error creating request: %+v", err)
	}
	router.POST("/api/register", routeHandler)
	router.ServeHTTP(w, r)

	err = json.Unmarshal(w.Body.Bytes(), response)
	if err != nil {
		return fmt.Errorf("error unmarshalling response: %+v", err)
	}

	return nil
}
