const {Skolengo} = require('scolengo-api')

config = {
    "tokenSet": {
      "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNrb0FwcEtleUlkIiwib3JnLmFwZXJlby5jYXMuc2VydmljZXMuUmVnaXN0ZXJlZFNlcnZpY2UiOiIxMDEifQ.eyJhdWQiOiJTa29BcHAuUHJvZC4wZDM0OTIxNy05YTRlLTQxZWMtOWFmOS1kZjllNjllMDk0OTQiLCJzdWIiOiJFU0tPLVAtOWE0YzA4MzEtOTUwYy00YWU2LWFmYTUtNjQ1ZWU4Yzk2MjNiIiwicHJvZmlsZSI6IkVsZXZlIiwiaXNzIjoiaHR0cHM6Ly9zc28ubW9uLWVudC1vY2NpdGFuaWUuZnIvb2lkYyIsImdpdmVuX25hbWUiOiJHdWlsbGF1bWUiLCJleHAiOjE3MzE1ODA4MDAsImlhdCI6MTczMTQ5NDQwMCwiZmFtaWx5X25hbWUiOiJRVUFSTUVBVSIsImp0aSI6IkFULTExMjM4MC1ZVWhSVnlWUHlremhncnlLdEVKdEVIZ2ZEWFhoc3phTSIsImVtYWlsIjoiZ3VpbGxhdW1lLnF1YXJtZWF1QG1vbi1lbnQtb2NjaXRhbmllLmZyIn0.hBRAgm6dgsaLVrHBrJHkFYOxTXLTWm6ZOEYwTYuuwM0h1hNF3V9hKkmTBDEESw8FnRA5qzNyxxRhzgNFwhp52_kwoNRPDF7avkvjb5iLj6YlY3pfimaeu_8EYCWNy_fKrX-kOpEj4d8aOLcATT6vA2BEyU0Y_wTTmhwYmYxHgSYH6AWIUbXMmfMsi1d9O79poRN9c_UvINU4C5K0MvLLdE5HK0_dyfzwuTNjYq7qVeDo8QWKBdPIfebWy6dBA3t6qC0SwNIsrefFFiTN8c_jhZpiwFw3I2K1Fru1kDSElyHPD-NR0YAYFQQsAeraqES-J0dtQ_BJZheHAsubLxs5ZA",
      "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNrb0FwcEtleUlkIn0.eyJqdGkiOiJUR1QtMTY3NzkteEp5eG5tZmhpZ0M3dkhQVDlOeVMwZFZEWk1SUko4Ti11LTVPMDYtNy1FWi1tLVhGREZUbldic2tJLUdLVkJ4cGtkcy1lbnRtaXAtcHJvZC1zc28xIiwic2lkIjoiMjJlYmYwMjY1NDEwYzE0NWQ2ZGI2YzQzMzJlMTRkNTk2NjY1ZDYzNCIsImlzcyI6Imh0dHBzOi8vc3NvLm1vbi1lbnQtb2NjaXRhbmllLmZyL29pZGMiLCJhdWQiOiJTa29BcHAuUHJvZC4wZDM0OTIxNy05YTRlLTQxZWMtOWFmOS1kZjllNjllMDk0OTQiLCJleHAiOjE3MzE1MjMyMDAsImlhdCI6MTczMTQ5NDQwMCwibmJmIjoxNzMxNDk0MTAwLCJzdWIiOiJFU0tPLVAtOWE0YzA4MzEtOTUwYy00YWU2LWFmYTUtNjQ1ZWU4Yzk2MjNiIiwiYW1yIjpbIkRlbGVnYXRlZENsaWVudEF1dGhlbnRpY2F0aW9uSGFuZGxlciJdLCJjbGllbnRfaWQiOiJTa29BcHAuUHJvZC4wZDM0OTIxNy05YTRlLTQxZWMtOWFmOS1kZjllNjllMDk0OTQiLCJhdXRoX3RpbWUiOjE3MzE0OTQzOTksImF0X2hhc2giOiJ5Wmc0MlpTUzhrVzhaU19kdEc1bGl3IiwiZW1haWwiOiJndWlsbGF1bWUucXVhcm1lYXVAbW9uLWVudC1vY2NpdGFuaWUuZnIiLCJmYW1pbHlfbmFtZSI6IlFVQVJNRUFVIiwiZ2l2ZW5fbmFtZSI6Ikd1aWxsYXVtZSIsInByb2ZpbGUiOiJFbGV2ZSIsInByZWZlcnJlZF91c2VybmFtZSI6IkVTS08tUC05YTRjMDgzMS05NTBjLTRhZTYtYWZhNS02NDVlZThjOTYyM2IifQ.h9CNLOWZqPo-4myNRp5OtDjxu1uo83CpjmiymH9uGApbEkkp7HefzMyvytQLbAFlQM3cDXhjZ0CP9O0V0Kx6ZubNOxLo3GG9PII7hibMh_T09gHVQAzadfYoKs7LPFz0EzY5YmCYasQ2TzE8JVmqXMCdpNJCJTjdLnvca_KiuUAi3L8C4go7z1OjtyPJPGGOU_Y05yL2I7RVW2mDcleV7vh6rwypw58cVwFXziaRsMK21HgOZTKriV9WX4t91aa11dQSkQzyyZ8S31YQ8VRwlacO2yxQf7ezx6VDbUKK8HiOH94vw3eWMVyE9ZV6X076-F6RBMm0X6J9BCy95kjznA",
      "refresh_token": "RT-d29e6b760ff39bceb8e7148c0e506673-112380-31GHyG4L-pmJIvPG8m9Vy6wG59zAC4F8",
      "token_type": "Bearer",
      "expires_at": 1731580801,
      "scope": "openid"
    },
    "school": {
      "id": "SKO-E-7a9262e3-6dc7-4804-a447-51a07f9bd78f",
      "name": "Lycée général et technologique international Victor Hugo",
      "addressLine1": "Boulevard Victor Hugo",
      "addressLine2": null,
      "addressLine3": null,
      "zipCode": "31773",
      "city": "COLOMIERS CEDEX",
      "country": "France",
      "homePageUrl": "https://cas.mon-ent-occitanie.fr/login?service=https%3A%2F%2Fvictor-hugo-colomiers.mon-ent-occitanie.fr%2Fsg.do%3FPROC%3DPAGE_ACCUEIL",
      "emsCode": "entmip",
      "emsOIDCWellKnownUrl": "https://sso.mon-ent-occitanie.fr/oidc/.well-known"
    }
  }


Skolengo.fromConfigObject(config).then(async user => {
  const startDate = new Date().toISOString().split('T')[0] // Aujourd'hui
  const endDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1e3).toISOString().split('T')[0] // Aujourd'hui + 15 jours
  const homework = await user.getHomeworkAssignments(user.getTokenClaims().sub, startDate, endDate)

    document.body.innerHTML = "<p>Voici les exercices à faire pour les 2 prochaines semaines :</p>"
    document.body.innerHTML = "<p>"homework"</p>"
})