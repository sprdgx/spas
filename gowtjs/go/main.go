package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/gopherjs/gopherjs/js"
)

type CustomClaims struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	Exp      int64  `json:"exp"`
}

type JWT struct {
	SecretKey  []byte
	Expiration time.Duration
}

func NewJWT(secretKey []byte, expiration time.Duration) *JWT {
	return &JWT{
		SecretKey:  secretKey,
		Expiration: expiration,
	}
}

func NewHeader() map[string]interface{} {
	return map[string]interface{}{
		"alg": "HS256",
		"typ": "JWT",
	}
}

func encodeJSON(data interface{}) (string, error) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(jsonData), nil
}

func GenerateToken(this *js.Object, args []*js.Object) interface{} {
	if len(args) < 4 {
		return "insufficient arguments"
	}

	secretKey := args[0].String()
	expiration := args[1].Int()
	username := args[2].String()
	role := args[3].String()

	jwt := NewJWT([]byte(secretKey), time.Duration(expiration)*time.Second)

	token, err := GenerateTokenForClaims(jwt, username, role)
	if err != nil {
		return fmt.Sprintf("Error generating token: %s", err)
	}

	return token
}

func GenerateTokenForClaims(jwt *JWT, username, role string) (string, error) {
	expirationTime := time.Now().Add(jwt.Expiration).Unix()

	claims := CustomClaims{
		Username: username,
		Role:     role,
		Exp:      expirationTime,
	}

	header := NewHeader()
	headerEncoded, err := encodeJSON(header)
	if err != nil {
		return "", fmt.Errorf("error encoding header: %w", err)
	}

	claimsEncoded, err := encodeJSON(claims)
	if err != nil {
		return "", fmt.Errorf("error encoding claims: %w", err)
	}

	unsignedToken := fmt.Sprintf("%s.%s", headerEncoded, claimsEncoded)

	mac := hmac.New(sha256.New, jwt.SecretKey)
	mac.Write([]byte(unsignedToken))
	signature := base64.RawURLEncoding.EncodeToString(mac.Sum(nil))

	signedToken := fmt.Sprintf("%s.%s", unsignedToken, signature)
	return signedToken, nil
}

func ValidateToken(this *js.Object, args []*js.Object) interface{} {
	if len(args) < 2 {
		return "insufficient arguments"
	}

	token := args[0].String()
	secretKey := args[1].String()

	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return "invalid token format"
	}

	// Verify the signature
	mac := hmac.New(sha256.New, []byte(secretKey))
	mac.Write([]byte(parts[0] + "." + parts[1]))
	expectedMAC := mac.Sum(nil)
	decodedSignature, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return fmt.Sprintf("error decoding signature: %s", err)
	}

	if !hmac.Equal(decodedSignature, expectedMAC) {
		return "token signature does not match"
	}

	return "token is valid"
}

func DecodeToJson(this *js.Object, args []*js.Object) interface{} {
	if len(args) < 1 {
		return "insufficient arguments"
	}

	token := args[0].String()

	decodedPayload, err := base64.RawURLEncoding.DecodeString(token)
	if err != nil {
		return "error decoding payload: " + err.Error()
	}

	return string(decodedPayload)
}

func main() {
	js.Global.Set("GenerateToken", js.MakeFunc(GenerateToken))
	js.Global.Set("ValidateToken", js.MakeFunc(ValidateToken))
	js.Global.Set("DecodeToJson", js.MakeFunc(DecodeToJson))
}
