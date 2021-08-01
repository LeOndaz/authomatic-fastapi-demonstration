from fastapi import Request, FastAPI, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from authomatic.core import Credentials
from shared.fastapi_adapter import FastAPIAdapter
from shared.authomatic_config import CONFIG, authomatic
from shared.consts import USER_AGENT
from shared.user import User
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

origins = [
    'http://localhost:3000',
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)


class AuthRequestBody(BaseModel):
    token: str
    provider: str


@app.api_route('/prototypes/{provider}', methods=['GET', 'POST'])
async def google_oauth_handler(request: Request, provider: str):
    response = JSONResponse()
    result = authomatic.login(FastAPIAdapter(request, response), provider)

    if result:
        if result.error:
            return {
                'error': result.error.message
            }
        return RedirectResponse(
            f'http://localhost:3000/auth/{result.provider.name}?token={result.user.credentials.serialize()}')

    return response


@app.post('/me')
async def me(body: AuthRequestBody):
    token, provider = body.token, body.provider

    if provider not in CONFIG.keys():
        raise HTTPException(400, detail='INVALID_PROVIDER')

    try:
        credentials = Credentials.deserialize(CONFIG, token)
    except Exception:
        raise HTTPException(400, detail='INVALID_TOKEN')

    if credentials.expire_soon(60 * 5):
        r = credentials.refresh()
        if r and not r.status == 200:
            raise HTTPException(401, detail='EXPIRED_TOKEN')

    if provider.lower() == 'google':
        api_url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'
        parser = User.from_google

    if provider.lower() == 'github':
        api_url = 'https://api.github.com/user'
        parser = User.from_github

    response = authomatic.access(credentials, api_url, headers={
        'User-Agent': USER_AGENT,
    })

    return {
        'user': parser(response.data).as_dict(),
    }
