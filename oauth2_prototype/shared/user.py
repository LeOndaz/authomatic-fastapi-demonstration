

class User:
    def __init__(self, name, avatar, email):
        self.name = name
        self.avatar = avatar
        self.email = email

    @classmethod
    def from_github(cls, data):
        return cls(avatar=data['avatar_url'], name=data['name'], email=data['email'])

    @classmethod
    def from_google(cls, data):
        return cls(avatar=data['picture'], name=data['name'], email=data['email'])

    def as_dict(self):
        return self.__dict__