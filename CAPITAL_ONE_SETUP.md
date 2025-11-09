# Capital One Nessie API Integration

## 🏦 What is Capital One Nessie API?

**Nessie** is Capital One's Hackathon API that provides:
- Real public data (ATM locations, bank branches)
- Mock customer account data
- Account creation (Savings, Checking, Loans)
- Transaction simulation
- Bill scheduling

**Perfect for**: Loan applications, account management, financial features

---

## 🔑 Getting Your API Key

### Step 1: Sign in with GitHub
1. Go to [Capital One Nessie API](http://api.reimaginebanking.com)
2. Click "Sign in with GitHub"
3. If you don't have GitHub, sign up at [github.com](https://github.com)

### Step 2: Get Your API Key
1. After signing in, go to your **Profile**
2. Copy your API key
3. It will look like: `9203847529304875`

### Step 3: Add to Environment
Create or update `.env.local`:
```bash
CAPITAL_ONE_API_KEY=your_api_key_here
```

---

## 🚀 How It's Integrated

### 1. Customer Creation (`/api/capital-one/customers`)
- Creates a customer account for the farmer
- Returns `customerId` for future operations

### 2. Loan Account Creation (`/api/capital-one/accounts`)
- Creates a loan account with negative balance
- Loan amount = negative balance (e.g., -$50,000)
- Links to customer account

### 3. Starter Kit Integration
- When farmer needs a loan → automatically creates:
  1. Customer account (if doesn't exist)
  2. Loan account with requested amount
- Shows loan status and details

---

## 📝 API Endpoints Used

### Create Customer
```http
POST http://api.reimaginebanking.com/customers?key=YOUR_KEY
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Farmer",
  "address": {
    "street_number": "123",
    "street_name": "Farm Road",
    "city": "Farm City",
    "state": "IA",
    "zip": "50001"
  }
}
```

### Create Loan Account
```http
POST http://api.reimaginebanking.com/customers/{customerId}/accounts?key=YOUR_KEY
Content-Type: application/json

{
  "type": "Loan",
  "nickname": "Farm Loan - Corn (50 acres)",
  "rewards": 0,
  "balance": -50000
}
```

### Get Customer Accounts
```http
GET http://api.reimaginebanking.com/customers/{customerId}/accounts?key=YOUR_KEY
```

---

## 🎯 How It Works in Your App

### Flow:
```
1. Farmer fills out Starter Kit form
    ↓
2. AI calculates loan needed (e.g., $50,000)
    ↓
3. Farmer clicks "Apply for Capital One Loan"
    ↓
4. App creates customer in Capital One (if new)
    ↓
5. App creates loan account with negative balance
    ↓
6. Loan account created! Farmer can see it in Capital One
```

---

## 💻 Code Example

### In Starter Kit Page:
```typescript
const handleLoanApplication = async () => {
  // 1. Create customer
  const customer = await fetch('/api/capital-one/customers', {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, ... }),
  })
  
  // 2. Create loan account
  const loan = await fetch('/api/capital-one/accounts', {
    method: 'POST',
    body: JSON.stringify({
      customerId: customer.customerId,
      accountType: 'Loan',
      loanAmount: 50000,
    }),
  })
  
  // 3. Show success!
}
```

---

## 🔍 Testing

### Test Customer Creation:
```bash
curl -X POST http://localhost:3000/api/capital-one/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Farmer",
    "city": "Test City",
    "state": "IA"
  }'
```

### Test Loan Creation:
```bash
curl -X POST http://localhost:3000/api/capital-one/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create_account",
    "customerId": "YOUR_CUSTOMER_ID",
    "accountType": "Loan",
    "loanAmount": 50000
  }'
```

---

## 📚 Documentation

- **Capital One Nessie API**: [api.reimaginebanking.com](http://api.reimaginebanking.com)
- **Interactive Docs**: Available on their site (login required)
- **API Key**: Get from your profile after signing in

---

## ✅ Current Status

- ✅ Customer creation endpoint (`/api/capital-one/customers`)
- ✅ Loan account creation endpoint (`/api/capital-one/accounts`)
- ✅ Integrated into Starter Kit page
- ✅ Automatic customer creation if needed
- ✅ Loan application flow complete

**Just add your API key and it works!**

---

## 🎯 What Farmers See

1. Fill out Starter Kit form
2. See loan amount needed
3. Click "Apply for Capital One Loan"
4. Loan account automatically created
5. Success message shown
6. Can view loan in Capital One system

---

## 🆘 Troubleshooting

### "CAPITAL_ONE_API_KEY not set"
- Add key to `.env.local`
- Restart dev server

### "Failed to create customer"
- Check API key is correct
- Verify customer data is valid
- Check Capital One API status

### "Failed to create loan"
- Ensure customer was created first
- Check loan amount is valid number
- Verify API key has permissions

---

## 📝 Summary

**Capital One Nessie API** = Real banking API for hackathons

**What it does**:
- Creates customer accounts
- Creates loan accounts
- Tracks financial data

**Integration**: ✅ Complete and ready to use!

**Just add**: `CAPITAL_ONE_API_KEY` to `.env.local`

🚀 Ready for demo!

