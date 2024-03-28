# Dynamic Food Delivery API for Dynamic pricing calculation.


Its a typescript,Node JS,Express project.Zod is used for verifing request/response formats. I have also used Prisma ORM with postgress DB.
REST API backend for a food delivery app using Node.js. The primary focus is on a dynamic pricing module to calculate the total cost of food delivery based on various factors.

## API Reference
### Calculates dynamic delivery cost based on Zone, organization_id, total_distance and item_type


```bash
  GET /fooddelivery/dynamicpricing
```

| Header Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `zone` | `CENTRAL / WEST / EAST / NORTH / SOUTH` | **Required** |
| `organization_id` | `Number (1-5)` | **Required** |
| `total_distance` | `Number` | **Required** |
| `item_type` | `PERISHABLE / NONPERISHABLE` | **Required** |

### Live Link : 

### For Local set up:
## Installation

- Clone the project first
- Setup the .env file
```bash
DATABASE_URL=""
PORT= 3000
```
```bash
npm install 
npm run dev
```
- To insert custom data in DB
- to go \src\db\db.ts
- Add your data
```bash
npx tsc -b
cd \dist\db
node db.js
```
- Visit localhost 3000 in browser or use Postman/ThunderClient
