# scripts/clean-setup.sh
#!/bin/bash
echo "🔄 Cleaning up..."
psql -d portfolio_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "📋 Creating tables..."
psql -d portfolio_db -f database/schema.sql

echo "✅ Done!"