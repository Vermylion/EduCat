# For simplicity and my sanity, types aren't included in this version of the library
# Maybe for a later version
# Base 64
import base64
# Basic types
from typing import Optional, List, Dict, Union, Any
# Json handling
import json
# Replace axios with requests
import requests
from requests.exceptions import HTTPError
# Replace oid-client with authlib
from authlib.integrations.requests_client import OAuth2Session
# from requests_oauthlib import OAuth2Session


BASE_URL = 'https://api.skolengo.com/api/v1/bff-sko-app'
OID_CLIENT_ID = base64.b64decode('U2tvQXBwLlByb2QuMGQzNDkyMTctOWE0ZS00MWVjLTlhZjktZGY5ZTY5ZTA5NDk0').decode('utf-8') # base64 du client ID de l'app mobile
OID_CLIENT_SECRET = base64.b64decode('N2NiNGQ5YTgtMjU4MC00MDQxLTlhZTgtZDU4MDM4NjkxODNm').decode('utf-8') # base64 du client Secret de l'app mobile
REDIRECT_URI = 'skoapp-prod://sign-in-callback'


class Skolengo:

    def __init__(self,
                 oidClient,
                 school,
                 tokenSet,
                 config=None) -> None:
        
        self.oidClient = oidClient
        self.school = school
        self.tokenSet = tokenSet
        self.config = config or {}

        self.config = {
            "http_client": config.get("http_client", requests.Session()),
            "on_token_refresh": config.get("on_token_refresh", lambda: None),
            "refresh_token": config.get("refresh_token"),
            "handle_pronote_error": config.get("handle_pronote_error", False)
        }
        
        # Set the base URL for the session's requests
        self.config["http_client"].base_url = self.BASE_URL

    def revokeToken(oidClient, url, token):
        """
        url: the token endpoint url, has to be https
        """
        oidClient.revoke_token(url, token)

    def getAppCurrentConfig(httpConfig={}):
        ...

    def searchSchool(filter, limit=10, offset=0, httpConfig={}):
        params = {
            "page[limit]": limit,
            "page[offset]": offset,
            "filter[text]": filter
        }

        config = {"base_url": BASE_URL}
        if httpConfig:
            config.update(httpConfig)

        response = requests.get(f"{config['base_url']}/schools",
                                params=params)
        
        return [_flatten_dict(school) for school in response.json()['data']]
    
    def getOIDClient(school, redirectUri = 'skoapp-prod://sign-in-callback'):
        if school['emsOIDCWellKnownUrl'] == None: 
            raise TypeError('emsOIDCWellKnownUrl invalid')

        response = requests.get(school['emsOIDCWellKnownUrl'])
        response.raise_for_status()  # Ensure the request was successful
        config = response.json()
        # print(config)

        # Create an OAuth2 session using the metadata
        oauth = OAuth2Session(
            client_id=OID_CLIENT_ID,
            redirect_uri=redirectUri,
            authorization_url=config["authorization_endpoint"],
            token_url=config["token_endpoint"])

        # Set the client secret manually (authlib doesn’t automatically handle this)
        oauth.client_secret = OID_CLIENT_SECRET

        return oauth, config
    
    def fromConfigObject(config, skolengoConfig = {}):
        try:
            return Skolengo(Skolengo.getOIDClient(config.school), config.school, config.tokenSet, skolengoConfig)
        
        except:
            return Skolengo(None, config.school, config.tokenSet, skolengoConfig)
        
    def getUserInfo(self,
                    userId = None,
                    params = None,
                    includes = ['school', 'students', 'students.school', 'schools', 'prioritySchool']):
        
        response = self.request({
            "url": f'/users-info/{userId if userId else self.getTokenClaims().get('sub')}',
            "responseType": 'json',
            "params": params
        })

    def getTokenClaims():
        ...

    def onPronoteError():
        ...

    def request(self, config):
        """
        Perform an HTTP request with token-based authentication and error handling.
        """
        # Prepare the request configuration
        headers = {
            "Authorization": f"Bearer {self.token_set['access_token']}",
            "X-Skolengo-Date-Format": "utc",
            "X-Skolengo-School-Id": self.school["id"],
            "X-Skolengo-Ems-Code": self.school["ems_code"]
        }

        request_config = {
            **config,
            "with_credentials": True,
            "headers": headers
        }

        try:
            # Make the HTTP request
            response = requests.request(**request_config)
            response.raise_for_status()  # Raise HTTPError for bad responses
            return response
        
        except HTTPError as e:
            raise e
        
        # except HTTPError as e:
        #     # Handle HTTP errors
        #     response = e.response
        #     if response is None:
        #         raise e
# 
        #     if response.status_code == 401:
        #         # Refresh token and retry the request
        #         new_token_set = self.refresh_token()
        #         headers["Authorization"] = f"Bearer {new_token_set['access_token']}"
        #         request_config["headers"] = headers
        #         response = requests.request(**request_config)
        #         response.raise_for_status()
        #         return response
# 
        #     # Check for specific error types in the response
        #     if "errors" in response.json() and isinstance(response.json()["errors"], list):
        #         first_error = response.json()["errors"][0]
        #         skolengo_error = SkolengoError(first_error)
# 
        #         if (
        #             self.config.get("handle_pronote_error", False)
        #             and skolengo_error.name == "PRONOTE_RESOURCES_NOT_READY"
        #         ):
        #             return self.on_pronote_error(request_config)
# 
        #         raise skolengo_error
        #     
        #     # Re-raise any unhandled HTTP errors
        #     raise e
    

        



def _flatten_dict(d):
    items = []
    for key, value in d.items():
        if isinstance(value, dict):
            items.extend(_flatten_dict(value).items())
        else:
            items.append((key, value))
    
    return dict(items)


# Testing
if __name__ == "__main__":
    oid_client, config = Skolengo.getOIDClient()
    OAuth2Session().revoke_token()