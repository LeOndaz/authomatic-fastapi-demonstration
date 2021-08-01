from authomatic.providers import oauth2
from authomatic import provider_id
from authomatic import Authomatic
from .consts import (
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID
)

CONFIG = {
    'google': {
        'id': provider_id(),
        'class_': oauth2.Google,
        'consumer_key': GOOGLE_CLIENT_ID,
        'consumer_secret': GOOGLE_CLIENT_SECRET,
        'scope': [
            'profile',
            'email',
        ]  # add whichever you want
    },
    'github': {
        'id': provider_id(),
        'class_': oauth2.GitHub,
        'consumer_key': GITHUB_CLIENT_ID,
        'consumer_secret': GITHUB_CLIENT_SECRET,
        'scope': [
            'user',
        ]
    }
}

authomatic = Authomatic(CONFIG, 'YOUR_SUPER_CONFIDENTIAL_SECRET')
