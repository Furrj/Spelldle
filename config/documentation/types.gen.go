// Package types provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.3.0 DO NOT EDIT.
package types

const (
	BasicAuthScopes = "BasicAuth.Scopes"
)

// AuthDataAllTokens defines model for auth_data_all_tokens.
type AuthDataAllTokens struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

// RequestPayloadLogin defines model for request_payload_login.
type RequestPayloadLogin struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

// RequestPayloadRegister defines model for request_payload_register.
type RequestPayloadRegister struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Password  string `json:"password"`
	Username  string `json:"username"`
}

// ResponseRegisterLogin defines model for response_register_login.
type ResponseRegisterLogin struct {
	UserDataAccount  UserDataAccount   `json:"user_data_account"`
	UserDataPersonal UserDataPersonal  `json:"user_data_personal"`
	UserDataTokens   AuthDataAllTokens `json:"user_data_tokens"`
	UserId           UserId            `json:"user_id"`
	Valid            Valid             `json:"valid"`
}

// UserDataAccount defines model for user_data_account.
type UserDataAccount struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

// UserDataPersonal defines model for user_data_personal.
type UserDataPersonal struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

// UserId defines model for user_id.
type UserId = float32

// Valid defines model for valid.
type Valid = bool

// PostLoginJSONRequestBody defines body for PostLogin for application/json ContentType.
type PostLoginJSONRequestBody = RequestPayloadLogin

// PostRegisterJSONRequestBody defines body for PostRegister for application/json ContentType.
type PostRegisterJSONRequestBody = RequestPayloadRegister
