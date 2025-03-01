from fastapi import FastAPI
from ServerPackages.api.Routes import API
from starlette.types import ASGIApp


class APP():
    """
    Class for managing FastAPI applications.
    """

    # The FastAPI application instance
    app: FastAPI

    @property
    def App(self):
        """
        Getter method for the FastAPI application instance.
        """
        return self.app

    def Mount(self, path: str, app: ASGIApp, name: str | None = None):
        """
        Method to mount a sub-application at a given path.

        Args:
            path (str): The path to mount the sub-application at.
            app (ASGIApp): The sub-application to mount.
            name (str | None, optional): The name of the sub-application. Defaults to None.
        """
        self.app.mount(path, app, name)

    def __init__(self, debug: bool = False):
        """
        Initializes a new FastAPI application instance.

        Args:
            debug (bool, optional): Whether to enable debug mode for the application. Defaults to False.
        """
        # Initialize a new FastAPI application instance with the given debug flag
        self.app = FastAPI(debug=debug)

    def ConnectNewAPIRoute(self, route: API):
        """
        Method to connect a new API route to the FastAPI application.

        Args:
            route (API): The API route to connect.
        """
        # Include the router from the given API route in the FastAPI application
        self.app.include_router(router=route.Router, prefix=route.Prefix)
