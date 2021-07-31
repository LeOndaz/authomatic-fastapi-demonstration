from fastapi import Request
from fastapi.responses import JSONResponse
from authomatic import Authomatic
from shared.fastapi_adapter import FastAPIAdapter
from shared.authomatic_config import CONFIG
from routers import router


@router.api_route('/prototypes/{provider}', methods=['GET', 'POST'])
async def google_oauth_handler(request: Request, provider: str):
    oauth2_handler = Authomatic(CONFIG, 'SECRET')

    response = JSONResponse()
    result = oauth2_handler.login(FastAPIAdapter(request, response), provider)

    if result:
        if result.err:
            return {
                'error': result.error.message
            }

        return result.user.credentials.serialize()


    return response
