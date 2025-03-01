from abc import ABC, abstractmethod
from fastapi import APIRouter
from ServerPackages.api.DataTypes import Bank
import json


class API(ABC):
    # Fields
    # _prefix: str = "/" - prefix for all API routes
    _prefix: str = "/api"

    # _path: str = "" - default path for API routes
    _path: str = "/"

    # _router: APIRouter = None - router object used to create API routes
    _router: APIRouter = APIRouter()

    # Getters
    @property
    def Path(self):  # getter method for the path field
        return self._path

    @property
    def Router(self):  # getter method for the router field
        return self._router

    @property
    def Prefix(self):  # getter method for the prefix field
        return self._prefix

    # Setters
    @Router.setter  # setter method to update the router object
    def _Router(self, newRouter: APIRouter):
        self._router = newRouter

    @Path.setter  # setter method to update the path
    def _Path(self, newPath: str):
        self._path = newPath

    @Prefix.setter  # setter method to update the prefix
    def _Prefix(self, newPrefix):
        self._prefix = newPrefix

    # Methods
    @abstractmethod  # abstract method that must be implemented by subclasses
    def EndPoint(self):  # method that will do something when a person comes on the path
        """End point method that will do something when a person come on the path."""


class APICheckBin(API):
    """
    API endpoint for checking bank bin information.
    """

    # Default bank to return if no match found in bins.json
    _defaultBank = Bank("Unknown", "498ee4")

    def EndPoint(self, bin: str) -> dict:
        """
        Endpoint method for checking a bank bin.

        Args:
            bin (str): The name of the bank bin to check.

        Returns:
            dict: A dictionary containing the bank information if found,
                  otherwise returns the default bank.
        """
        # Read bins.json file and load its contents into a dictionary
        with open("data/bins.json", 'r') as file:
            banks: dict = json.loads(file.read())

        # Iterate over each bank in the dictionary
        for bank in banks:
            # Get the list of bins for this bank
            bins: list = banks[bank]["bins"]
            
            # Iterate over each bin and check if it matches the given bin
            for _bin in bins:
                if (_bin == bin):
                    
                    # If a match is found, return the bank information as a dictionary
                    return Bank(bank, banks[bank]["color"]).ToDict()

        # If no match is found, return the default bank
        return self._defaultBank.ToDict()

    def __init__(self):
        """
        Initializes the API route for checking bank bins.
        """
        super().__init__()
        
        # Set the path for this API endpoint to /checkBin/{bin}
        self._path = self._path + "checkBin/{bin}"
        
        # Add the EndPoint method as the handler for this route
        self._router.add_api_route(self._path, self.EndPoint)

