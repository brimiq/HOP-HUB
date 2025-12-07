from fastapi import APIRouter

router = APIRouter(prefix="/routes", tags=["Example Routes"])


@router.get("/examples")
def get_example_routes():
    return [
        {"pickup": "Westlands", "destination": "Kilimani"},
        {"pickup": "Lavington", "destination": "CBD"},
        {"pickup": "Ngong Road", "destination": "Upperhill"},
        {"pickup": "Kileleshwa", "destination": "Karen"},
        {"pickup": "Rongai", "destination": "Nairobi CBD"},
        {"pickup": "Thika Road", "destination": "Westlands"},
        {"pickup": "Parklands", "destination": "Kilimani"},
        {"pickup": "Donholm", "destination": "Upperhill"},
        {"pickup": "Embakasi", "destination": "Karen"},
        {"pickup": "Kasarani", "destination": "Lavington"},
    ]
