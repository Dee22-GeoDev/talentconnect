
# TalentConnect - Express + MongoDB (MVC)
This backend is a refactored MVC-style Express application with full CRUD for Jobs, Talents, Applications, and Trainings.

## Structure
- config/        - DB connection, config
- controllers/   - business logic
- middleware/    - auth middleware
- models/        - Mongoose models
- routes/        - express routes per resource
- index.js       - app entry

## Quick start
1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install deps:
   ```bash
   npm install
   ```
3. Run:
   ```bash
   npm run dev
   ```

## Notes
- Auth uses email/password + JWT.
- All protected routes require `Authorization: Bearer <token>`.
- This is a starting point; adapt models/validation as needed.
