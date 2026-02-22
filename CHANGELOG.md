# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0] - 2026-02-16

### Added
- **Database Schema Enhancements**
  - Added `campaign_id` (UUID) and `campaign_code` (VARCHAR) columns to `transactions` table
  - Added `ocr_record_id` (UUID) column to `transactions` table for receipt scanning integration
  - Added `business_logo` (TEXT) column to `users` table for company branding
  - Added `type` (VARCHAR), `commission_rate` (NUMERIC), and `description` (TEXT) columns to `channels` table
  - Created indexes for improved query performance on new columns

### Fixed
- Fixed "Hesap kaydedilemedi" (Account could not be saved) error when creating/updating payment methods
- Fixed missing logo functionality for user profiles
- Restored missing transaction data for affected users
- Fixed foreign key constraint errors in transaction creation

### Changed
- Improved database schema to match application code expectations
- Enhanced data integrity with proper column constraints

### Data Operations
- Restored complete dataset for affected users (transactions, products, categories)
- Added missing commission transaction records
- Created comprehensive database backup as safe restore point

### Technical Details
- All schema changes use `IF NOT EXISTS` clauses for safe migration
- Nullable columns added to preserve existing data
- No breaking changes to existing functionality

---

## [1.3.0] - Previous Release
(Previous version history...)
