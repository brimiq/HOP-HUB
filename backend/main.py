from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend.database import get_db, init_db
from backend.models import Provider, RouteRequest, Quote

app = FastAPI(title="HopHub API")

# ------------------------------
# CORS Configuration
# ------------------------------
# Allow React frontend to make requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# ------------------------------
# Initialize database
# ------------------------------
init_db()

# ------------------------------
# Sample data creation on startup
# ------------------------------
@app.on_event("startup")
def create_sample_data():
    db: Session = next(get_db())

    # Providers
    if db.query(Provider).count() == 0:
        db.add_all([Provider(name="FastRide"), Provider(name="QuickCab")])
        db.commit()

    # Routes
    if db.query(RouteRequest).count() == 0:
        db.add_all([
            RouteRequest(origin="Nairobi", destination="Westlands"),
            RouteRequest(origin="Kilimani", destination="CBD")
        ])
        db.commit()

    # Quotes
    if db.query(Quote).count() == 0:
        providers = db.query(Provider).all()
        routes = db.query(RouteRequest).all()
        db.add_all([
            Quote(price=5.5, provider_id=providers[0].id, route_id=routes[0].id),
            Quote(price=6.0, provider_id=providers[1].id, route_id=routes[0].id),
            Quote(price=4.5, provider_id=providers[0].id, route_id=routes[1].id),
            Quote(price=5.0, provider_id=providers[1].id, route_id=routes[1].id)
        ])
        db.commit()

# ------------------------------
# API Endpoints
# ------------------------------
@app.get("/")
def root():
    return {"message": "HopHub API running!"}

@app.get("/providers/")
def get_providers(db: Session = Depends(get_db)):
    return db.query(Provider).all()

@app.get("/routes/")
def get_routes(db: Session = Depends(get_db)):
    return db.query(RouteRequest).all()

@app.get("/quotes/")
def get_quotes(db: Session = Depends(get_db)):
    return db.query(Quote).all()

# ------------------------------
# Compare Endpoint
# ------------------------------
@app.post("/compare/")
def compare_rides(data: dict = Body(...), db: Session = Depends(get_db)):
    pickup = data.get("pickup")
    destination = data.get("destination")

    # Find the route
    route = db.query(RouteRequest).filter_by(origin=pickup, destination=destination).first()
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")

    # Get quotes for that route
    quotes = db.query(Quote).filter_by(route_id=route.id).all()
    return [{"provider": q.provider.name, "price": q.price} for q in quotes]
