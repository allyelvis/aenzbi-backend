# api.py
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List
import secrets
import requests
import uvicorn
from datetime import timedelta
from jwt import create_access_token, verify_token, TokenData

app = FastAPI()

# Security schemes
security = HTTPBasic()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Mock user data
users_db = {
    "user1": {
        "username": "user1",
        "password": "password1"
    }
}

# Define the data models
class InvoiceItem(BaseModel):
    item_id: str
    quantity: int
    price: float

class Invoice(BaseModel):
    invoice_id: str
    customer_id: str
    items: List[InvoiceItem]
    total_amount: float

class StockMovement(BaseModel):
    stock_id: str
    item_id: str
    quantity: int
    movement_type: str  # e.g., 'in', 'out'
    timestamp: str

# Mock external endpoint (for demonstration purposes)
EXTERNAL_ENDPOINT = "http://external-endpoint.example.com/"

def verify_basic_auth(credentials: HTTPBasicCredentials):
    correct_username = secrets.compare_digest(credentials.username, "user1")
    correct_password = secrets.compare_digest(credentials.password, users_db["user1"]["password"])
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@app.post("/token", response_model=dict)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if not user or not secrets.compare_digest(user["password"], form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def post_to_external_endpoint(data: dict, endpoint: str, token: str):
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.post(endpoint, json=data, headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/stream/invoice/", dependencies=[Depends(security)])
async def stream_invoice(invoice: Invoice, token: str = Depends(oauth2_scheme)):
    post_to_external_endpoint(invoice.dict(), EXTERNAL_ENDPOINT + "invoices/", token)
    return {"status": "Invoice data streamed successfully"}

@app.post("/stream/stock-movement/", dependencies=[Depends(security)])
async def stream_stock_movement(stock_movement: StockMovement, token: str = Depends(oauth2_scheme)):
    post_to_external_endpoint(stock_movement.dict(), EXTERNAL_ENDPOINT + "stock-movements/", token)
    return {"status": "Stock movement data streamed successfully"}

@app.post("/replicate/database/", dependencies=[Depends(security)])
async def replicate_database(data: dict, token: str = Depends(oauth2_scheme)):
    # Here you would include logic to replicate the database changes
    # For now, we're just mocking this functionality
    return {"status": "Database replication data received", "data": data}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)