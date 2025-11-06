from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from supabase import create_client, Client
import jwt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase connection
SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://hgwfgdphdowsdhtufgil.supabase.co')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhnd2ZnZHBoZG93c2RodHVmZ2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MjY2NzAsImV4cCI6MjA3ODAwMjY3MH0.AoxxxrxYzGY26aDfx0Srtef9bQP7EhSVXns3IAKbboE')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Product Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    category: str
    image: str = ""
    available: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str = ""
    available: bool = True

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image: Optional[str] = None
    available: Optional[bool] = None

# Order Models
class OrderItem(BaseModel):
    name: str
    quantity: int
    price: float

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    customer_email: str = ""
    customer_phone: str
    delivery_address: str
    items: List[OrderItem]
    total: float
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str = ""
    customer_phone: str
    delivery_address: str
    items: List[OrderItem]
    total: float

class OrderStatusUpdate(BaseModel):
    status: str

# Auth Models
class SignUpRequest(BaseModel):
    email: str
    password: str
    name: str = ""

class SignInRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    user: dict
    session: dict

# Helper function to verify token
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # Verify JWT token with Supabase
        user = supabase.auth.get_user(token)
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# ===== AUTH ENDPOINTS =====
@api_router.post("/auth/signup")
async def sign_up(request: SignUpRequest):
    try:
        response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password,
            "options": {
                "data": {
                    "name": request.name
                }
            }
        })
        
        if response.user:
            return {
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                    "name": request.name,
                    "isAdmin": request.email == "admin@royalburger.com"
                },
                "session": {
                    "access_token": response.session.access_token if response.session else None
                }
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to create user")
            
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.post("/auth/signin")
async def sign_in(request: SignInRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })
        
        if response.user and response.session:
            # Get user metadata
            user_data = response.user.user_metadata or {}
            
            return {
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                    "name": user_data.get("name", response.user.email.split("@")[0]),
                    "isAdmin": request.email == "admin@royalburger.com"
                },
                "session": {
                    "access_token": response.session.access_token
                }
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
            
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@api_router.post("/auth/signout")
async def sign_out(user = Depends(verify_token)):
    try:
        supabase.auth.sign_out()
        return {"message": "Signed out successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@api_router.get("/auth/user")
async def get_current_user(user = Depends(verify_token)):
    return user

# ===== STATUS CHECK ENDPOINTS =====
@api_router.get("/")
async def root():
    return {"message": "Hello World", "backend": "Supabase"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    
    # Insert into Supabase
    response = supabase.table('status_checks').insert(doc).execute()
    
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    response = supabase.table('status_checks').select("*").execute()
    
    status_checks = []
    for item in response.data:
        if isinstance(item.get('timestamp'), str):
            item['timestamp'] = datetime.fromisoformat(item['timestamp'].replace('Z', '+00:00'))
        status_checks.append(item)
    
    return status_checks

# ===== PRODUCT ENDPOINTS =====
@api_router.post("/products", response_model=Product)
async def create_product(input: ProductCreate):
    product_obj = Product(**input.model_dump())
    doc = product_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    response = supabase.table('products').insert(doc).execute()
    
    return product_obj

@api_router.get("/products", response_model=List[Product])
async def get_products():
    response = supabase.table('products').select("*").execute()
    
    products = []
    for item in response.data:
        if isinstance(item.get('created_at'), str):
            item['created_at'] = datetime.fromisoformat(item['created_at'].replace('Z', '+00:00'))
        products.append(item)
    
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    response = supabase.table('products').select("*").eq('id', product_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product = response.data[0]
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'].replace('Z', '+00:00'))
    
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, input: ProductUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    response = supabase.table('products').update(update_data).eq('id', product_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = response.data[0]
    if isinstance(updated_product.get('created_at'), str):
        updated_product['created_at'] = datetime.fromisoformat(updated_product['created_at'].replace('Z', '+00:00'))
    
    return updated_product

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str):
    response = supabase.table('products').delete().eq('id', product_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully"}

# ===== ORDER ENDPOINTS =====
@api_router.post("/orders", response_model=Order)
async def create_order(input: OrderCreate):
    order_obj = Order(**input.model_dump())
    doc = order_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    # Convert items to JSON serializable format
    doc['items'] = [item.model_dump() if hasattr(item, 'model_dump') else item for item in doc['items']]
    
    response = supabase.table('orders').insert(doc).execute()
    
    return order_obj

@api_router.get("/orders", response_model=List[Order])
async def get_orders():
    response = supabase.table('orders').select("*").order('created_at', desc=True).execute()
    
    orders = []
    for item in response.data:
        if isinstance(item.get('created_at'), str):
            item['created_at'] = datetime.fromisoformat(item['created_at'].replace('Z', '+00:00'))
        if isinstance(item.get('updated_at'), str):
            item['updated_at'] = datetime.fromisoformat(item['updated_at'].replace('Z', '+00:00'))
        orders.append(item)
    
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    response = supabase.table('orders').select("*").eq('id', order_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order = response.data[0]
    if isinstance(order.get('created_at'), str):
        order['created_at'] = datetime.fromisoformat(order['created_at'].replace('Z', '+00:00'))
    if isinstance(order.get('updated_at'), str):
        order['updated_at'] = datetime.fromisoformat(order['updated_at'].replace('Z', '+00:00'))
    
    return order

@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, input: OrderStatusUpdate):
    update_data = {
        "status": input.status,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    response = supabase.table('orders').update(update_data).eq('id', order_id).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {"message": "Order status updated successfully", "status": input.status}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
