from backend.database import session_local, engine, Base
from backend.models import Provider

# Create tables
Base.metadata.create_all(bind=engine)

# Seed sample providers
db = session_local()
providers = ["Uber", "Bolt", "Little"]
for p in providers:
    if not db.query(Provider).filter_by(name=p).first():
        db.add(Provider(name=p))
db.commit()
db.close()
print("Seeded providers")
