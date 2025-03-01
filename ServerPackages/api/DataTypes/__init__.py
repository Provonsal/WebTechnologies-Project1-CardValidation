import ast
from typing import Iterable


class Color():
    """Class for representing a color."""
    
    # The color code as a string without '#' (e.g. (#)"ff0000")
    _colorCode: str
    
    def __repr__(self):
        """Representing method: returns the color code without the "#" symbol."""
        return self._colorCode.replace("#", "")
    
    def __str__(self):
        """String representation method: returns the color code with the "#" symbol."""
        return "#" + self._colorCode.replace("#", "")
    
    def __init__(self, color):
        """
        Initialization method: sets the color code.
        
        Args:
            color (str): Color code. Should be represented as html color code string without the '#' symbol.

        """
        self._colorCode = color


class Bank():
  """Class for representing a bank."""
  
  # The name of the bank as a string
  _bank: str
  
  # The color of the bank (an instance of the Color class)
  _color: Color

  @property
  def color(self):
    """Getter method for the color property, returns the color code with '#' symbol"""
    return self._color.__str__()

  @color.setter
  def color(self, color: str):
    """Setter method for the color property, sets the color code and creates a new Color object"""
    self._color = Color(color)

  def __repr__(self):
    """Representing method: returns a dictionary representation of the bank as {'bank': bankName, 'color': colorCode}"""
    return str({"bank": self._bank, "color": self.color})

  def ToDict(self) -> dict:
    """Method to convert the bank object to a dictionary using ast.literal_eval()"""
    return ast.literal_eval(self.__repr__())

  def __init__(self, bankName: str, color: str):
    """Initialization method: sets the bank name and creates a new Color object"""
    self._bank = bankName
    self._color = Color(color)

  @classmethod
  def fromDict(cls, source: dict[str, str]):
    """Class method to create a Bank object from a dictionary representation of the bank"""
    return cls(source["bank"], source["color"])

  @classmethod
  def fromIterable(cls, source: Iterable[str]):
    """Class method to create a Bank object from an iterable (list or tuple) containing two strings: bank name and color code"""
    return cls(next(source), next(source))
