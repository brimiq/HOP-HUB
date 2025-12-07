from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, init_db
from models import Provider, RouteRequest, Quote, UserSearch

import random

app = FastAPI(title="HopHub API")


# ------------------------------
# Enable CORS for frontend
# ------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------
# Init DB
# ------------------------------
init_db()

# ------------------------------
# Sample Data
# ------------------------------
@app.on_event("startup")
def create_sample_data():
    db: Session = next(get_db())

    # ---- Providers ----
    provider_names = [
        "FastRide", "QuickCab", "ZoomCabs", "RideNow", "SwiftMove",
        "CityTaxi", "UberLite", "BoltRide", "EazyCabs", "GoQuick",
        "RideOn", "SpeedyTaxi", "JetCab", "RapidRide", "MetroCabs",
        "Zoomy", "TaxiHub", "FlashRide", "UrbanCab", "VroomTaxi"
    ]

    if db.query(Provider).count() == 0:
        db.add_all([Provider(name=n) for n in provider_names])
        db.commit()

    # ---- Routes ----
    route_pairs = [
        ("Nairobi", "Westlands"), ("Kilimani", "CBD"), ("Gigiri", "Karen"),
        ("Langata", "Ngong Road"), ("Parklands", "Hurlingham"), ("Roysambu", "Embakasi"),
        ("Kasarani", "Donholm"), ("Lang'ata", "Kileleshwa"), ("South C", "Industrial Area"),
        ("Muthaiga", "Lavington"), ("Eastleigh", "Ngara"), ("Karen", "CBD"),
        ("Westlands", "Kilimani"), ("CBD", "Westlands"), ("Upper Hill", "Ngong Road"),
        ("Donholm", "Kasarani"), ("Ngong Road", "Langata"), ("Embakasi", "Roysambu"),
        ("Hurlingham", "Parklands"), ("Industrial Area", "South C")
    ]

    if db.query(RouteRequest).count() == 0:
        db.add_all([RouteRequest(origin=o, destination=d) for o, d in route_pairs])
        db.commit()

    # ---- Quotes ----
    if db.query(Quote).count() == 0:
        providers = db.query(Provider).all()
        routes = db.query(RouteRequest).all()
        quotes = []

        for route in routes:
            for provider in providers:
                price = round(random.uniform(4.0, 15.0), 2)
                eta = random.randint(3, 12)  # 3 to 12 minutes
                quotes.append(
                    Quote(
                        price=price,
                        eta=eta,
                        provider_id=provider.id,
                        route_id=route.id,
                    )
                )

        db.add_all(quotes)
        db.commit()


# ------------------------------
# Routes
# ------------------------------
@app.get("/")
def root():
    return {"message": "HopHub API running!"}

@app.get("/providers/")
def list_providers(db: Session = Depends(get_db)):
    return db.query(Provider).all()

@app.get("/routes/")
def list_routes(db: Session = Depends(get_db)):
    return db.query(RouteRequest).all()

@app.get("/quotes/")
def list_quotes(db: Session = Depends(get_db)):
    return db.query(Quote).all()


@app.get("/results/")
def get_last_searches(db: Session = Depends(get_db), user_id: str = None):
    query = db.query(UserSearch)
    if user_id:
        query = query.filter(UserSearch.user_id == user_id)
    results = query.order_by(UserSearch.timestamp.desc()).limit(3).all()
    return [
        {"pickup": r.pickup, "destination": r.destination, "timestamp": r.timestamp}
        for r in results
    ]


# ------------------------------
# Compare Logic (UPGRADED)
# ------------------------------
@app.post("/compare/")
def compare_rides(
    data: dict = Body(...),
    db: Session = Depends(get_db)
):
    pickup = data.get("pickup")
    destination = data.get("destination")
    sort = data.get("sort", "cheapest")  # default cheapest
    user_id = data.get("user_id", "anonymous")  # optional user identifier

    # ---------------------------
    # Save the search for last searches
    # ---------------------------
    search = UserSearch(
        user_id=user_id,
        pickup=pickup,
        destination=destination
    )
    db.add(search)
    db.commit()

    # ---------------------------
    # Find the route
    # ---------------------------
    route = db.query(RouteRequest).filter_by(origin=pickup, destination=destination).first()
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")

    quotes = db.query(Quote).filter_by(route_id=route.id).all()
    if not quotes:
        raise HTTPException(status_code=404, detail="No quotes found")

    # ---------------------------
    # Build response objects
    # ---------------------------
    results = [
        {
            "provider_id": q.provider.id,
            "provider": q.provider.name,
            "price": q.price,
            "eta": q.eta,
            "score": round((q.price * 0.7) + (q.eta * 0.3), 2)
        }
        for q in quotes
    ]

    # ---------------------------
    # Sorting logic
    # ---------------------------
    if sort == "cheapest":
        results.sort(key=lambda x: x["price"])
    elif sort == "fastest":
        results.sort(key=lambda x: x["eta"])
    else:
        raise HTTPException(status_code=400, detail="Invalid sort option")

    return {
        "pickup": pickup,
        "destination": destination,
        "count": len(results),
        "sorted_by": sort,
        "results": results
    }
