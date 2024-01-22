from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Input(_message.Message):
    __slots__ = ("pclass", "age", "fare", "female", "male")
    PCLASS_FIELD_NUMBER: _ClassVar[int]
    AGE_FIELD_NUMBER: _ClassVar[int]
    FARE_FIELD_NUMBER: _ClassVar[int]
    FEMALE_FIELD_NUMBER: _ClassVar[int]
    MALE_FIELD_NUMBER: _ClassVar[int]
    pclass: int
    age: int
    fare: float
    female: int
    male: int
    def __init__(self, pclass: _Optional[int] = ..., age: _Optional[int] = ..., fare: _Optional[float] = ..., female: _Optional[int] = ..., male: _Optional[int] = ...) -> None: ...

class Prediction(_message.Message):
    __slots__ = ("survive",)
    SURVIVE_FIELD_NUMBER: _ClassVar[int]
    survive: int
    def __init__(self, survive: _Optional[int] = ...) -> None: ...
