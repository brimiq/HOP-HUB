from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Provider
import random


router = APIRouter()

provider_names = [
    "UberLite", "BoltRide", "CityCab", "SwiftMove", "GoRide", "ZipCab",
    "RideNow", "SkyTaxi", "MetroMove", "FlexiRide", "RapidCab", "UrbanLift",
    "DashRide", "PrimeTaxi", "MoveX", "RidePlus", "FlyCab", "QuickHop",
    "HopGo", "TaxiBee"
]

@router.post("/seed")
def seed_providers(db: Session = Depends(get_db)):
    for name in provider_names:
        if not db.query(Provider).filter_by(name=name).first():
            db.add(Provider(name=name, base_fare=random.uniform(150, 350)))
    db.commit()
    return {"status": "providers seeded", "count": len(provider_names)}

@router.get("/")
def list_providers(db: Session = Depends(get_db)):
    return db.query(Provider).all()
