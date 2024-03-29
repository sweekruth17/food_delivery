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

### Live Link : https://food-delivery-1-xmfa.onrender.com/docs/

### For Local set up:

## Installation/ running via docker
```bash
docker run -p 3000:3000 food-delivery-api
```
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
npx prisma generate
npx tsc -b
cd \dist\db
node db.js
```
- Visit localhost 3000 in browser or use Postman/ThunderClient
- ![image](https://github.com/sweekruth17/food_delivery/assets/55882537/34267a98-9367-4ceb-b6e5-9ddbd090c81c)
- ![image](https://github.com/sweekruth17/food_delivery/assets/55882537/5858d941-2145-4277-925d-f696f65694f9)
- ![image](https://github.com/sweekruth17/food_delivery/assets/55882537/ff4634b5-8925-4f3b-a1df-a9855c5dedd0)
- ![image](https://github.com/sweekruth17/food_delivery/assets/55882537/7c3f1048-c302-4d45-a8f3-8e79ba210bf1)
- ![image](https://github.com/sweekruth17/food_delivery/assets/55882537/b53e61ca-1cab-41a0-8683-4dbac89fa0fd)
- ![image](https://github.com/sweekruth17/food_delivery/assets/55882537/6bc88d28-35bc-44d8-be8c-c480ca78e8af)





