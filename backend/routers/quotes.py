from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Provider, RouteRequest, Quote
import random


router = APIRouter()

@router.post("/seed")
def seed_quotes(db: Session = Depends(get_db)):
    providers = db.query(Provider).all()
    routes = db.query(RouteRequest).all()

    for route in routes:
        for provider in providers:
            price = random.uniform(200, 1500)
            db.add(Quote(provider_id=provider.id, route_id=route.id, price=price))

    db.commit()
    return {"status": "quotes seeded"}
