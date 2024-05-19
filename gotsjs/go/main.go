package main

//go:generate gopherjs build --minify

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"math/big"
	"time"

	"github.com/gopherjs/gopherjs/js"
)

func main() {
	js.Module.Get("exports").Set("generitiCert", js.MakeFunc(generitiCert))
}

func generitiCert(this *js.Object, arguments []*js.Object) interface{} {
	// Generate RSA private key
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return err.Error()
	}

	// Create certificate template
	template := x509.Certificate{
		SerialNumber: big.NewInt(time.Now().Unix()),
		Subject: pkix.Name{
			CommonName:         "localhost",
			Organization:       []string{"SPRD"}, // Set Organization (O) name to "SPRD"
			OrganizationalUnit: []string{"SPRD"}, // Set Organizational Unit (OU) to placeholder
		},
		NotBefore:             time.Now(),
		NotAfter:              time.Now().AddDate(1, 0, 0), // Valid for 1 year
		KeyUsage:              x509.KeyUsageKeyEncipherment | x509.KeyUsageDigitalSignature,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth},
		BasicConstraintsValid: true,
	}

	// Generate certificate
	derBytes, err := x509.CreateCertificate(rand.Reader, &template, &template, &privateKey.PublicKey, privateKey)
	if err != nil {
		return err.Error()
	}

	// Write certificate to PEM format
	certPEM := pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: derBytes})

	// Write private key to PEM format
	privateKeyPEM := pem.EncodeToMemory(&pem.Block{Type: "RSA PRIVATE KEY", Bytes: x509.MarshalPKCS1PrivateKey(privateKey)})

	return map[string]interface{}{
		"certificate": string(certPEM),
		"privateKey":  string(privateKeyPEM),
	}
}
