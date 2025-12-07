from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./taxi.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)


# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Optional: create tables
def init_db():
    from backend.models import Provider, RouteRequest, Quote  # absolute import
    Base.metadata.create_all(bind=engine)
