from authomatic.providers import oauth2
from authomatic import provider_id
from authomatic import Authomatic

CONFIG = {
    'google': {
        'id': provider_id(),
        'class_': oauth2.Google,
        'consumer_key': 'YOUR_CLIENT_ID',
        'consumer_secret': YOUR_CLIENT_SECRET',
        'scope': [
            'profile',
            'email',
        ]  # add whichever you want
    },
    'github': {
        'id': provider_id(),
        'class_': oauth2.GitHub,
        'consumer_key': 'CLIENT_ID',
        'consumer_secret': 'SECRET',
        'scope': [
            'user',
        ]
    }
}

authomatic = Authomatic(CONFIG, 'YOUR_SUPER_CONFIDENTIAL_SECRET')
