from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Provider(Base):
    __tablename__ = "providers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    base_fare = Column(Float)

    quotes = relationship("Quote", back_populates="provider")


class RouteRequest(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String, index=True)
    destination = Column(String, index=True)

    quotes = relationship("Quote", back_populates="route")


class Quote(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey("providers.id"))
    route_id = Column(Integer, ForeignKey("routes.id"))
    price = Column(Float)

    provider = relationship("Provider", back_populates="quotes")
    route = relationship("RouteRequest", back_populates="quotes")
