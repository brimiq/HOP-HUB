from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import Provider, RouteRequest
import random

router = APIRouter()

@router.post("/")
def create_route(data: dict = Body(...), db: Session = Depends(get_db)):
    route = RouteRequest(origin=data["origin"], destination=data["destination"])
    db.add(route)
    db.commit()
    db.refresh(route)
    return route

@router.get("/")
def list_routes(db: Session = Depends(get_db)):
    return db.query(RouteRequest).all()
