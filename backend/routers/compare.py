from fastapi import APIRouter
from schemas import CompareRequest
from utils import generate_mock_providers, sort_cheapest, sort_fastest

router = APIRouter(prefix="/compare", tags=["Compare"])


@router.post("/")
def compare_route(payload: CompareRequest):
    providers = generate_mock_providers()

    return {
        "route": f"{payload.pickup} → {payload.destination}",
        "providers": providers,
        "cheapest": sort_cheapest(providers),
        "fastest": sort_fastest(providers),
    }
