from authomatic.adapters import BaseAdapter


class FastAPIAdapter(BaseAdapter):
    def __init__(self, request, response):
        """
        :param request:
            An instance of the :class:`django.http.HttpRequest` class.

        :param response:
            An instance of the :class:`django.http.HttpResponse` class.
        """
        self.request = request
        self.response = response

    @property
    def params(self):
        return self.request.query_params

    @property
    def url(self):
        # remove leading slash from request.url.path
        return str(self.request.base_url) + str(self.request.url.path)[1:]

    @property
    def cookies(self):
        return self.request.cookies

    def write(self, value):
        self.response += value

    def set_header(self, key, value):
        self.response.headers[key] = value

    def set_status(self, status):
        self.response.status_code = int(status.split(' ')[0])
